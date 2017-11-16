const config = require('../../config');
let mongoose = require('mongoose');
let winston = require('../log/log.js');
let DBModels = require('../db/models.js');
let PubSub = require('pubsub-js');
const _ = require('lodash');
const updatedevice =(realtimedata)=>{
  //查找
  const dbModel = DBModels.DeviceModel;
  winston.getlog().info(`开始更新设备数据${realtimedata.deviceid}`);
  dbModel.find({deviceid:realtimedata.deviceid},(err,devicedatalist)=>{
    if(!err && devicedatalist.length > 0){
      for(let i = 0;i < devicedatalist.length ;i ++){
        const devicedata = devicedatalist[i];

        let detailvollist = devicedata.detailvollist || [];
        let detaildaylist = devicedata.detaildaylist || [];
        let cleanCount = devicedata.cleanCount || {
          fv_l0:0,
          fv_lx:0
        };
        let cu_j = realtimedata.rawdata.data01 || 0;//当前净水
        let cu_y = realtimedata.rawdata.data23 || 0;//当前原水
        if(detailvollist.length === 0){
          // Lr = L0 + ( Ln – Lx )
          detailvollist = [
            {
              name:'5微米PP滤芯',
              isvisiable:true,//是否显示
              fv_l0:cu_y,//初始值为L0, 就是复位或者设置之后的值
              fv_lx:cu_y,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fv_ln:cu_y,
              v:cu_y,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapv['5微米PP滤芯'],
              updated_at:new Date()
            },
            {
              name:'颗粒活性炭',
              isvisiable:true,//是否显示
              fv_l0:cu_y,//初始值为L0, 就是复位或者设置之后的值
              fv_lx:cu_y,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fv_ln:cu_y,
              v:cu_y,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapv['颗粒活性炭'],
              updated_at:new Date()
            },
            {
              name:'1微米PP滤芯',
              isvisiable:true,//是否显示
              fv_l0:cu_y,//初始值为L0, 就是复位或者设置之后的值
              fv_lx:cu_y,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fv_ln:cu_y,
              v:cu_y,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapv['1微米PP滤芯'],
              updated_at:new Date()
            },
            {
              name:'反渗透RO膜',
              isvisiable:true,//是否显示
              fv_l0:cu_y,//初始值为L0, 就是复位或者设置之后的值
              fv_lx:cu_y,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fv_ln:cu_y,
              v:cu_y,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapv['反渗透RO膜'],
              updated_at:new Date()
            },
            {
              name:'后置活性炭',
              isvisiable:true,//是否显示
              fv_l0:cu_y,//初始值为L0, 就是复位或者设置之后的值
              fv_lx:cu_y,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fv_ln:cu_y,
              v:cu_y,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapv['后置活性炭'],
              updated_at:new Date()
            },
          ];
        }
        else{
          // 首先取出systemtable表cleanCount记录中的Lx，L0字段值赋给变量Lx，L0，
          // 5微米PP滤芯总流量=初始值+(每个时间点的原水总流量值-初始流量值)
          // Lr = L0 + ( Ln – Lx )
          let detailvollist_new = [];
          _.map(detailvollist,(record,index)=>{
            record.v = record.fv_l0 + cu_y - record.fv_lx;
            record.t = realtimedata.rawdata.mapv[record.name],
            record.fv_ln = cu_y;
            record.updated_at = new Date();
            detailvollist_new.push(record);
          });
          detailvollist = detailvollist_new;
        }

        if(detaildaylist.length === 0){
          detaildaylist = [
            {
              name:'5微米PP滤芯',
              isvisiable:true,//是否显示
              fd_l0:realtimedata.rawdata.data89,//初始值为L0, 就是复位或者设置之后的值
              fd_lx:realtimedata.rawdata.data89,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fd_ln:realtimedata.rawdata.data89,
              v:realtimedata.rawdata.data89,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapd['5微米PP滤芯'],
              updated_at:new Date()
            },
            {
              name:'颗粒活性炭',
              isvisiable:true,//是否显示
              fd_l0:realtimedata.rawdata.data89,//初始值为L0, 就是复位或者设置之后的值
              fd_lx:realtimedata.rawdata.data89,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fd_ln:realtimedata.rawdata.data89,
              v:realtimedata.rawdata.data89,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapd['颗粒活性炭'],
              updated_at:new Date()
            },
            {
              name:'1微米PP滤芯',
              isvisiable:true,//是否显示
              fd_l0:realtimedata.rawdata.data89,//初始值为L0, 就是复位或者设置之后的值
              fd_lx:realtimedata.rawdata.data89,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fd_ln:realtimedata.rawdata.data89,
              v:realtimedata.rawdata.data89,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapd['1微米PP滤芯'],
              updated_at:new Date()
            },
            {
              name:'反渗透RO膜',
              isvisiable:true,//是否显示
              fd_l0:realtimedata.rawdata.data89,//初始值为L0, 就是复位或者设置之后的值
              fd_lx:realtimedata.rawdata.data89,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fd_ln:realtimedata.rawdata.data89,
              v:realtimedata.rawdata.data89,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapd['反渗透RO膜'],
              updated_at:new Date()
            },
            {
              name:'后置活性炭',
              isvisiable:true,//是否显示
              fd_l0:realtimedata.rawdata.data89,//初始值为L0, 就是复位或者设置之后的值
              fd_lx:realtimedata.rawdata.data89,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
              fd_ln:realtimedata.rawdata.data89,
              v:realtimedata.rawdata.data89,//L0+(Ln – Lx)
              t:realtimedata.rawdata.mapd['后置活性炭'],
              updated_at:new Date()
            },
          ];
        }
        else{
          let detaildaylist_new = [];
          _.map(detaildaylist,(record,index)=>{
            record.v = record.fd_l0 + realtimedata.rawdata.data89 - record.fd_lx;
            record.t = realtimedata.rawdata.mapd[record.name],
            record.updated_at = new Date();
            record.fd_ln = realtimedata.rawdata.data89;
            detaildaylist_new.push(record);
          });
          detaildaylist = detaildaylist_new;
        }

        console.log(`detailvollist==>${JSON.stringify(detailvollist)}`)
        console.log(`detaildaylist==>${JSON.stringify(detaildaylist)}`)

        console.log(`devicedata==>${JSON.stringify(devicedata)}`)
        console.log(`realtimedata==>${JSON.stringify(realtimedata)}`)
        // 首先取出systemtable表cleanCount记录中的Lx字段值赋给变量Lx，
        // 共净化值=每个时间点的净水总流量值-初始净化值
        const lr = cu_j - cleanCount.fv_lx;

        const updateddata = {detailvollist,detaildaylist,lr,cleanCount,cu_y,cu_j,realtimedata:realtimedata._id};

        console.log(`updateddata==>${JSON.stringify(updateddata)}`)
        const devicedata_id = devicedata._id;
        if(typeof devicedata_id === 'string'){
          devicedata_id = mongoose.Types.ObjectId(devicedata_id);
        }
        dbModel.findByIdAndUpdate(devicedata_id,{
          $set:updateddata
        }, {new: true},
          (err, result)=> {
            console.log(`dbModel err==>${JSON.stringify(err)}`)
            console.log(`dbModel result==>${JSON.stringify(result)}`)
            if(i === 0){//仅publish一次
              PubSub.publish(`device.${realtimedata.deviceid}`,realtimedata);
            }
        });
      }
    }
  });
}

let savedatatodb = (mac,data,curaddress)=>{
  data.getdata = true;
  data.updated_at = new Date();
  if(curaddress.isget){
    data.ipaddr = curaddress.ipaddr;
    data.provice = curaddress.provice;
    data.city = curaddress.city;
    data.county = curaddress.county;
  }
  data.deviceid = mac;
  let dbModel = DBModels.RealtimedataModel;
  dbModel.findOneAndUpdate({deviceid:mac},{$set:data},{
    upsert:true,new:true
  },(err,result)=>{
    if(!err && !!result){
      updatedevice(result);
    }
  });

  let dbHistoryModel =  DBModels.DeviceDataHistoryModel;
  let entity = new dbHistoryModel(data);
  entity.save((err,newdevice)=>{
    console.log(`DeviceDataHistoryModel==>err:${JSON.stringify(err)}`)
    console.log(`DeviceDataHistoryModel==>newdevice:${JSON.stringify(newdevice)}`)
  });
}

module.exports= savedatatodb;
