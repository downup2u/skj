/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    serverpush_mycartcount,
    ui_cartooder_additem,
    ui_cartooder_delitem,
    ui_cartooder_updateitem
} from '../actions';
import {normalizr_cartslist} from './normalizr';
import _ from 'lodash';

const initial = {
    carts: {
        remoteRowCount:0,
        toordercarts:{},
    },
};

const carts = createReducer({
        [serverpush_mycartcount]:(state, remoteRowCount) => {
            return  {...state,remoteRowCount};
        },
        [ui_cartooder_updateitem]:(state, item) => {
            let toordercarts = state.toordercarts;
            toordercarts[item._id] = item;
            return  {...state,toordercarts:{...toordercarts}};
        },
        [ui_cartooder_additem]:(state, item) => {
            let toordercarts = state.toordercarts;
            toordercarts[item._id] = item;
            return  {...state,toordercarts:{...toordercarts}};
        },
        [ui_cartooder_delitem]:(state, item) => {
            let toordercarts = state.toordercarts;
            delete toordercarts[item._id];
            return  {...state,toordercarts:{...toordercarts}};
        },
}, initial.carts);

export default carts;