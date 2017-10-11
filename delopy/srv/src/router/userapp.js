let DBModels = require('../db/models.js');
const config = require('../../config.js');
const _  = require('lodash');
const jwt = require('jsonwebtoken');
const moment  = require('moment');
let middlewareauth = require('./middlewareauth.js');
let winston = require('../log/log.js');

let onweixinRes=(res, error)=> {
  res.set('Content-Type', 'text/xml');
  var xml = '';
  if (error) {
    xml = '<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[' + error + ']]></return_msg></xml>';
  } else {
    xml = '<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>';
  }
  res.send(xml);
}

let startmodule = (app)=>{
  app.post('/pay/weixin',(req,res)=>{//https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_7&index=3
    let xmlIn = req.body || req.rawBody;
    //winston.getlog().info("微信支付回调=>" + xmlIn);
    xml2js.parseString(xmlIn, {
      explicitArray: false,
      ignoreAttrs: true
    }, (error, json)=> {
      if(error){
        onweixinRes(res,error);
      }
      else{
        //winston.getlog().info("获得数据，更新订单=>" + JSON.stringify(json));
        onweixinRes(res);
      }
    });
 });

   app.post('/pay/alipay',(req,res)=>{//https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.sy4cJa&treeId=204&articleId=105301&docType=1
     let data = req.body;
     //winston.getlog().info("支付宝支付回调=>" + JSON.stringify(data));

    });


}

module.exports=  startmodule;
