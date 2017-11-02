const config = require('../../config');
let mongoose = require('mongoose');
let winston = require('../log/log.js');
let DBModels = require('../db/models.js');
let PubSub = require('pubsub-js');
const _ = require('lodash');
const updatedevice =(realtimedata)=>{
  //查找
  const dbModel = DBModels.DeviceModel;
  console.log(`开始更新设备数据${realtimedata.deviceid}`);
  dbModel.findOne({deviceid:realtimedata.deviceid},(err,devicedata)=>{
    if(!err && !!devicedata){
      let detailvollist = devicedata.detailvollist || [];
      let detaildaylist = devicedata.detaildaylist || [];
      if(detailvollist.length === 0){
        detailvollist = [
          {
            name:'5微米PP滤芯',
            isvisiable:true,//是否显示
            fv_l0:realtimedata.rawdata.data01,//初始值为L0, 就是复位或者设置之后的值
            fv_lx:realtimedata.rawdata.data01,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
            fv_ln:realtimedata.rawdata.data01,
            v:realtimedata.rawdata.data01,//L0+(Ln – Lx)
            t:realtimedata.rawdata.mapv['5微米PP滤芯'],
            updated_at:new Date()
          },
          {
            name:'颗粒活性炭',
            isvisiable:true,//是否显示
            fv_l0:realtimedata.rawdata.data01,//初始值为L0, 就是复位或者设置之后的值
            fv_lx:realtimedata.rawdata.data01,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
            fv_ln:realtimedata.rawdata.data01,
            v:realtimedata.rawdata.data01,//L0+(Ln – Lx)
            t:realtimedata.rawdata.mapv['颗粒活性炭'],
            updated_at:new Date()
          },
          {
            name:'1微米PP滤芯',
            isvisiable:true,//是否显示
            fv_l0:realtimedata.rawdata.data01,//初始值为L0, 就是复位或者设置之后的值
            fv_lx:realtimedata.rawdata.data01,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
            fv_ln:realtimedata.rawdata.data01,
            v:realtimedata.rawdata.data01,//L0+(Ln – Lx)
            t:realtimedata.rawdata.mapv['1微米PP滤芯'],
            updated_at:new Date()
          },
          {
            name:'反渗透RO膜',
            isvisiable:true,//是否显示
            fv_l0:realtimedata.rawdata.data01,//初始值为L0, 就是复位或者设置之后的值
            fv_lx:realtimedata.rawdata.data01,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
            fv_ln:realtimedata.rawdata.data01,
            v:realtimedata.rawdata.data01,//L0+(Ln – Lx)
            t:realtimedata.rawdata.mapv['反渗透RO膜'],
            updated_at:new Date()
          },
          {
            name:'后置活性炭',
            isvisiable:true,//是否显示
            fv_l0:realtimedata.rawdata.data01,//初始值为L0, 就是复位或者设置之后的值
            fv_lx:realtimedata.rawdata.data01,//初始净化值为Lx, 为水智盒第一次通电的值或者实时水量重置后的值
            fv_ln:realtimedata.rawdata.data01,
            v:realtimedata.rawdata.data01,//L0+(Ln – Lx)
            t:realtimedata.rawdata.mapv['后置活性炭'],
            updated_at:new Date()
          },
        ];
      }
      else{
        let detailvollist_new = [];
        _.map(detailvollist,(record,index)=>{
          record.v = record.fv_l0 + realtimedata.rawdata.data01 - record.fv_lx;
          record.t = realtimedata.rawdata.mapv[record.name],
          record.fv_ln = realtimedata.rawdata.data01;
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
          record.t = realtimedata.rawdata.mapv[record.name],
          record.updated_at = new Date();
          record.fd_ln = realtimedata.rawdata.data89;
          detaildaylist_new.push(record);
        });
        detaildaylist = detaildaylist_new;
      }

      console.log(`detailvollist==>${JSON.stringify(detailvollist)}`)
      console.log(`detaildaylist==>${JSON.stringify(detaildaylist)}`)

      dbModel.findByIdAndUpdate(devicedata._id,{
        $set:{detailvollist,detaildaylist}
      }, {new: true},
        (err, result)=> {
        PubSub.publish(`device.${realtimedata.deviceid}`,realtimedata);
      });
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
