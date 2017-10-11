const config = require('../../config.js');
let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let winston = require('../log/log.js');

exports.getnews = (socket,actiondata,ctx)=>{
  let dbModel = DBModels.NewsModel;
  dbModel.find({isenabled:true},(err,list)=>{
    if(!err){
        socket.emit('shop.getnews_result',{list});
    }
    else{
      socket.emit('common_err',{type:'getnews',errmsg:`获取动态失败：${err.message}`});
      //winston.getlog().error(`获取动态失败：${err.message}`);
    }
  });
}
