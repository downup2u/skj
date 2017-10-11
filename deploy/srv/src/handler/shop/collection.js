let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');

exports.mycollectionisproductexits = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.MycollectionModel;
  let findresult = {};
  findresult[payloaddata.productid] = false;
  dbModel.findOne({product:payloaddata.productid,creator:ctx.userid},(err,result)=>{
    if(!err && !!result){
        findresult[payloaddata.productid] = true;
    }
    socket.emit('shop.mycollectionisproductexits_result',{result:findresult});
  });
};

//如果存在则叠加，如果不存在则插入
exports.mycollectionaddone = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata;
   entitydata.creator = ctx.userid;
   entitydata.created_at = new Date();
   let dbModel = DBModels.MycollectionModel;
   let entity = new dbModel(entitydata);
   entity.save((err,newitem)=>{
    if(!err){
       if(newitem){
          socket.emit('shop.mycollectionaddone_result',{newitem});
          return;
       }
    }
    else{
        socket.emit('common_err',{type:'mycollectionaddone',errmsg:`插入我的收藏失败:${err.message}`});
        //winston.getlog().error(`插入我的收藏失败:${err.message}`);
    }
  });

}

//删除一条我的收藏
exports.mycollectiondelone = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.MycollectionModel;
  dbModel.findOneAndRemove(payloaddata, (err, result)=> {
     if(!err){
        socket.emit('shop.mycollectiondelone_result',result);
      }
      else{
        socket.emit('common_err',{type:'mycollectiondelone',errmsg:`删除我的收藏失败:${err.message}`});
        //winston.getlog().error(`删除我的收藏失败:${err.message}`);
      }
    });
}

//获取我的收藏
exports.mycollectiongetall = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.MycollectionModel;
  payloaddata.query.creator = ctx.userid;
  dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
    if(!err){
      socket.emit('shop.mycollectiongetall_result',{result:list});
    }
    else{
      socket.emit('common_err',{type:'mycollectiongetall',errmsg:`获取我的收藏失败:${err.message}`});
      //winston.getlog().error(`获取我的收藏失败:${err.message}`);
    }
  });
}
