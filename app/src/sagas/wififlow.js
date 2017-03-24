/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import {getwifilist_request,getwifilist_result} from '../actions';
import { fork, take, call, put, cancel,race } from 'redux-saga/effects';
import {delay} from 'redux-saga';
import config from '../config.js';

function getwifilist() {
    return new Promise(resolve => {
        let wifilist = [
            {
                ssid:'aaaaaa',
                mac:'aa:bb:cc:dd'
            },
            {
                ssid:'bbbb',
                mac:'aa:bb:cc:dd'
            },
            {
                ssid:'cccccc',
                mac:'aa:bb:cc:dd'
            },
            {
                ssid:'ddddd',
                mac:'aa:bb:cc:dd'
            },
        ];
        window.setTimeout(()=>{resolve(wifilist);},0);

    });
}

export function* wififlow() {
    while (true) {
        yield take(`${getwifilist_request}`);
        let wifilist = yield call(getwifilist);
        yield put(getwifilist_result(wifilist));
    }
}