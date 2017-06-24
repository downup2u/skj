/**
 * Created by wangxiaoqing on 2017/3/29.
 */
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';

import config from '../env/config.js';

import data from './datahandler.js';

import {wsrecvhandler} from './wsrecvhandler.js';
import {
    login_result,
    logout_result
} from '../actions';

let sendmsgwhenreconnect =(socket)=>{
    //连接上以后直接发送-----》
    let token = localStorage.getItem('shuikejing_user_token');
    if (token !== null) {
        socket.emit('message',{cmd:'loginwithtoken',data:{token:token}});
    }
    socket.emit('message',{cmd:'getsystemconfig',data:{}});
    socket.emit('message',{cmd:'getnews',data:{}});
    socket.emit('message',{cmd:'getbanner',data:{}});
    socket.emit('message',{cmd:'getcategory',data:{}});
    socket.emit('message',{cmd:'getproduct',data:{}});
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
        let fnsz = data.sendmessageauthfnsz;

        let tasksz =[];
        for (let cmd in fnsz) {
            let task =  yield fork(write, socket,fnsz[cmd],cmd);
            tasksz.push(task);
        }

        let action = yield take(`${logout_result}`);
        //yield put(action);
        localStorage.removeItem('shuikejing_user_token');

        for(let i=0;i<tasksz.length;i++){
            yield cancel(tasksz[i]);
        }
    }
}

function* handleIO(socket) {
    let fnsz = data.sendmessagefnsz;


    let tasksz =[];
    for (let cmd in fnsz) {
        let task =  yield fork(write, socket,fnsz[cmd],cmd);
        tasksz.push(task);
    }
}


export function* flowmain() {
    const socket = yield call(connect);
    //连接上以后直接发送-----》
    sendmsgwhenreconnect(socket);

    const taskread = yield fork(read, socket);
    const taskwritewithauth = yield fork(handleIOWithAuth, socket);
    const taskwrite = yield fork(handleIO, socket);

}
