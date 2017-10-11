let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');

//获取广告图片列表
exports.getbanner = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.BannerModel;
  dbModel.find({isenabled:true},(err,list)=>{
    if(!err){
        socket.emit('shop.getbanner_result',{list});
    }
    else{
        socket.emit('common_err',{type:'getbanner',errmsg: `获取广告图片失败${err.message}`});
        //winston.getlog().error(`获取广告图片失败：${err.message}`);
    }
  });
}
