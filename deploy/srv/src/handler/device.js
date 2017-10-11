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
