import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';
import {
    SETENABLE_SUCCESS,
    SETENABLE_FAILURE,
    SETDISABLE_SUCCESS,
    SETDISABLE_FAILURE,
} from './enablesetaction';

export default function* productenableSaga() {
    yield [
        takeEvery(SETENABLE_SUCCESS, function* () {
            yield put(showNotification('resources.product.notification.enable_success'));
            yield put(push('/product'));
        }),
        takeEvery(SETENABLE_FAILURE, function* ({ error }) {
            yield put(showNotification('resources.product.notification.enable_error', 'warning'));
            console.error(error);
        }),
        takeEvery(SETDISABLE_SUCCESS, function* () {
            yield put(showNotification('resources.product.notification.disable_success'));
            yield put(push('/product'));
        }),
        takeEvery(SETDISABLE_FAILURE, function* ({ error }) {
            yield put(showNotification('resources.product.notification.disable_error', 'warning'));
            console.error(error);
        }),
    ];
}
