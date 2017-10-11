let DBModels = require('../../db/models.js');
const config = require('../../../config.js');
let winston = require('../../log/log.js');
const async = require('async');
let PubSub = require('pubsub-js');
const point  = require('./point.js');
const orderm = require('./order.js');


//注：必须可靠执行，不能publish出去再执行
let ordersuccess = (order,ctxuser,fncallback)=>{
  dbModel = DBModels.SystemConfigModel;
  dbModel.findOne({},(err,systemconfig)=>{
      if(!err && !!systemconfig){
          doordersuccess(order,ctxuser,systemconfig,fncallback);
      }
      else{
          fncallback({
            cmd:'common_err',
            data:{
              type:'ordersuccess',
              errmsg:`获取系统设置失败(订单成功)！`
            }
          });
          //winston.getlog().error(`获取系统设置失败！`);
      }
  });
}

exports.ordersuccess = ordersuccess;
//用户使用余额支付
exports.paywithleftbalance = (socket,ctx,order,user,callbackfn)=>{
    let userModel = DBModels.UserModel;
    let feeold = user.balance;
    let orderprice = order.orderprice;
    let feebonus = -order.balanceprice;
    let feenew = parseFloat((feeold + feebonus).toFixed(2));
    let rechargerecordModel =  DBModels.RechargerecordModel;
    let entityuser1 = new rechargerecordModel({
                        creator:user._id,
                        fromorder:order._id,
                        fromuser:user._id,
                        levelflag:0,
                        feeold,
                        feenew,
                        feebonus,
                        orderprice,
                        srctype:'paywithleftbalance',
                        created_at:new Date()
                    });
     console.log(`使用余额支付,创建充值记录:${JSON.stringify(entityuser1)}`);
     entityuser1.save((err,rechargerecord1)=>{
        if(!err && rechargerecord1){
             console.log(`使用余额支付,创建充值记录:${JSON.stringify(rechargerecord1)}`);
            userModel.findOneAndUpdate({_id:user._id},{$set:{balance:feenew}},{new:true},(err,result)=>{
                //更新用户余额《----》
                console.log(`更新用户${user._id}余额${feeold}=>${result.balance}`);
                //winston.getlog().warn(`更新用户${user._id}余额`);
                point.pushusermoney(socket,ctx);
                //更新订单为已支付
                let dbModel = DBModels.OrderModel;
                dbModel.findOneAndUpdate({
                    _id: order._id,
                    paystatus: { $ne: '已支付' }
                },{
                    paytype: "leftbalance",
                    orderstatus : '待发货',
                    paystatus: '已支付',
                    pay_at:new Date()
                }, {new: true}, (err, updateditem)=> {
                    if(!err && updateditem){
                        callbackfn(null,updateditem);

                        ordersuccess(updateditem,{
                            _id:ctx.userid,
                            userfrom:ctx.userfrom,
                            userfrom2:ctx.userfrom2
                        },(eventobj)=>{
                            socket.emit(eventobj.cmd,eventobj.data);
                        })
                        //PubSub.publish(`order.${updateditem.creator}`,updateditem);
                    }
                    else if(err){
                        callbackfn(`修改我的订单失败:${err.message}`);
                        //winston.getlog().error(`修改我的订单失败:${err.message}`);
                    }
                });
            });
        }
        else if(!!err){
            callbackfn(`使用余额支付,创建充值记录:${JSON.stringify(err)}`);
            console.log(`使用余额支付,创建充值记录:${JSON.stringify(err)}`);
        }
     });
}

//=============订单支付成功！=============
let doordersuccess = (order,ctxuser,systemconfig,fncallback)=>{
    //优惠券，积分变动
    if(order.couponprice > 0){
        console.log(`订单成功,查看是否使用优惠券,使用${order.couponid}`);
        //设置优惠券已使用
         let dbModel = DBModels.MyCouponModel;
         dbModel.findOneAndUpdate({_id:order.couponid},{$set:{usestatus:'已使用',fromorder:order._id}},{new:true},(err,result)=>{
         });
    }
    if(order.pointprice > 0){
        console.log(`订单成功,查看是否使用积分,使用${order.point}`);
        //积分纪录变动
        point.addpointrecord({
              reason:'下单',
              pointbonus:-order.point
            },ctxuser._id,(err,result)=>{
            if(!err){
                //广播后
                point.pushusermoneym(ctxuser._id,fncallback);
            }
            else{
              fncallback({
                cmd:'common_err',
                data:{
                  type:'ordersuccess',
                  errmsg:`扣除积分失败`
                }
              });
                //winston.getlog().error(`积分修改失败:${err}`);
            }
        });
    }
    //获取order所在的用户,往userfrom加一条充值记录
    let creator = ctxuser.userfrom;
    let fromorder = order._id;
    let fromuser = order.creator;
    let levelflag = 1;
    let srctype = 'order';
    let created_at = new Date();


    let userModel = DBModels.UserModel;
    if(!!ctxuser.userfrom){
        console.log(`往userfrom1加一条充值记录${ctxuser.userfrom}`);
        userModel.findOne({_id:ctxuser.userfrom},(err,targetuser1)=>{
                if(!err && targetuser1){
                    let feeold = targetuser1.balance;
                    let orderprice = order.orderprice;
                    let feebonus = orderprice*systemconfig.bonuslevel1;//应付金额
                    feebonus = parseFloat(feebonus.toFixed(2));
                    let feenew = parseFloat((feeold + feebonus).toFixed(2));
                    let rechargerecordModel =  DBModels.RechargerecordModel;
                    let entityuser1 = new rechargerecordModel({
                        creator:targetuser1._id,
                        fromorder,
                        fromuser,
                        levelflag:1,
                        feeold,
                        feenew,
                        feebonus,
                        orderprice,
                        srctype,
                        created_at:new Date()
                    });
                    entityuser1.save((err,rechargerecord1)=>{
                        if(!err && rechargerecord1){
                            //保存该用户充值记录
                            //winston.getlog().warn(`保存充值记录成功${JSON.stringify(rechargerecord1)}`);
                            userModel.findOneAndUpdate({_id:targetuser1._id},{$set:{balance:feenew}},{new:true},(err,result)=>{
                                //更新用户余额《----》
                            //winston.getlog().warn(`更新用户${targetuser1._id}余额`);
                            });
                        }
                        else{
                            fncallback({
                              cmd:'common_err',
                              data:{
                                type:'ordersuccess',
                                errmsg:`保存充值记录失败！${targetuser1._id}`
                              }
                            });
                            //winston.getlog().warn(`保存充值记录失败！${targetuser1._id}`);
                        }
                });
                }
                else{
                  fncallback({
                    cmd:'common_err',
                    data:{
                      type:'ordersuccess',
                      errmsg:`找不到对应的用户${ctx.userfrom}`
                    }
                  });
                  //winston.getlog().warn(`找不到对应的用户${ctx.userfrom}`);
                }
            });
    }

    //获取userfrom所在的用户,往userfrom加一条充值记录
    if(!!ctxuser.userfrom2){
        console.log(`往userfrom2加一条充值记录${ctxuser.userfrom2}`);
        userModel.findOne({_id:ctxuser.userfrom2},(err,targetuser2)=>{
            if(!err && targetuser2){
                let orderprice = order.orderprice;
                let feeold = targetuser2.balance;
                let feebonus = orderprice*systemconfig.bonuslevel2;//应付金额
                let feenew = parseFloat((feeold + feebonus).toFixed(2));
                let rechargerecordModel =  DBModels.RechargerecordModel;
                let entityuser2 = new rechargerecordModel({
                                creator:targetuser2._id,
                                fromorder,
                                fromuser,
                                levelflag:2,
                                feeold,
                                feenew,
                                feebonus,
                                orderprice,
                                srctype,
                                created_at:new Date()
                });
                entityuser2.save((err,rechargerecord2)=>{//保存该用户2值记录
                    //winston.getlog().warn(`保存充值记录成功${JSON.stringify(rechargerecord2)}`);
                    if(!err && rechargerecord2){
                    //该用户充值记录
                    userModel.findOneAndUpdate({_id:targetuser2._id},{$set:{balance:feenew}},{new:true},(err,result)=>{
                        //winston.getlog().warn(`更新用户${targetuser2._id}余额`);
                        //更新用户余额
                    });
                    }
                    else{
                        //winston.getlog().warn(`保存充值记录失败！${targetuser2._id}`);
                    }
                });
            }
            else{
                //winston.getlog().warn(`找不到对应的用户${ctx.userfrom2}`);
            }
        });
    }

}
