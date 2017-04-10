/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createReducer } from 'redux-act';
import {
    ui_setnotifymessage
} from '../actions';
import {normalizr_notifymessageslist} from './normalizr';

const initial = {
    notifymessage: {
        mynotifymessages: {}
    },
};

const notifymessage = createReducer({
        [ui_setnotifymessage]:(state, mynotifymessages) => {
            return  {...state,mynotifymessages};
        },
}, initial.notifymessage);

export default notifymessage;