const config = require('../../config');
let mongoose = require('mongoose');
let winston = require('../log/log.js');
let DBModels = require('../db/models.js');
let PubSub = require('pubsub-js');

let savedatatodb = (mac,data,curaddress)=>{
  data.getdata = true;
  data.updated_at = new Date();
  if(curaddress.isget){
    data.ipaddr = curaddress.ipaddr;
    data.provice = curaddress.provice;
    data.city = curaddress.city;
    data.county = curaddress.county;
  }

  let dbModel = DBModels.RealtimedataModel;
  dbModel.findOneAndUpdate({deviceid:mac},{$set:data},{
    upsert:true,new:true
  },(err,result)=>{
    if(!err && !!result){
      PubSub.publish(`device.${mac}`,result);
    }
  });

  let dbHistoryModel =  DBModels.DeviceDataHistoryModel;
  data.deviceid = mac;
  let entity = new dbHistoryModel(data);
  entity.save((err,newdevice)=>{
    console.log(`DeviceDataHistoryModel==>err:${JSON.stringify(err)}`)
    console.log(`DeviceDataHistoryModel==>newdevice:${JSON.stringify(newdevice)}`)
  });
}

module.exports= savedatatodb;
