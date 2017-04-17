import {
  requestpost,
} from '../util/util.js';

//https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
  let testpost=()=>{
      //注意：是个xml格式，解析后才得到json
      let postdata = 
      {
            "appid":"wx59d5d49c9d5f47df",
            "attach":"测试数据",
            "bank_type":"CMB_CREDIT",
            "cash_fee":"1",
            "fee_type":"CNY",
            "is_subscribe":"N",
            "mch_id":"1286763701",
            "nonce_str":"jtl67d74kxdxj7ym0bg8b3b435k4fsdr",
            "openid":"o22U5xFzZ_0i76KGm7xgQpuyb7wk",
            "out_trade_no":"58f4294791a7d1099977075f",
            "result_code":"SUCCESS",
            "return_code":"SUCCESS",
            "sign":"628C89C28CAF423CC708C5F4B0C63B1B",
            "time_end":"20170417103248",
            "total_fee":"1",
            "trade_type":"APP",
            "transaction_id":"4004932001201704177306553849"
    };

    requestpost('/pay/weixin',postdata,(err,result)=>{
        console.log("testpost err:" + JSON.stringify(err));
        console.log("testpost result:" + JSON.stringify(result));
    });
  }

  export {testpost};