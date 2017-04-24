/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    set_weui,
} from '../actions/index.js';

const initial = {
    weui: {
        toast: {
        	show : false,
        	text : "",
        	type : ""
        },
    },
};


const weui = createReducer({
    [set_weui]: (state, payload) => {
        return { ...state, ...payload };
    },
}, initial.weui);

export default weui;