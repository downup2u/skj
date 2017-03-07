import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import config from './config.js';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import {
  login_request,login_result,
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
  disconnect
} from './actions';

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
    socket.on('users.login_result', ({ profile }) => {
      emit(login_result( profile ));
    });
    //-------------------------------
    socket.on('forum.inserttopic_result',({newtopic})=>{
      emit(inserttopic_result(newtopic));
    });
    socket.on('forum.getmytopic_result', ({ mytopiclist }) => {
      emit(getmytopic_result(mytopiclist ));
    });
    socket.on('forum.gettopiclist_result', ({ alltopiclist }) => {
      emit(gettopiclist_result( alltopiclist ));
    });
    socket.on('forum.lovetopicadd_result', ({ updatedtopic }) => {
      emit(lovetopicadd_result( updatedtopic ));
    });
    socket.on('forum.lovetopicunadd_result', ({ updatedtopic }) => {
      emit(lovetopicunadd_result( updatedtopic ));
    });
    socket.on('forum.lovecommentsadd_result', ({ updatedcomment }) => {
      emit(lovecommentsadd_result( updatedcomment ));
    });
    socket.on('forum.lovecommentsunadd_result', ({ updatedcomment }) => {
      emit(lovecommentsunadd_result( updatedcomment ));
    });
    socket.on('forum.insertcommentstotopic_result', ({ newcomments,updatedtopic }) => {
      emit(insertcommentstotopic_result( { newcomments,updatedtopic } ));
    });
    socket.on('forum.insertcommentstocomments_result', ({ newcomments,updatedcomment }) => {
      emit(insertcommentstocomments_result( { newcomments,updatedcomment }));
    });
    //-------------------------------
    socket.on('device.createdevice_result', ({ newdevice }) => {
      emit(createdevice_result( newdevice ));
    });

    socket.on('device.getdevicelist_result', ({ mydevicelist }) => {
      emit(getdevicelist_result( mydevicelist ));
    });

    socket.on('disconnect', e => {
      emit(disconnect());
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
    let { payload } = yield take(`${login_request}`);
    socket.emit('message',{cmd:'login',data:payload});

    const task1 = yield fork(write, socket,`${getmytopic_request}`,'getmytopic');
    const task2 = yield fork(write, socket,`${inserttopic_request}`,'inserttopic');
    const task3 = yield fork(write, socket,`${insertcommentstotopic_request}`,'insertcommentstotopic');



    let action = yield take(`${logout_request}`);

    yield cancel(task1);
    yield cancel(task2);
    yield cancel(task3);

  }
}

function* handleIO(socket) {
  yield fork(write, socket,`${gettopiclist_request}`,'gettopiclist');
  yield fork(write, socket,`${inserttopic_request}`,'inserttopic');//for test
  yield fork(write, socket,`${insertcommentstotopic_request}`,'insertcommentstotopic');//for test

  yield fork(write, socket,`${lovetopicadd_request}`,'lovetopicadd');//for test
  yield fork(write, socket,`${lovetopicunadd_request}`,'lovetopicunadd');//for test
  yield fork(write, socket,`${lovecommentsadd_request}`,'lovecommentsadd');//for test
  yield fork(write, socket,`${lovecommentsunadd_request}`,'lovecommentsunadd');//for test

  yield fork(write, socket,`${createdevice_request}`,'createdevice');//for test
  yield fork(write, socket,`${getdevicelist_request}`,'getdevicelist');//for test
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

export default function* rootSaga() {
  yield fork(flow);
}
