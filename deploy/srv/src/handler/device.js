let DBModels = require('../db/models.js');
let PubSub = require('pubsub-js');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
let winston = require('../log/log.js');
const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const _ = require('lodash');
const tcpsrv = require('../tcpsrv');
const userlogin = require('./userlogin');

ajv.addSchema({
  "properties": {
    "mac": {
      "type": "string",
    },
    "ip": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
  },
  "required": [ "name","mac","ip" ],

}, 'createdevice_input_Schema');

exports.createdevice = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata;
  const valid = ajv.validate('createdevice_input_Schema', payloaddata);
  if(!valid){
    socket.emit('common_err',{type:'createdevice',errmsg:ajv.errorsText(),title:'生成设备'});
    return;
  }

  let createddata = {
    deviceid:entitydata.mac.replace(/:/g,''),
    devicename:entitydata.name,
  };
  createddata.deviceid = createddata.deviceid.toUpperCase();
  let dbModel = DBModels.RealtimedataModel;
  dbModel.findOneAndUpdate({deviceid:createddata.deviceid},{$set:{
    deviceid:createddata.deviceid,
    updated_at:new Date()
  }},{
    upsert:true,new:true
  },(err,result)=>{
    if(!err && !!result){
      createddata.deviceid = createddata.deviceid;
      createddata.creator = ctx.userid;
      createddata.created_at = new Date();
      createddata.realtimedata = result._id;
      dbModel = DBModels.DeviceModel;
      dbModel.findOneAndUpdate({deviceid:createddata.deviceid},{$set:createddata},{
        upsert:true,new:true
      },(err,newdevice)=>{
          if(!err && !!newdevice){
            newdevice.realtimedata = result;//populate for this!!!!
            socket.emit('device.createdevice_result',{newdevice});
            PubSub.subscribe(`device.${createddata.deviceid}`, ctx.userSubscriber);
          }
          else{
            socket.emit('common_err',{type:'createdevice',errmsg:`新建设备失败`});
          }
      });
    }
    else{
      socket.emit('common_err',{type:'createdevice',errmsg:`新建设备失败`});
    }
  });



  // let entity = new dbModel(createddata);
  // entity.save((err,newdevice)=>{
  //   if(!err){
  //     socket.emit('device.createdevice_result',{newdevice});
  //   }
  //   else{
  //     socket.emit('common_err',{type:'createdevice',errmsg:`新建设备失败:${err.message}`});
  //   }
  // });
}

exports.updatedevice = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.DeviceModel;
  dbModel.findOneAndUpdate(payloaddata.query,{$set:payloaddata.data},{new: true},
    (err, editeditem)=> {
      if(!err){
        if(!!editeditem){
          socket.emit('device.updatedevice_result',{editeditem});
        }
        else{
          socket.emit('common_err',{type:'updatedevice',errmsg:`更新设备失败:找不到该记录${JSON.stringify(payloaddata.query)}`});
        }
      }
      else{
        socket.emit('common_err',{type:'updatedevice',errmsg:`更新设备失败:${err.message}`});
      }
  });
}

//populate
exports.getdevicelist  = (socket,payloaddata,ctx)=>{
  //获取所有设备列表
  let dbModel = DBModels.DeviceModel;
  payloaddata.query.creator = ctx.userid;
  payloaddata.options.populate = [
    {
      path:'realtimedata', model: 'Realtimedata'
    }];
  dbModel.paginate(payloaddata.query,payloaddata.options,(err,mydevicelist)=>{
    if(!err){
      console.log("getdevicelist===>" + JSON.stringify(mydevicelist));
      socket.emit('device.getdevicelist_result',{mydevicelist});
    }
    else{
      socket.emit('common_err',{type:'getdevicelist',errmsg:`获取所有设备列表:${err.message}`});
    }
  });
}


exports.deletedevice = (socket,payloaddata,ctx)=>{
  //删除设备
  let dbModel = DBModels.DeviceModel;
  dbModel.findOneAndRemove({
        _id: payloaddata._id
    }, (err, result)=> {
      console.log("DELETE err=>" + JSON.stringify(err));
      console.log("DELETE result=>" + JSON.stringify(result));
      if(!err){
        socket.emit('device.deletedevice_result',{_id:payloaddata._id});
      }
      else{
        socket.emit('common_err',{type:'deletedevice',errmsg:`删除设备失败:${err.message}`});
      }
    });
}

exports.senddevicecmd = (socket,payloaddata,ctx)=>{
  let deviceid = payloaddata.deviceid;
  if(typeof payloaddata.cmd === 'string'){
    payloaddata.cmd = parseInt(payloaddata.cmd);
  }
  if(typeof payloaddata.value === 'string'){
    payloaddata.value = parseInt(payloaddata.value);
  }
  let cmd = payloaddata.cmd;
  const doresult = ()=>{
    let value = payloaddata.value;
    let buf = tcpsrv.bufmaccmd(deviceid,cmd,value);
    winston.getlog().info(`发送给硬件数据:${buf.toString('hex')}`);
    let tcpsocket = tcpsrv.getsocketfrommac(deviceid);
    if(!!tcpsocket){
      try{
        tcpsocket.write(buf);
        socket.emit('senddevicecmd_result',{cmd});
      }
      catch(e){
        socket.emit('common_err',{type:'senddevicecmd',errmsg:`发送命令失败`});
      }
    }
    else{
      socket.emit('common_err',{type:'senddevicecmd',errmsg:`该设备不在线,无法发送命令`});
    }
  }


  if(cmd === 0){
    if(!payloaddata.password || payloaddata.password===''){
      socket.emit('common_err',{type:'senddevicecmd',errmsg:`请发送密码`});
      return;
    }
    //检查密码是否正确
    userlogin.checkpassword(ctx.userid,payloaddata.password,(err,result)=>{
      if(!err && !!result){
        doresult();
      }
      else{
        socket.emit('common_err',{type:'senddevicecmd',errmsg:`断水密码验证不通过`});
      }
    })
    return;
  }
  doresult();
}

// 【app上实时水量重置按钮】如果实时水量复位,则将该设备所有滤芯的fv_lx为当前realtimedata的值
// 【app上某滤芯复位按钮】设置某滤芯fv_l0的值为当前realtimedata的值
// 【app上某滤芯设置按钮】设置某滤芯fv_l0的值为用户输入的值
/*
deviceid:设备id
cmd:'resetall'/'resetone'/'setone'
indexname:'5微米PP滤芯'/'颗粒活性炭'
value:'setone'有效
type:'vol'/'day'
*/
exports.resetdevicecmd = (socket,payloaddata,ctx)=>{
  const deviceid = payloaddata.deviceid;

  const dbModel = DBModels.DeviceModel;
  dbModel.findOne({deviceid:deviceid,creator:ctx.userid}).populate([
    {
      path:'realtimedata', model: 'Realtimedata'
    }
    ]).exec((err,devicedata)=>{
    if(!err && !!devicedata){
      const realtimedata = devicedata.realtimedata;
      if(!realtimedata){
        socket.emit('common_err',{type:'resetdevicecmd',errmsg:`未获取到实时数据,无法复位`});
        return;
      }
      if(payloaddata.type === 'vol'){
        let cleanCount = devicedata.cleanCount || {
          fv_l0:0,
          fv_lx:0
        };
        let lr = devicedata.lr;
        let detailvollist = devicedata.detailvollist || [];
        let detailvollist_new = [];
        if(payloaddata.cmd === 'resetall'){//【app上实时水量重置按钮】如果实时水量复位,则将该设备所有滤芯的fv_lx为当前realtimedata的值
          // _.map(detailvollist,(record)=>{
          //   record.fv_lx = realtimedata.rawdata.data01;
          //   record.v = record.fv_l0 + realtimedata.rawdata.data01 - record.fv_lx;
          //   record.t = realtimedata.rawdata.mapv[record.name],
          //   record.updated_at = new Date();
          //   detailvollist_new.push(record);
          // });
          detailvollist_new = detailvollist;
          cleanCount.fv_l0 = 0;
          cleanCount.fv_lx = devicedata.cu_j;
          lr = 0;
        }
        else{
          _.map(detailvollist,(record)=>{
            if(record.name === payloaddata.indexname){
              if(payloaddata.cmd === 'setvisible'){
                record.isvisiable = payloaddata.value;
              }
              else{
                record.fv_l0 = 0;
                if(payloaddata.cmd === 'resetone'){
                  record.fv_lx = devicedata.cu_y;
                }
                else{//'setone'
                  record.fv_lx = payloaddata.value;
                }
                record.v = record.fv_l0 + devicedata.cu_y - record.fv_lx;
                record.t = realtimedata.rawdata.mapv[record.name],
                record.updated_at = new Date();
              }
            }
            detailvollist_new.push(record);
          });
        }
        dbModel.findByIdAndUpdate(devicedata._id,{
          $set:{detailvollist:detailvollist_new,lr,cleanCount}
        }, {new: true},
          (err, result)=> {
            result.realtimedata = realtimedata;//展开
            socket.emit('resetdevicecmd_result',result);
            console.log(`resetdevicecmd_result===>${JSON.stringify(result)}`);
        });
      }
      else if(payloaddata.type === 'day'){
        let detaildaylist = devicedata.detaildaylist || [];
        let detaildaylist_new = [];
        if(payloaddata.cmd === 'resetall'){//【app上实时水量重置按钮】如果实时水量复位,则将该设备所有滤芯的fv_lx为当前realtimedata的值
          // _.map(detaildaylist,(record)=>{
          //   record.fd_l0 = 0;
          //   record.fd_lx = realtimedata.rawdata.data89;
          //   record.v = record.fd_l0 + realtimedata.rawdata.data89 - record.fd_lx;
          //   record.t = realtimedata.rawdata.mapd[record.name],
          //   record.updated_at = new Date();
          //   detaildaylist_new.push(record);
          // });
          socket.emit('common_err',{type:'resetdevicecmd',errmsg:`非法命令,【无法对天数进行重置全部操作】`});
          return;
        }
        else{
          _.map(detaildaylist,(record)=>{
            if(record.name === payloaddata.indexname){
              if(payloaddata.cmd === 'setvisible'){
                record.isvisiable = payloaddata.value;
              }
              else{
                if(payloaddata.cmd === 'resetone'){
                  record.fd_lx = realtimedata.rawdata.data89;
                }
                else{//'setone'
                  record.fd_lx = payloaddata.value;
                }
                record.fd_l0 = 0;
                record.v = record.fd_l0 + realtimedata.rawdata.data89 - record.fd_lx;
                record.t = realtimedata.rawdata.mapd[record.name],
                record.updated_at = new Date();
              }
            }
            detaildaylist_new.push(record);
          });
        }

        dbModel.findByIdAndUpdate(devicedata._id,{
          $set:{detaildaylist:detaildaylist_new}
        }, {new: true},
          (err, result)=> {
            result.realtimedata = realtimedata;//展开
            socket.emit('resetdevicecmd_result',result);
            console.log(`resetdevicecmd_result===>${JSON.stringify(result)}`);
        });
      }
    }
  });
}
