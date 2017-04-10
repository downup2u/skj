import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';

import {
  createsagacallbackflow
} from '../actions/sagacallback.js';
import {wififlow} from './wififlow';

export default function* rootSaga() {
  yield fork(flowmain);
  yield fork(wififlow);

  yield fork(createsagacallbackflow);
}
