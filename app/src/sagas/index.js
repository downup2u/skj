import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';

import {
  createaddressflow,
  editaddressflow,
  registerflow,
    findpwdflow,
  inserttopicflow,
  createdeviceflow,
    getnotifymessageflow,
} from '../actions/sagacallback.js';
import {wififlow} from './wififlow';

export default function* rootSaga() {
  yield fork(flowmain);
  yield fork(wififlow);

  yield fork(createaddressflow);
  yield fork(editaddressflow);
  yield fork(registerflow);
  yield fork(findpwdflow);
  yield fork(inserttopicflow);
  yield fork(createdeviceflow);
  yield fork(getnotifymessageflow);
}
