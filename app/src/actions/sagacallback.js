
import {
  createaddress_request,
  wait_createaddress_request,
  wait_createaddress_result,

  editaddress_request,
  wait_editaddress_request,
  wait_editaddress_result,

  register_request,
  wait_register_request,
  wait_register_result,

  inserttopic_request,
  wait_inserttopic_request,
  wait_inserttopic_result,

  getnotifymessage_request,
  wait_getnotifymessage_request,
  wait_getnotifymessage_result,


  wait_getmytopic_request,
  wait_getmytopic_result,
  getmytopic_request,

  wait_gettopiclist_request,
  wait_gettopiclist_result,
  gettopiclist_request,

  wait_mycartgetall_request,
  wait_mycartgetall_result,
  mycartgetall_request,

  wait_mycollectiongetall_request,
  wait_mycollectiongetall_result,
  mycollectiongetall_request,

  wait_myordergetall_request,
  wait_myordergetall_result,
  myordergetall_request,

  wait_mycartaddone_request,
  wait_mycartaddone_result,
  mycartaddone_request,

  wait_mycartupdateone_request,
  wait_mycartupdateone_result,
  mycartupdateone_request,

  wait_mycartdelone_request,
  wait_mycartdelone_result,
  mycartdelone_request,

  wait_mycollectiondelone_request,
  wait_mycollectiondelone_result,
  mycollectiondelone_request,

  mycollectionisproductexits_request,
  wait_mycollectionisproductexits_request,
  wait_mycollectionisproductexits_result,

  wait_myorderaddone_request,
  wait_myorderaddone_result,
  myorderaddone_request,

  wait_myorderupdateone_request,
  wait_myorderupdateone_result,
  myorderupdateone_request,

  wait_productcommentsfromproduct_request,
  wait_productcommentsfromproduct_result,
  productcommentsfromproduct_request,

  wait_productcommentaddone_request,
  wait_productcommentaddone_result,
  productcommentaddone_request,

  wait_productcommentsfromproductgetcount_request,
  wait_productcommentsfromproductgetcount_result,
  productcommentsfromproductgetcount_request,

  wait_withdrawcashapplyaddone_request,
  wait_withdrawcashapplyaddone_result,
  withdrawcashapplyaddone_request,

  wait_withdrawcashapplyauth_request,
  wait_withdrawcashapplyauth_result,
  withdrawcashapplyauth_request,

  wait_mycoupongetall_request,
  wait_mycoupongetall_result,
  mycoupongetall_request,

  getdistsalesorderdetails_request,
  wait_getdistsalesorderdetails_request,
  wait_getdistsalesorderdetails_result,

  getpaysign_request,
  wait_getpaysign_request,
  wait_getpaysign_result,

  getuserpointdetails_request,
  wait_getuserpointdetails_request,
  wait_getuserpointdetails_result,

  oauthbinduser_request,
  wait_oauthbinduser_request,
  wait_oauthbinduser_result,

  feedbackaddone_request,
  wait_feedbackaddone_request,
  wait_feedbackaddone_result

} from '../actions/index.js';

import { fork, take, call, put, cancel,race,takeLatest } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import config from '../env/config.js';

let synccall=(payload,waitfn,fn)=>{
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(waitfn({resolve,reject,payload}));
      dispatch(fn({...payload}));
    });
  }
}

//以下导出放在视图中
export function getmytopic(payload){
  return synccall(payload,wait_getmytopic_request,getmytopic_request);
}

export function gettopiclist(payload){
  return synccall(payload,wait_gettopiclist_request,gettopiclist_request);
}

export function createaddress(payload){
  return synccall(payload,wait_createaddress_request,createaddress_request);
}

export function editaddress(payload){
  return synccall(payload,wait_editaddress_request,editaddress_request);
}

export function register(payload){
  return synccall(payload,wait_register_request,register_request);
}


export function inserttopic(payload){
    return synccall(payload,wait_inserttopic_request,inserttopic_request);
}


export function getnotifymessage(payload){
  return synccall(payload,wait_getnotifymessage_request,getnotifymessage_request);
}

export function mycartgetall(payload){
  return synccall(payload,wait_mycartgetall_request,mycartgetall_request);
}

export function mycollectiongetall(payload){
  return synccall(payload,wait_mycollectiongetall_request,mycollectiongetall_request);
}

export function myordergetall(payload){
  return synccall(payload,wait_myordergetall_request,myordergetall_request);
}

export function myorderaddone(payload){
  return synccall(payload,wait_myorderaddone_request,myorderaddone_request);
}

export function myorderupdateone(payload){
  return synccall(payload,wait_myorderupdateone_request,myorderupdateone_request);
}

//==========
export function mycartaddone(payload){
  return synccall(payload,wait_mycartaddone_request,mycartaddone_request);
}

export function mycartupdateone(payload){
  return synccall(payload,wait_mycartupdateone_request,mycartupdateone_request);
}

export function mycartdelone(payload){
  return synccall(payload,wait_mycartdelone_request,mycartdelone_request);
}

export function mycollectiondelone(payload){
  return synccall(payload,wait_mycollectiondelone_request,mycollectiondelone_request);
}

export function mycollectionisproductexits(payload){
  return synccall(payload,wait_mycollectionisproductexits_request,mycollectionisproductexits_request);
}

//==========商品评论相关================

export function productcommentsfromproduct(payload){
  return synccall(payload,wait_productcommentsfromproduct_request,productcommentsfromproduct_request);
}

export function productcommentaddone(payload){
  return synccall(payload,wait_productcommentaddone_request,productcommentaddone_request);
}

export function productcommentsfromproductgetcount(payload){
  return synccall(payload,wait_productcommentsfromproductgetcount_request,productcommentsfromproductgetcount_request);
}

//==========提现相关================

export function withdrawcashapplyaddone(payload){
  return synccall(payload,wait_withdrawcashapplyaddone_request,withdrawcashapplyaddone_request);
}

export function withdrawcashapplyauth(payload){
  return synccall(payload,wait_withdrawcashapplyauth_request,withdrawcashapplyauth_request);
}
//==========我的优惠券相关================

export function mycoupongetall(payload){
  return synccall(payload,wait_mycoupongetall_request,mycoupongetall_request);
}
//==========分销相关================

export function getdistsalesorderdetails(payload){
  return synccall(payload,wait_getdistsalesorderdetails_request,getdistsalesorderdetails_request);
}

export function getpaysign(payload){
  return synccall(payload,wait_getpaysign_request,getpaysign_request);
}

export function getuserpointdetails(payload){
  return synccall(payload,wait_getuserpointdetails_request,getuserpointdetails_request);
}

export function oauthbinduser(payload){
  return synccall(payload,wait_oauthbinduser_request,oauthbinduser_request);
}

export function feedbackaddone(payload){
  return synccall(payload,wait_feedbackaddone_request,feedbackaddone_request);
}

//2.
function* createflowsz(fnwatres,action){
    let {payload:{resolve,reject,payload:data}} = action;
    console.log('createflowsz==>payload:' +JSON.stringify(data));
    const { response, timeout } = yield race({
       response: take(fnwatres),
       timeout: call(delay, config.requesttimeout)
    });
    if(timeout){
      reject('请求超时!');
    }
    else{
      let {payload:{err,result}} = response;
      if (err) {
        reject(err);
      }
      else{
        resolve(result);
      }
    }
}
//以下导出放在saga中
export function* createsagacallbackflow(){
  let waitfnsz = [];
  waitfnsz.push([`${wait_createaddress_request}`,`${wait_createaddress_result}`]);
  waitfnsz.push([`${wait_editaddress_request}`,`${wait_editaddress_result}`]);
  waitfnsz.push([`${wait_register_request}`,`${wait_register_result}`]);
  waitfnsz.push([`${wait_inserttopic_request}`,`${wait_inserttopic_result}`]);
  waitfnsz.push([`${wait_getnotifymessage_request}`,`${wait_getnotifymessage_result}`]);
  waitfnsz.push([`${wait_getmytopic_request}`,`${wait_getmytopic_result}`]);
  waitfnsz.push([`${wait_gettopiclist_request}`,`${wait_gettopiclist_result}`]);
  waitfnsz.push([`${wait_mycartgetall_request}`,`${wait_mycartgetall_result}`]);
  waitfnsz.push([`${wait_mycollectiongetall_request}`,`${wait_mycollectiongetall_result}`]);
  waitfnsz.push([`${wait_myordergetall_request}`,`${wait_myordergetall_result}`]);
  waitfnsz.push([`${wait_mycartaddone_request}`,`${wait_mycartaddone_result}`]);
  waitfnsz.push([`${wait_mycartupdateone_request}`,`${wait_mycartupdateone_result}`]);
  waitfnsz.push([`${wait_mycartdelone_request}`,`${wait_mycartdelone_result}`]);
  waitfnsz.push([`${wait_mycollectiondelone_request}`,`${wait_mycollectiondelone_result}`]);
  waitfnsz.push([`${wait_mycollectionisproductexits_request}`,`${wait_mycollectionisproductexits_result}`]);
  waitfnsz.push([`${wait_myorderaddone_request}`,`${wait_myorderaddone_result}`]);
  waitfnsz.push([`${wait_myorderupdateone_request}`,`${wait_myorderupdateone_result}`]);
  waitfnsz.push([`${wait_productcommentsfromproduct_request}`,`${wait_productcommentsfromproduct_result}`]);
  waitfnsz.push([`${wait_productcommentaddone_request}`,`${wait_productcommentaddone_result}`]);
  waitfnsz.push([`${wait_productcommentsfromproductgetcount_request}`,`${wait_productcommentsfromproductgetcount_result}`]);
  waitfnsz.push([`${wait_withdrawcashapplyaddone_request}`,`${wait_withdrawcashapplyaddone_result}`]);
  waitfnsz.push([`${wait_withdrawcashapplyauth_request}`,`${wait_withdrawcashapplyauth_result}`]);
  waitfnsz.push([`${wait_mycoupongetall_request}`,`${wait_mycoupongetall_result}`]);
  waitfnsz.push([`${wait_getdistsalesorderdetails_request}`,`${wait_getdistsalesorderdetails_result}`]);
  waitfnsz.push([`${wait_getpaysign_request}`,`${wait_getpaysign_result}`]);
  waitfnsz.push([`${wait_getuserpointdetails_request}`,`${wait_getuserpointdetails_result}`]);
  waitfnsz.push([`${wait_oauthbinduser_request}`,`${wait_oauthbinduser_result}`]);
  waitfnsz.push([`${wait_feedbackaddone_request}`,`${wait_feedbackaddone_result}`]);

  for(let i = 0;i < waitfnsz.length; i++){
     let fnsz = waitfnsz[i];
     yield takeLatest(fnsz[0],createflowsz, fnsz[1]);
  }

}
