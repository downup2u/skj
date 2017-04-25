import {
  getusermoney,
  useraddpoint_request,
  getusergetpointsigntoday_request,
} from '../actions';

import {
    getuserpointdetails
} from '../actions/sagacallback.js';



//测试获取积分&余额
let test_getusermoney=(dispatch)=>{
  dispatch(getusermoney({}));
}


//测试新增一个签到获取积分／分享获取积分
let test_useraddpoint=(dispatch,reason)=>{
  dispatch(useraddpoint_request({reason}));
}

//获取今日是否签到
let test_getusergetpointsigntoday_request=(dispatch)=>{
  dispatch(getusergetpointsigntoday_request({}));
  //result塞入userlogin里面
}

//获取积分详情（分页）
let test_getuserpointdetails=(dispatch)=>{
  let page = 1;
  let perpagenumber = 10;
  let payload = {
    query:{},
    options:{
      page: page,
      limit: perpagenumber,
    }
  };
  dispatch(getuserpointdetails(payload)).then(({result})=>{
    console.log("getuserpointdetails result=>" + JSON.stringify(result));
  });
}


export {
    test_getusermoney,
    test_useraddpoint,
    test_getusergetpointsigntoday_request,
    test_getuserpointdetails,
};