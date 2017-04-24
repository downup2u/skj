import {
  expressquery_request,
} from '../actions';

//测试新增一个签到获取积分／分享获取积分
let test_expressquery_request=(dispatch)=>{
  dispatch(expressquery_request({
    expresscode:'shunfeng',
    expressbarid:'216724675295'}));
}


export {
  test_expressquery_request,
};