import { createReducer } from 'redux-act';
import {
    clickTab,
    showpopmessage,
    hidepopmessage,
} from '../actions/index.js';

const initial = {
    app: {
        curtabindex: 0,
        type: 'error',
        title: '',
        msg: '',
        ispop: false
    },
};

const app = createReducer({
    [clickTab]: (state, payload) => {
        return { ...state, curtabindex: payload.curtabindex };
    },
    [showpopmessage]:(state, payload) => {
        return { ...state,msg:payload.msg,title:payload.title,type:payload.type,ispop:true};
    },
    [hidepopmessage]:(state, payload) => {
        return { ...state,msg:'',title:'',ispop:false};
    },
}, initial.app);

export default app;