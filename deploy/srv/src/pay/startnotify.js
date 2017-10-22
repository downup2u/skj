let DBModels = require('../db/models.js');
const config = require('../../config.js');
const _  = require('lodash');
const moment  = require('moment');
let notifypay = require('./notifypay');
let winston = require('../log/log.js');
const CryptoJS = require("crypto-js");
const globalpayparam = require('./payparam.js');
let PubSub = require('pubsub-js');
const crypto = require("crypto");
const fs = require('fs');

/**
 *
 *
 * https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
 *
 * 支付完成后，微信会把相关支付结果和用户信息发送给商户，商户需要接收处理，并返回应答。
对后台通知交互时，如果微信收到商户的应答不是成功或超时，微信认为通知失败，微信会通过一定的策略定期重新发起通知，尽可能提高通知的成功率，但微信不保证通知最终能成功。 （通知频率为15/15/30/180/1800/1800/1800/1800/3600，单位：秒）
注意：同样的通知可能会多次发送给商户系统。商户系统必须能够正确处理重复的通知。
推荐的做法是，当收到通知进行处理时，首先检查对应业务数据的状态，判断该通知是否已经处理过，如果没有处理过再进行处理，如果处理过直接返回结果成功。在对业务数据进行状态检查和处理之前，要采用数据锁进行并发控制，以避免函数重入造成的数据混乱。
特别提醒：商户系统对于支付结果通知的内容一定要做签名验证,并校验返回的订单金额是否与商户侧的订单金额一致，防止数据泄漏导致出现“假通知”，造成资金损失。
 *
 *
 *
 */

 let setordersuccessandnotify = (order,userid,fncallback)=>{
   fncallback({
     cmd:'serverpush_orderinfo',
     data:order
   })

   let userModel = DBModels.UserModel;
   userModel.findOne({_id:userid},(err,targetuser)=>{
     if(!err && !!targetuser){
       const rechargerecord = require('../handler/shop/rechargerecord');
       rechargerecord.ordersuccess(order,targetuser,fncallback);
     }
   });
 }

 let setorderpaid = (out_trade_no)=>{
   let dbModel = DBModels.OrderModel;
   console.log(`alipaytest====>${out_trade_no}`);
   dbModel.findOne({out_trade_no: out_trade_no},(err,orderinfo)=>{
       if(!err && !!orderinfo){
           let orderid = orderinfo._id;
           dbModel.findOneAndUpdate({
               _id: orderid,
               paystatus: { $ne: '已支付' }
           },{
               orderstatus : '待发货',
               paystatus: '已支付',
               pay_at:new Date()
           }, {new: true}, (err, updateditem)=> {
             if(!err && updateditem){
               //rechargerecord.ordersuccess(socket,data,ctx);
               setordersuccessandnotify(updateditem,updateditem.creator,(eventobj)=>{
                 PubSub.publish(`order.${updateditem.creator}`,eventobj);
               });
             }
            else if(err){
               //winston.getlog().error(`修改我的订单失败:${err.message}`);
             }
           });
         }
       });
     }

let startmodule = (app)=>{
  app.post('/pay/weixin',notifypay.notifywexin((msg, req, res, next)=>{
      //winston.getlog().warn(`这里处理！接收到微信支付回调:${JSON.stringify(msg)}`);

// {"level":"warn","message":"这里处理！接收到微信支付回调:{\"appid\":\"wx372f956440964306\",\"attach\":\"测试数据\",\"bank_type\":\"CMB_CREDIT\",\"cash_fee\":\"2\",\"fee_type\":\"CNY\",\"is_subscribe\":\"N\",\"mch_id\":\"1452385802\",
//\"nonce_str\":\"llgq9gwxvdwfg5jk2l2sptus43tjrti3\",\"openid\":\"o4RA6wbM6ISEI0diaUZPqmgfyW0o\",
//\"out_trade_no\":\"59281603777b67226882c3a1\",\"result_code\":\"SUCCESS\",\"return_code\":\"SUCCESS\",\"sign\":\"D8812001E1DCEC316733234CC214B2D5\",\"time_end\":\"20170526194840\",\"total_fee\":\"2\",\"trade_type\":\"APP\",\"transaction_id\":\"4004932001201705262723032632\"}","timestamp":"2017-05-26T11:49:55.803Z"}
// o4RA6wSL6DYdifH5bJjBgewfSiwYwx372f95644096430614523858021452385802
      let payobj = globalpayparam.weixin;
      if(msg.appid !== payobj.appid || msg.mch_id !== payobj.mch_id){
          //winston.getlog().warn(`${msg.appid}-->${payobj.appid}${msg.mch_id}${payobj.mch_id}`);
          res.failed();
          return;
      }

      if(msg.return_code !== 'SUCCESS'){
          res.failed();
          return;
      }

      let param = msg;
      let querystring = Object.keys(param).filter((key)=>{
          return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key) < 0;
        }).sort().map((key)=>{
          return key + '=' + param[key];
       }).join("&") + "&key=" + payobj.keystring;

     let checkedsign = CryptoJS.MD5(querystring).toString().toUpperCase();
     if(checkedsign !== param.sign){
         //验证key成功！
         //winston.getlog().warn(`===>${checkedsign}|===>${param.sign}`);
         res.failed();
         return;
     }

    //处理订单支付消息
     let orderid = msg.out_trade_no;
     setorderpaid(orderid);

    res.success();

    //   let postdata =
    //   {
    //         "appid":"wx59d5d49c9d5f47df",
    //         "attach":"测试数据",
    //         "bank_type":"CMB_CREDIT",
    //         "cash_fee":"1",
    //         "fee_type":"CNY",
    //         "is_subscribe":"N",
    //         "mch_id":"1286763701",
    //         "nonce_str":"jtl67d74kxdxj7ym0bg8b3b435k4fsdr",
    //         "openid":"o22U5xFzZ_0i76KGm7xgQpuyb7wk",
    //         "out_trade_no":"58f4294791a7d1099977075f",
    //         "result_code":"SUCCESS",
    //         "return_code":"SUCCESS",
    //         "sign":"628C89C28CAF423CC708C5F4B0C63B1B",
    //         "time_end":"20170417103248",
    //         "total_fee":"1",
    //         "trade_type":"APP",
    //         "transaction_id":"4004932001201704177306553849"
    // };

  }));

  app.post('/pay/alipaytest',(req,res)=>{
    let msg = req.body;
    let orderid = msg.out_trade_no;
    setorderpaid(orderid);
  });

  app.post('/pay/alipay',notifypay.notify_alipay((msg, req, res, next)=>{
     //winston.getlog().warn(`这里处理！接收到支付宝回调:${JSON.stringify(msg)}`);

     let payobj = globalpayparam.alipay;
      if(msg.seller_id !== payobj.partner || msg.seller_email !== payobj.seller_id){
          //这个判断好坑
          //winston.getlog().warn(`${msg.seller_id}${payobj.partner}${msg.seller_email}${payobj.seller_id}`);
          res.failed();
          return;
      }

    //这里需要处理支付宝验证,
      let verifyAlipayCallback = (body,alipayPublicKey)=> {
         try {
              var keys = Object.keys(body).sort();
              var prestr = [];
              keys.forEach(function (e) {
                  if (e !='sign' && e !='sign_type') {
                      prestr.push(e+'='+body[e]);
                  }
              });
              prestr = prestr.join('&');
              console.log('prestr==>' + prestr);
              prestr = new Buffer(prestr);
              var sign = new Buffer(body['sign'],'base64');

              return crypto.createVerify('RSA-SHA1').update(prestr).verify(alipayPublicKey, body['sign'],'base64');
          }
          catch (error){
              return false;
          }
      };

    let alipayPublicKey =fs.readFileSync(payobj.publickeyfilename).toString();
    const result = verifyAlipayCallback(msg,alipayPublicKey);
     if(!result){
         //验证key失败！
         //winston.getlog().warn(`验证key失败！${result}`);
         res.failed();
         return;
     }

    let orderid = msg.out_trade_no;
    setorderpaid(orderid);
    // let body =
    // {
    //         discount: '0.00',
    //         payment_type: '1',
    //         subject: '商品名称',
    //         trade_no: '2017041721001004110206550876',
    //         buyer_email: 'xiaoqingwang@126.com',
    //         gmt_create: '2017-04-17 13:52:48',
    //         notify_type: 'trade_status_sync',
    //         quantity: '1',
    //         out_trade_no: '58f4581f70a960293c472760',
    //         seller_id: '2088021265636683',
    //         notify_time: '2017-04-17 13:52:49',
    //         body: '商品详情',
    //         trade_status: 'TRADE_SUCCESS',
    //         is_total_fee_adjust: 'N',
    //         total_fee: '0.01',
    //         gmt_payment: '2017-04-17 13:52:48',
    //         seller_email: 'guorouwang@126.com',
    //         price: '0.01',
    //         buyer_id: '2088002017478113',
    //         notify_id: '3427186b0d7287a4117f7892ac0fc39gum',
    //         use_coupon: 'N',
    //         sign_type: 'RSA',
    //         sign: 'ju1tEwPIqG6F5vUa4PPGwlUVQIcCUYRnXKajAR1uS0g0ZlUr9EgNesRJj/saoG9qEhiUnZS0KEjB3oacME+sMoLij40JToloikqRuGCDmrNxh5Tpne5/LYwA6xMeZHOwS1oH3gEn8F+nFprgPfUu9XL4Il08aAcqo8yAo7D8pyo='
    //   };
    //   let verifyAlipayCallback = (body,alipayPublicKey)=> {
    //     var crypto = require("crypto");
    //      try {
    //           var keys = Object.keys(body).sort();
    //           var prestr = [];
    //           keys.forEach(function (e) {
    //               if (e !='sign' && e !='sign_type') {
    //                   prestr.push(e+'='+body[e]);
    //               }
    //           });
    //           prestr = prestr.join('&');
    //           prestr = new Buffer(prestr);
    //           var sign = new Buffer(body['sign'],'base64');
    //           return crypto.createVerify('RSA-SHA1').update(prestr).verify(alipayPublicKey, body['sign'],'base64');
    //       }
    //       catch (error){
    //           console.error(error);
    //           return false;
    //       }
    //   };
    //  const result = verifyAlipayCallback(body,globalpayparam.alipay.publickeyfilename);
    //  console.log("result:" + result);

    //   // let param = msg;
    //   // let querystring = Object.keys(param).filter((key)=>{
    //   //   return param[key] !== undefined && param[key] !== '' && ['pfx', 'sign_type','partner_key', 'sign', 'key'].indexOf(key)<0;
    //   //   }).sort().map((key)=>{
    //   //   return key + '=' + param[key];
    //   //   }).join("&") + "&key=" + payobj.keystring;

    //   //winston.getlog().warn(`这里处理！接收到支付宝支付回调:${msg}`);
      res.success();
  }));

}

module.exports=  startmodule;
