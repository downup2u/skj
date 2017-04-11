/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    serverpush_mycartcount
} from '../actions';
import {normalizr_cartslist} from './normalizr';

const initial = {
    carts: {
        remoteRowCount:0,
    },
};

const carts = createReducer({
        [serverpush_mycartcount]:(state, remoteRowCount) => {
            return  {...state,remoteRowCount};
        },
}, initial.carts);

export default carts;