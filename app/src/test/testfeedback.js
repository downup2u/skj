import {
    feedbackaddone
} from '../actions/sagacallback.js';

//测试新增一个签到获取积分／分享获取积分
let test_feedbackaddone=(dispatch)=>{
  dispatch(feedbackaddone({feedbacktxt:'aaaaa'})).then((result)=>{
     console.log('test_feedbackaddone：' +JSON.stringify(result)) ;
  });
}


export {
  test_feedbackaddone,
};