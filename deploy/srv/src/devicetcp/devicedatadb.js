const config = require('../../config');
let mongoose = require('mongoose');
let winston = require('../log/log.js');
let DBModels = require('../db/models.js');
let PubSub = require('pubsub-js');

let savedatatodb = (mac,data)=>{
  data.getdata = true;
  data.updated_at = new Date();
  let dbModel = DBModels.RealtimedataModel;
  dbModel.findOneAndUpdate({deviceid:mac},{$set:data},{
    upsert:true,new:true
  },(err,result)=>{
    if(!err && !!result){
      PubSub.publish(`device.${mac}`,result);
    }
  });

  let dbHistoryModel =  DBModels.DeviceDataHistoryModel;
  let entity = new dbHistoryModel(data);
  entity.save((err,newdevice)=>{

  });
}

module.exports= savedatatodb;
