/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createReducer } from 'redux-act';
import {
    ui_setnotifymessage,
    getnotifymessageone_result
} from '../actions';
import {normalizr_notifymessageslist} from './normalizr';

const initial = {
    notifymessage: {
        mynotifymessages: {},
        notifymessageitem:{}
    },
};

const notifymessage = createReducer({
        [getnotifymessageone_result]:(state,payload)=>{
            let notifymessageitem = {...payload};
            return  {...state,notifymessageitem};
        },
        [ui_setnotifymessage]:(state, mynotifymessages) => {
            return  {...state,mynotifymessages};
        },
}, initial.notifymessage);

export default notifymessage;
