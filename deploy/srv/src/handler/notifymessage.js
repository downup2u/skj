const config = require('../../config.js');
let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let winston = require('../log/log.js');

exports.getnotifymessageone  = (socket,actiondata,ctx)=>{
  let notifyMessageModel = DBModels.NotifyMessageModel;
  notifyMessageModel.findOne({_id:actiondata._id},(err,result)=>{
    if(!err){
      if(!!result){
        socket.emit('getnotifymessageone_result',result);
      }
      else{
        socket.emit('common_err',{type:'getnotifymessageone',errmsg:`找不到该消息:${actiondata._id}`});
      }
    }
    else{
      socket.emit('common_err',{type:'getnotifymessageone',errmsg:err.message});
      //winston.getlog().error(`获取消息页面失败:${err.message}`);
    }
  });
}

exports.getnotifymessage = (socket,actiondata,ctx)=>{
  let notifyMessageModel = DBModels.NotifyMessageModel;
  let islogin = false;
  if(ctx.hasOwnProperty('userid')){
    if(ctx.userid.toString().length > 0){
      islogin = true;
    }
  }

  //特殊处理！！！
  if('created_at' in actiondata.query){
    console.log('created_at in ' + JSON.stringify(actiondata.query));
    let querycreateat = actiondata.query['created_at'];
    if('$gt' in querycreateat){
      let targetdate = new Date(Date.parse(querycreateat['$gt']));
      actiondata.query.created_at = {$gt:targetdate};
    }
  }

  let query = actiondata.query;
  if(islogin){
    query['$or'] =  [{touserid: ctx.userid}, {touserid: null}];
  }

  console.log("getnotifymessage --->" + JSON.stringify(query));
  notifyMessageModel.paginate(query,actiondata.options,(err,list)=>{
    if(!err){
      console.log("getnotifymessage --->" + JSON.stringify(list));
      socket.emit('getnotifymessage_result', {result:list});
    }
    else{
      socket.emit('common_err',{type:'getnotifymessage',errmsg:`获取消息失败：${err.message}`});
      //winston.getlog().error(`获取消息失败：${err.message}`);
    }
  });
}
