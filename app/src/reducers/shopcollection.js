/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    serverpush_mycollectioncount,
    logout_result
} from '../actions';
import {normalizr_collectionslist} from './normalizr';

const initial = {
    collections: {
        remoteRowCount:0,
    },
};

const collections = createReducer({
        [logout_result]:(state, payload)=>{
            return { ...initial.collections};
        },
        [serverpush_mycollectioncount]:(state, remoteRowCount) => {
            return  {...state,remoteRowCount};
        },
        
}, initial.collections);

export default collections;