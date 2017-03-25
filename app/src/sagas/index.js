import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';

import config from '../config.js';
import {
  showpopmessage,
  login_request,login_result,login_err,
  logout_request,
    loginwithtoken_request,
  inserttopic_request,inserttopic_result,
  getmytopic_request,getmytopic_result,
  gettopiclist_request,gettopiclist_result,
  insertcommentstotopic_request,insertcommentstotopic_result,
  insertcommentstocomments_request,insertcommentstocomments_result,
  lovetopicadd_request,lovetopicadd_result,
  lovetopicunadd_request,lovetopicunadd_result,
  lovecommentsadd_request,lovecommentsadd_result,
  lovecommentsunadd_request,lovecommentsunadd_result,

  createdevice_request, createdevice_result,
  getdevicelist_request,getdevicelist_result,
  deletedevice_request,deletedevice_result,

  createaddress_request,
  deleteaddress_request,
  editaddress_request,
  getaddresslist_request,

    getnotifymessage_request,
    fillprofile_request,
} from '../actions';
import {
  sendauth_request,sendauth_result,sendauth_err,
  register_request,register_result,register_err,
} from '../actions/index.js';

import {wsrecvhandler} from './wsrecvhandler.js';

let sendmsgwhenreconnect =(socket)=>{
  //连接上以后直接发送-----》
  let token = localStorage.getItem('shuikejing_user_token');
  if (token !== null) {
    socket.emit('message',{cmd:'loginwithtoken',data:{token:token}});
  }

}

function connect() {
  const socket = io(config.serverurl);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    wsrecvhandler(socket,emit);
    socket.on('connect',()=>{
      sendmsgwhenreconnect(socket);
    });
    socket.on('disconnect',()=>{
      // emit(disconnect());
      // emit(showpopmessage({
      //   title:'错误',
      //   msg:'连接断开,尝试重连...',
      //   type:'error'
      // }));
    });
    socket.on('error',()=>{
      //emit(disconnect());
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    console.log(`read action:${action}`);
    yield put(action);
  }
}

function* write(socket,fun,cmd) {
  while (true) {
    let { payload } = yield take(fun);
    console.log(`${cmd}:` + JSON.stringify(payload));
    socket.emit('message',{cmd:cmd,data:payload});
  }
}

function* handleIOWithAuth(socket) {
  while (true) {
    console.log("未登录!");
    yield take(`${login_result}`);
    console.log("登录成功!");
    let fnsz = {
      'getmytopic':`${getmytopic_request}`,
      'inserttopic':`${inserttopic_request}`,
      'insertcommentstotopic':`${insertcommentstotopic_request}`,
      'insertcommentstocomments':`${insertcommentstocomments_request}`,
      'lovetopicadd':`${lovetopicadd_request}`,
      'lovetopicunadd':`${lovetopicunadd_request}`,
      'lovecommentsadd':`${lovecommentsadd_request}`,
      'lovecommentsunadd':`${lovecommentsunadd_request}`,
      'createdevice':`${createdevice_request}`,
      'getdevicelist':`${getdevicelist_request}`,
      'deletedevice':`${deletedevice_request}`,

      'createaddress':`${createaddress_request}`,
      'deleteaddress':`${deleteaddress_request}`,
      'editaddress':`${editaddress_request}`,
      'getaddresslist':`${getaddresslist_request}`,
      'fillprofile':`${fillprofile_request}`,
    };

    let tasksz =[];
    for (let cmd in fnsz) {
      let task =  yield fork(write, socket,fnsz[cmd],cmd);
      tasksz.push(task);
    }
    let action = yield take(`${logout_request}`);
    for (let task of tasksz) {
      yield cancel(task);
    }
  }
}

function* handleIO(socket) {
  let fnsz =  {
    'login':`${login_request}`,
    'sendauth':`${sendauth_request}`,
    'register':`${register_request}`,
    'gettopiclist':`${gettopiclist_request}`,
    'getnotifymessage':`${getnotifymessage_request}`,
  };


  let tasksz =[];
  for (let cmd in fnsz) {
    let task =  yield fork(write, socket,fnsz[cmd],cmd);
    tasksz.push(task);
  }
}


function* flow() {
  const socket = yield call(connect);
  //连接上以后直接发送-----》
  sendmsgwhenreconnect(socket);

  const taskread = yield fork(read, socket);
  const taskwritewithauth = yield fork(handleIOWithAuth, socket);
  const taskwrite = yield fork(handleIO, socket);

}

import {
  createaddressflow,
  editaddressflow,
  registerflow,
  inserttopicflow,
  createdeviceflow,
    getnotifymessageflow,
} from '../actions/sagacallback.js';
import {wififlow} from './wififlow';

export default function* rootSaga() {
  yield fork(flow);
  yield fork(wififlow);
  yield fork(createaddressflow);
  yield fork(editaddressflow);
  yield fork(registerflow);
  yield fork(inserttopicflow);
  yield fork(createdeviceflow);
  yield fork(getnotifymessageflow);
}
