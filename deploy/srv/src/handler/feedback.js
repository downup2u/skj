let DBModels = require('../db/models.js');
const config = require('../../config.js');
let winston = require('../log/log.js');

//插入意见反馈
exports.feedbackaddone = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata;
  entitydata.creator = ctx.userid;
  entitydata.created_at = new Date();

  let dbModel = DBModels.FeedbackModel;
  let entity = new dbModel(entitydata);
  entity.save((err,newitem)=>{
    if(!err){
      if(newitem){
        socket.emit('app.feedbackaddone_result',{newitem});
        return;
      }
      socket.emit('common_err',{type:'feedbackaddone',errmsg:`插入意见反馈失败`});
    }
    else{
      socket.emit('common_err',{type:'feedbackaddone',errmsg:`插入意见反馈失败:${err.message}`});
      //winston.getlog().error(`插入意见反馈失败:${err.message}`);
    }
  });
}