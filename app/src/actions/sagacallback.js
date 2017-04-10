
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
  createdevice_request,
  wait_createdevice_request,
  wait_createdevice_result,
  getnotifymessage_request, 
  wait_getnotifymessage_request,
  wait_getnotifymessage_result,
  findpwd_request,
  wait_findpwd_request,
  wait_findpwd_result,
  wait_getmytopic_request,
  wait_getmytopic_result,
  getmytopic_request,
  wait_gettopiclist_request,
  wait_gettopiclist_result,
  gettopiclist_request,
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

export function findpwd(payload){
  return synccall(payload,wait_findpwd_request,findpwd_request);
}

export function inserttopic(payload){
    return synccall(payload,wait_inserttopic_request,inserttopic_request);
}

export function createdevice(payload){
  return synccall(payload,wait_createdevice_request,createdevice_request);
}

export function getnotifymessage(payload){
  return synccall(payload,wait_getnotifymessage_request,getnotifymessage_request);
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
  waitfnsz.push([`${wait_findpwd_request}`,`${wait_findpwd_result}`]);
  waitfnsz.push([`${wait_inserttopic_request}`,`${wait_inserttopic_result}`]);
  waitfnsz.push([`${wait_createdevice_request}`,`${wait_createdevice_result}`]);
  waitfnsz.push([`${wait_getnotifymessage_request}`,`${wait_getnotifymessage_result}`]);
  waitfnsz.push([`${wait_getmytopic_request}`,`${wait_getmytopic_result}`]);
  waitfnsz.push([`${wait_gettopiclist_request}`,`${wait_gettopiclist_result}`]);
  for(let fnsz of waitfnsz){
     yield takeLatest(fnsz[0],createflowsz, fnsz[1]);
  }
  
}
