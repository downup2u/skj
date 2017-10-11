let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');

//获取类别列表
exports.getcategory = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.CategoryModel;
  dbModel.find({},(err,list)=>{
    if(!err){
        socket.emit('shop.getcategory_result',{list});
    }
    else{
      socket.emit('common_err',{type:'getcategory',errmsg:`获取类别失败：:${err.message}`});
      //winston.getlog().error(`获取类别失败：${err.message}`);
    }
  });
}
