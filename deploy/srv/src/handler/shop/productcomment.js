let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');


//插入商品评价
exports.productcommentaddone = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata;
  entitydata.creator = ctx.userid;
  entitydata.created_at = new Date();

  let dbModel = DBModels.ProductcommentModel;
  let entity = new dbModel(entitydata);
  entity.save((err,newitem)=>{
    if(!err){
       if(newitem){
          socket.emit('shop.productcommentaddone_result',{newitem});
          return;
       }
      socket.emit('common_err',{type:'productcommentaddone',errmsg:`插入商品评价失败`}); 
    }
    else{
      socket.emit('common_err',{type:'productcommentaddone',errmsg:`插入商品评价失败:${err.message}`});
      //winston.getlog().error(`插入商品评价失败:${err.message}`);
    }
  });
}

// exports.productcommentsfromorder = (socket,payloaddata,ctx)=>{
//   let dbModel = DBModels.ProductcommentModel;
//   dbModel.find({order:payloaddata.orderid},(err,list)=>{
//     if(!err){
//         socket.emit('shop.productcommentsfromorder_result',{list});
//     }
//     else{
//         //winston.getlog().error(`获取产品评论失败：${err.message}`);
//     }
//   });
// }

//一个产品下所有评论
exports.productcommentsfromproduct = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.ProductcommentModel;
  payloaddata.options.populate =   [
    {
      path:'creator', select:'username profile.nickname profile.avatar', model: 'User'
    },
  ];
  dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
    if(!err){
        socket.emit('shop.productcommentsfromproduct_result',{result:list});
    }
    else{
        socket.emit('common_err',{type:'productcommentsfromproduct',errmsg:`获取产品评论失败：${err.message}`});
        //winston.getlog().error(`获取产品评论失败：${err.message}`);
    }
  });
}

exports.productcommentsfromproductgetcount = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.ProductcommentModel;
  dbModel.count({product:payloaddata.productid},(err,result)=>{
    if(!err){
        socket.emit('shop.productcommentsfromproductgetcount_result',{count:result});
    }
    else{
      socket.emit('common_err',{type:'productcommentsfromproductgetcount',errmsg:`获取产品评论个数失败：${err.message}`});
      //winston.getlog().error(`获取产品评论个数失败：${err.message}`);
    }
  });
}