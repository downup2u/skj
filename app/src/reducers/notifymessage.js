/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createReducer } from 'redux-act';
import {
    ui_setnotifymessage,
    getnotifymessageone_result
} from '../actions';

const initial = {
    notifymessage: {
        notifymessageitem:{}
    },
};

const notifymessage = createReducer({
        [getnotifymessageone_result]:(state,payload)=>{
            let notifymessageitem = {...payload};
            return  {...state,notifymessageitem};
        },
        [ui_setnotifymessage]:(state, payload) => {
          let notifymessageitem = {...payload};
          return  {...state,notifymessageitem};
        },
}, initial.notifymessage);

export default notifymessage;
