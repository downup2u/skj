let DBModels = require('../db/models.js');
let mongoose     = require('mongoose');
let winston = require('../log/log.js');
const _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();
const moment = require('moment');

exports.payorder = (socket,actiondata,ctx)=>{
  let orderModel = DBModels.OrderModel;
  let payload = actiondata.data;
  if(!!payload.couponid){
    if(typeof payload.couponid === 'string'){
      payload.couponid = mongoose.Types.ObjectId(payload.couponid);
    }
  }
  //payload.realprice = payload.realprice;
  if(typeof actiondata.query._id === 'string'){
    actiondata.query._id = mongoose.Types.ObjectId(actiondata.query._id);
  }
  actiondata.query.creator = ctx.userid;
  let curtime = moment().format("YYYYMMDDHHmmss");
  let randst = chance.string({length: 6,pool: '0123456789'});
  payload.out_trade_no = `${curtime}${randst}`;
  console.log(`查询条件:${JSON.stringify(actiondata.query)}`);
  console.log(`更新:${JSON.stringify(payload)}`);
  orderModel.findOneAndUpdate(actiondata.query,{$set:payload},{new: true},(err,orderinfo)=>{
      if(!err){
        if(!!orderinfo){
          //winston.getlog().info(`更新订单:(${JSON.stringify(orderinfo)})`);
          socket.emit('payorder_result',{orderinfo});
        }
        else{
          socket.emit('common_err',{errmsg:`找不到相应的订单:${JSON.stringify(actiondata)}`,title:'支付',type:'payorder'});
        }
      }
      else {
          socket.emit('common_err',{errmsg:`订单更新错误${JSON.stringify(err)}`,title:'支付',type:'payorder'});
      }
  });
}
