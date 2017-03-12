import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';

import config from '../config.js';
import {
  showpopmessage,
  login_request,login_result,login_err,
  logout_request,

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
  disconnect
} from '../actions';
import {
  sendauth_request,sendauth_result,sendauth_err,
  register_request,register_result,register_err,
} from '../actions/index.js';

import {wsrecvhandler} from './wsrecvhandler.js';


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
    console.log("not login!");
    yield take(`${login_result}`);
    console.log("login success!");
    let fnsz = [
      {
        fnname:`${getmytopic_request}`,
        cmd:'getmytopic'
      },
      {
        fnname:`${inserttopic_request}`,
        cmd:'inserttopic'
      },
      {
        fnname:`${insertcommentstotopic_request}`,
        cmd:'insertcommentstotopic'
      },
      {
        fnname:`${insertcommentstocomments_request}`,
        cmd:'insertcommentstocomments'
      },
      {
        fnname:`${lovetopicadd_request}`,
        cmd:'lovetopicadd'
      },
      {
        fnname:`${lovetopicunadd_request}`,
        cmd:'lovetopicunadd'
      },
      {
        fnname:`${lovecommentsadd_request}`,
        cmd:'lovecommentsadd'
      },
      {
        fnname:`${lovecommentsunadd_request}`,
        cmd:'lovecommentsunadd'
      },
      {
        fnname:`${createdevice_request}`,
        cmd:'createdevice'
      },
      {
        fnname:`${getdevicelist_request}`,
        cmd:'getdevicelist'
      },
      {
        fnname:`${deletedevice_request}`,
        cmd:'deletedevice'
      },
      {
        fnname:`${createaddress_request}`,
        cmd:'createaddress'
      },
      {
        fnname:`${deleteaddress_request}`,
        cmd:'deleteaddress'
      },
      {
        fnname:`${editaddress_request}`,
        cmd:'editaddress'
      },
      {
        fnname:`${getaddresslist_request}`,
        cmd:'getaddresslist'
      },
    ];
    let tasksz =[];
    for (var fn of fnsz) {
      let task =  yield fork(write, socket,fn.fnname,fn.cmd);
      tasksz.push(task);
    }
    let action = yield take(`${logout_request}`);
    for (var task of tasksz) {
      yield cancel(task);
    }


  }
}

function* handleIO(socket) {
  let fnsz = [
    {
      fnname:`${login_request}`,
      cmd:'login'
    },
    {
      fnname:`${sendauth_request}`,
      cmd:'sendauth'
    },
    {
      fnname:`${register_request}`,
      cmd:'register'
    },
    {
      fnname:`${gettopiclist_request}`,
      cmd:'gettopiclist'
    },
  ];
  // yield fork(write, socket,fnsz[0].fnname,fnsz[0].cmd);//for test
  // yield fork(write, socket,fnsz[1].fnname,fnsz[1].cmd);//for test
  // yield fork(write, socket,fnsz[2].fnname,fnsz[2].cmd);//for test
  // yield fork(write, socket,fnsz[3].fnname,fnsz[3].cmd);//for test
  for (var fn of fnsz) {
        // some item manipulation
        yield fork(write, socket,fn.fnname,fn.cmd);
    }
//  let tasksz =[];
  // fnsz.forEach(function *(fn){
  //   let task =  yield fork(write, socket,fn.fnname,fn.cmd);//for test
  //   //yield tasksz.push(task);
  // });
}


function* flow() {
  while (true) {
    console.log("flow...");

    const socket = yield call(connect);
    const taskread = yield fork(read, socket);
    const taskwritewithauth = yield fork(handleIOWithAuth, socket);
    const taskwrite = yield fork(handleIO, socket);

    yield take(`${disconnect}`);
    console.log('断开连接,重新连接中');
    yield cancel(taskread);
    yield cancel(taskwritewithauth);
    yield cancel(taskwrite);
  }
}

import {
  createaddressflow,
  editaddressflow,
  registerflow,
  inserttopicflow,
  createdeviceflow,
} from '../actions/sagacallback.js';

export default function* rootSaga() {
  yield fork(flow);
  yield fork(createaddressflow);
  yield fork(editaddressflow);
  yield fork(registerflow);
  yield fork(inserttopicflow);
  yield fork(createdeviceflow);
}
