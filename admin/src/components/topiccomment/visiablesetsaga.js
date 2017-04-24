import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';
import {
    VISIABLE_SET_SUCCESS,
    VISIABLE_SET_FAILURE,
    INVISIABLE_SET_SUCCESS,
    INVISIABLE_SET_FAILURE,
} from './visiablesetaction';

export default function* reviewSaga() {
    yield [
        takeEvery(VISIABLE_SET_SUCCESS, function* () {
            yield put(showNotification('resources.topic.notification.visiable_success'));
            yield put(push('/comments'));
        }),
        takeEvery(VISIABLE_SET_FAILURE, function* ({ error }) {
            yield put(showNotification('resources.topic.notification.visiable_error', 'warning'));
            console.error(error);
        }),
        takeEvery(INVISIABLE_SET_SUCCESS, function* () {
            yield put(showNotification('resources.topic.notification.invisiable_success'));
            yield put(push('/comments'));
        }),
        takeEvery(INVISIABLE_SET_FAILURE, function* ({ error }) {
            yield put(showNotification('resources.topic.notification.invisiable_error', 'warning'));
            console.error(error);
        }),
    ];
}
