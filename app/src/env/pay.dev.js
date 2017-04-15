//import {updateorder_request} from '../actions';
import {getpaysign} from '../actions/sagacallback';
 

export const onclickpay = ({orderinfo,payway,dispatch},callbackfn)=> {
   let orderdoc = {
      out_trade_no: orderinfo._id,
      subject: orderinfo.ordertitle,//$('#subject').val(),//'WL144626511265842',//$('#subject').val(),
      orderdetail: orderinfo.orderdetail,//$('#body').val(),//'WL144626511265842',//
      total_fee: '0.01',//$('#fee').val(),//'9.00',
    };
    dispatch(getpaysign({
        paytype:payway,
        paypage:'orderdetailpage',
        orderdoc:orderdoc,
    })).then((paysign)=>{
        console.log(`getpaysign:${paysign}`);
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
    });
}