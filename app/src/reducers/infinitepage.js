/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createReducer } from 'redux-act';
import {
    uiinfinitepage_init,
    uiinfinitepage_getrowcount,
} from '../actions';
import {normalizr_notifymessageslist} from './normalizr';

const initial = {
    infinitepage: {
        remoteRowCount:0,
        rendered:false,
        options: {
            mouseWheel: true,
            scrollbars: true
        }
    },
};

const infinitepage = createReducer({
        [uiinfinitepage_init]:(state, rendered) => {
            let remoteRowCount = state.remoteRowCount;
            if(!rendered){
                remoteRowCount = 0;
            }
            return  {...state,rendered,remoteRowCount};
        },
        [uiinfinitepage_getrowcount]:(state, remoteRowCount) => {
            return {...state,remoteRowCount};
        },

}, initial.infinitepage);

export default infinitepage;