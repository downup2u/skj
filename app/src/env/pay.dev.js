//import {updateorder_request} from '../actions';
import {getpaysign} from '../actions/sagacallback';
 

export const onclickpay = ({orderinfo,payway,dispatch},callbackfn)=> {
   let orderdoc = {
      out_trade_no: orderinfo._id,
      subject: orderinfo.ordertitle || '商品名称',//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
      body: orderinfo.body|| '商品详情',//$('#body').val(),//'WL144626511265842',//
      total_fee: '0.01',//$('#fee').val(),//'9.00',
    };
    if(payway === 'weixin'){
        orderdoc.total_fee = 1;
    }
    dispatch(getpaysign({
        paytype:payway,
        paypage:'orderdetailpage',
        orderdoc:orderdoc,
    })).then((paysign)=>{
        alert(`paytype为:${payway},paysign:${JSON.stringify(paysign)}`);
        callbackfn(paysign);
        // console.log('----->获取到sign:' + paysign);
        //     let payinfo = {
        //         paystatus:'已支付',
        //         paytype:payway
        //     }
        //     dispatch(updateorder_request({
        //         query:{_id:orderinfo._id},
        //         data:payinfo
        //     }));
    }).catch((err)=>{
         console.log('err:' + JSON.stringify(err));
    });
}