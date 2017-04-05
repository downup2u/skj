
import {
  createaddress_request,wait_createaddress_request,wait_createaddress_result,
  editaddress_request,wait_editaddress_request,wait_editaddress_result,
  register_request,wait_register_request,wait_register_result,
  inserttopic_request,wait_inserttopic_request,wait_inserttopic_result,
  createdevice_request,wait_createdevice_request,wait_createdevice_result,
  getnotifymessage_request, wait_getnotifymessage_request,wait_getnotifymessage_result,
    findpwd_request,wait_findpwd_request,wait_findpwd_result
} from '../actions/index.js';
import { fork, take, call, put, cancel,race } from 'redux-saga/effects';
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


function* createflow(fnwaitreq,fnwatres){
  while (true) {
    let {payload:{resolve,reject}} = yield take(fnwaitreq);
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
}


//以下导出放在视图中
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

//以下导出放在saga中
export function* createaddressflow(){
  return yield createflow(`${wait_createaddress_request}`,`${wait_createaddress_result}`);
}

export function* editaddressflow(){
  return yield createflow(`${wait_editaddress_request}`,`${wait_editaddress_result}`);
}

export function* registerflow(){
  return yield createflow(`${wait_register_request}`,`${wait_register_result}`);
}

export function* findpwdflow(){
  return yield createflow(`${wait_findpwd_request}`,`${wait_findpwd_result}`);
}


export function* inserttopicflow(){
  return yield createflow(`${wait_inserttopic_request}`,`${wait_inserttopic_result}`);
}

export function* createdeviceflow(){
  return yield createflow(`${wait_createdevice_request}`,`${wait_createdevice_result}`);
}


export function* getnotifymessageflow(){
  return yield createflow(`${wait_getnotifymessage_request}`,`${wait_getnotifymessage_result}`);
}
