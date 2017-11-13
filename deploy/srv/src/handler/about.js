let DBModels = require('../db/models.js');
let mongoose  = require('mongoose');
const winston = require('../log/log.js');

exports.getabouthtml = (socket,actiondata,ctx)=>{
  let aboutModel = DBModels.AboutModel;
  aboutModel.findOne({keyname:actiondata.keyname},(err,aboutdoc)=>{
    if(!err){
      socket.emit('getabouthtml_result',{aboutdoc});
    }
    else{
      socket.emit('common_err',{type:'getabouthtml',errmsg:err.message});
      //winston.getlog().error(`获取关于页面失败:${err.message}`);
    }
  });
}

exports.getserverdate = (socket,actiondata,ctx)=>{
    socket.emit('getserverdate_result',{srvdate:new Date()});
}
