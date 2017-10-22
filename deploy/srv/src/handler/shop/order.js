let DBModels = require('../../db/models.js');
let mongoose     = require('mongoose');
const config = require('../../../config.js');
let winston = require('../../log/log.js');
const rechargerecord = require('./rechargerecord');
const _ = require('lodash');

//获取订单各个状态个数
let pushqueryorderstatusstat = (socket,ctx)=>{
  let dbModel = DBModels.OrderModel;
  dbModel.aggregate([
            {$match: {creator:ctx.userid}},
            {$group: {
                _id:'$orderstatus',
                totalcount: { $sum: 1 }
            }},
           ],
            (err, list)=> {
                //未支付|待发货|待收货|已完成|我的退货
                let result = {
                  '未支付':0,
                  '待发货':0,
                  '待收货':0,
                  '已完成':0
                };
                _.map(list,(statresult)=>{
                  result[statresult._id] = statresult.totalcount;
                });
                socket.emit('queryorderstatusstat_result',result);
        });
};

//获取所有订单列表
exports.myordergetall = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.OrderModel;
  payloaddata.query.creator = ctx.userid;
  payloaddata.query.isdeleted = false;
  dbModel.paginate(payloaddata.query,payloaddata.options,(err,list)=>{
    if(!err){
      socket.emit('shop.myordergetall_result',{result:list});
    }
    else{
      socket.emit('common_err',{type:'myordergetall',errmsg:`获取我的订单失败:${err.message}`});
      //winston.getlog().error(`获取我的订单失败:${err.message}`);
    }
  });
}


//插入订单
exports.myorderaddone = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata;
  entitydata.creator = ctx.userid;
  entitydata.created_at = new Date();

  if(entitydata.hasOwnProperty('expressid')){
    if(entitydata.expressid.length > 0 && (typeof entitydata.expressid === "string")){
      entitydata.expressid = mongoose.Types.ObjectId(entitydata.expressid);
    }
    else{
      delete entitydata.expressid;
      console.log('delete entitydata.expressid')
    }
  }

  if(entitydata.hasOwnProperty('couponid')){
    if(entitydata.couponid.length > 0 && (typeof entitydata.couponid === "string")){
      entitydata.couponid = mongoose.Types.ObjectId(entitydata.couponid);
    }
     else{
      delete entitydata.couponid;
      console.log('delete entitydata.couponid')
    }
  }
  // let teststring = JSON.stringify(entitydata);
  // console.log(`订单处理前:${teststring}`);
  // if(entitydata.productsdetail){
  //   _.map(entitydata.productsdetail,(productdetail,index)=>{
  //     if(productdetail.productinfo){
  //       delete productdetail.productinfo._id;
  //       delete productdetail.productinfo.__v;
  //       //_.omit(productdetail.productinfo,['_id','__v']);
  //     }
  //     console.log(`productdetail:${JSON.stringify(productdetail.productinfo)}`);
  //   });
  // }
  // if(entitydata.orderaddress){
  //      entitydata.orderaddress.addressid = entitydata.orderaddress._id;
  //      delete entitydata.orderaddress._id;
  //      delete entitydata.orderaddress.__v;
  //   //_.omit(entitydata.orderaddress,['_id','__v']);
  // }

  let teststring2 = JSON.stringify(entitydata);
  console.log(`订单处理后:${teststring2}`);

  let dbModel = DBModels.OrderModel;
  let entity = new dbModel(entitydata);
  entity.save((err,newitem)=>{
    if(!err && newitem){
      socket.emit('shop.myorderaddone_result',{newitem});
      pushqueryorderstatusstat(socket,ctx);
    }
    else{
      socket.emit('common_err',{type:'myorderaddone',errmsg:`插入我的订单失败:${err.message}`});
      //winston.getlog().error(`插入我的订单失败:${err.message}`);
    }
  });
}


//修改订单
exports.myorderupdateone = (socket,payloaddata,ctx)=>{
  let entitydata = payloaddata.data;
  entitydata.creator = ctx.userid;

  if(entitydata.hasOwnProperty('expressid')){
    if(entitydata.expressid.length > 0 && (typeof entitydata.expressid === "string")){
      entitydata.expressid = mongoose.Types.ObjectId(entitydata.expressid);
    }
    else{
      delete entitydata.expressid;
      console.log('delete entitydata.expressid')
    }
  }

  if(entitydata.hasOwnProperty('couponid')){
    if(entitydata.couponid.length > 0 && (typeof entitydata.couponid === "string")){
      entitydata.couponid = mongoose.Types.ObjectId(entitydata.couponid);
    }
     else{
      delete entitydata.couponid;
      console.log('delete entitydata.couponid')
    }
  }

  let dbModel = DBModels.OrderModel;
  dbModel.findOneAndUpdate({
        _id: payloaddata._id
    },entitydata, {new: true}, (err, updateditem)=> {
      if(!err){
        if(updateditem){
          socket.emit('shop.myorderupdateone_result',{updateditem});
          pushqueryorderstatusstat(socket,ctx);
          return;
        }
        socket.emit('common_err',{type:'myorderaddone',errmsg:`更新我的订单失败:找不到该订单`});
      }
     else {
        socket.emit('common_err',{type:'myorderaddone',errmsg:`更新我的订单失败:${err.message}`});
        //winston.getlog().error(`修改我的订单失败:${err.message}`);
        console.log(`修改我的订单失败:${JSON.stringify(err)}`);
      }
    });
}

//删除订单
exports.myorderdelone = (socket,payloaddata,ctx)=>{
  let dbModel = DBModels.OrderModel;
  dbModel.findOneAndUpdate({
        _id: payloaddata._id
    },{isdeleted:true}, {new: true}, (err, updateditem)=> {
      if(!err){
        socket.emit('shop.myorderdelone_result',{_id:updateditem._id});
      }
     else{
        socket.emit('common_err',{type:'myorderdelone',errmsg:`删除我的订单失败:${err.message}`});
        //winston.getlog().error(`删除我的订单失败:${err.message}`);
      }
    });
}

exports.pushqueryorderstatusstat = pushqueryorderstatusstat;
exports.queryorderstatusstat = (socket,payloaddata,ctx)=>{
  pushqueryorderstatusstat(socket,ctx);
}
