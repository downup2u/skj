//import {updateorder_request} from '../actions';
import {getpaysign} from '../actions/sagacallback';
import {
  requestpost,
} from '../util/util.js';


export const onclickpay = ({orderinfo,paytype,dispatch},callbackfn)=> {
    console.log(`支付方式为:${paytype},${orderinfo.realprice}`);
   let orderdoc = {
      out_trade_no: orderinfo._id,
      subject: orderinfo.ordertitle || '商品名称',//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
      body: orderinfo.body|| '商品详情',//$('#body').val(),//'WL144626511265842',//
      total_fee: orderinfo.realprice,//$('#fee').val(),//'9.00',
    };
    if(paytype === 'weixin'){
        orderdoc.total_fee = orderdoc.total_fee*100;
    }
    dispatch(getpaysign({
        paytype:paytype,
        paypage:'orderdetailpage',
        orderdoc:orderdoc,
    })).then((paysign)=>{
        //alert(`paytype为:${paytype},paysign:${JSON.stringify(paysign)}`);
        //callbackfn(paysign);
        alert(JSON.stringify(paysign));
        if(paytype === 'weixin' || paytype === 'alipay'){
            let postdata = {
                "out_trade_no":orderinfo._id
            };
            requestpost('/pay/alipaytest',postdata,(err,result)=>{
                    console.log("testpost err:" + JSON.stringify(err));
                    console.log("testpost result:" + JSON.stringify(result));
            });
            callbackfn({});
        }
        else{
            callbackfn({});
        }

    }).catch((err)=>{
         console.log('err:' + JSON.stringify(err));
    });
}
