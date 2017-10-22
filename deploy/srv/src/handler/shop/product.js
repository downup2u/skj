let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');

//获取产品列表
exports.getproduct = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.ProductModel;
  dbModel.find({isenabled:true},(err,list)=>{
    if(!err){
        socket.emit('shop.getproduct_result',{list});
    }
    else{
      socket.emit('common_err',{type:'getproduct',errmsg:`获取产品列表失败:${err.message}`});
        //winston.getlog().error(`获取产品列表失败：${err.message}`);
    }
  });
}
