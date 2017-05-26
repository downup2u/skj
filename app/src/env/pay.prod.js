//import {updateorder_request,ui_setorderdetail} from '../../actions';
import {getpaysign} from '../actions/sagacallback';
import * as xview from './xview/Common';

export const onclickpay = ({orderinfo,paytype,dispatch},callbackfn)=> {

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
       if(paytype === 'weixin'){
         xview.wxpayUrl(paysign,(result)=>{
          callbackfn(result);
        });
       }
       else if(paytype === 'alipay'){
          xview.alipayUrl(paysign,(result)=>{
            callbackfn(result);
         });
       }
       else{
           callbackfn({});
       }
    }).catch((err)=>{
         alert(JSON.stringify(err));
         console.log('err:' + JSON.stringify(err));
    });
}
