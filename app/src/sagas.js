import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import config from './config.js';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
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
  disconnect
} from './actions';
import {
  sendauth_request,sendauth_result,sendauth_err,
  register_request,register_result,register_err,
} from './actions/index.js';

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
    socket.on('users.login_err',({errmsg})=>{
      emit(login_err());
      emit(showpopmessage({
        title:'登录失败',
        msg:errmsg,
        type:'error'
      }));
    });
    socket.on('users.sendauth_result',({errmsg})=>{
      emit(showpopmessage({
        title:'成功',
        msg:'发送验证码成功',
        type:'success'
      }));
    });
    socket.on('users.sendauth_err',({errmsg})=>{
      emit(showpopmessage({
        title:'发送验证码失败',
        msg:errmsg,
        type:'error'
      }));
    });
    socket.on('users.register_result',({errmsg})=>{
      emit(showpopmessage({
        title:'成功',
        msg:'注册成功',
        type:'success'
      }));
    });
    socket.on('users.register_err',({errmsg})=>{
      emit(showpopmessage({
        title:'注册失败',
        msg:errmsg,
        type:'error'
      }));
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
        fnname:`${lovecommentsunadd_request}`,
        cmd:'getdevicelist'
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

export default function* rootSaga() {
  yield fork(flow);
}
