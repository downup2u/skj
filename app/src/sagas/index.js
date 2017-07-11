import { fork } from 'redux-saga/effects';
import {flowmain} from './flowmain';
import {calcmsgcountflow} from './calcmsgcount';
import {
  createsagacallbackflow
} from '../actions/sagacallback.js';
import {wififlow} from './wififlow';
import {wsrecvsagaflow} from './wsrecvsaga';
import {jpushflow} from './jpushflow';
import {payflow} from './payflow';
import {
  createsagacallbackflow2
} from '../sagas/sagacallback.js';

export default function* rootSaga() {
  yield fork(wsrecvsagaflow);
  yield fork(flowmain);
  yield fork(payflow);
  yield fork(wififlow);
  yield fork(jpushflow);
  yield fork(createsagacallbackflow);
  yield fork(createsagacallbackflow2);
}
