/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { put,takeEvery,call,race} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  getssid,
  senddata
} from '../env/device.js';
import {
  showpopmessage,
  getcurwifi_request,
  getcurwifi_result,
  getcurwifi_devicelist_request,
  getcurwifi_devicelist_result,
  md_createdevice_result,
  createdevice_result,
  md_updatedevice_result,
  updatedevice_result,
  set_weui
} from '../actions';
import { push,replace } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

function getcurwifi() {
    return new Promise(resolve => {
      getssid((result)=>{
        resolve(result);
      });
    });
}

function sendwifidata(values){
  return new Promise(resolve => {
    senddata(values,(retdata)=>{
      resolve(retdata);
    });
  });
}

export function* wififlow() {
    console.log(`wififlow======>`);

    yield takeEvery(`${md_createdevice_result}`, function*(action) {
          let {payload:result} = action;
          console.log(`md_createdevice_result:${JSON.stringify(result)}`);
          yield put(createdevice_result(result));
          const {newdevice} = result;
          yield put(push(`/editdevice/${newdevice._id}`));
    });

    yield takeEvery(`${md_updatedevice_result}`, function*(action) {
          let {payload:result} = action;
          console.log(`md_updatedevice_result:${JSON.stringify(result)}`);
          yield put(updatedevice_result(result));
          yield put(replace(`/devicelist`));
    });

    yield takeEvery(`${getcurwifi_request}`, function*(action) {
          let {payload:result} = action;
          console.log(`getcurwifi_request:${JSON.stringify(result)}`);
          const { wifiresult, timeout } = yield race({
             wifiresult: yield call(getcurwifi),
             timeout: call(delay, 2000)
          });
          if(!!timeout){
            yield put(set_weui(
              {
                toast:{
                  show:true,
                  text:`调用函数超时`,
                  type:'warning'
                }
              }
            ));
          }
          else{
            yield put(getcurwifi_result(wifiresult));
          }

    });

    yield takeEvery(`${getcurwifi_devicelist_request}`, function*(action) {
          let {payload:result} = action;
          console.log(`getcurwifi_devicelist_request:${JSON.stringify(result)}`);
          const { wifiresult, timeout } = yield race({
             wifiresult: yield call(sendwifidata,result),
             timeout: call(delay, 60000)
          });
          if(!!timeout){
            yield put(set_weui(
              {
                toast:{
                  show:true,
                  text:`调用函数超时`,
                  type:'warning'
                }
              }
            ));
          }
          else{
            if(wifiresult.code === '0'){
              yield put(getcurwifi_devicelist_result(wifiresult.data));
              yield put(push('/addnewdevice2'));
            }
            else{
              //弹框,message
              yield put(set_weui(
                {
                  toast:{
                    show:true,
                    text:wifiresult.message,
                    type:'warning'
                  }
                }
              ));
            }
          }

    });
}
