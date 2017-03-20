/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    //登录
    login_result,
    login_err,
} from '../actions/index.js';

const initial = {
    userlogin: {
        loginsuccess: false,
        profile: {},
    },
};

const userlogin = createReducer({
    [login_result]: (state, payload) => {
        return { ...state, profile: payload,loginsuccess:true };
    },
    [login_err]: (state, payload) => {
        return { ...state, loginsuccess:false};
    },
    // [sendauth_result]: (state, payload) => {
    //   return { ...state, loginsuccess:false};
    // },
    // [sendauth_err]: (state, payload) => {
    //   return { ...state, loginsuccess:false};
    // },
    // [register_result]: (state, payload) => {
    //   return { ...state, loginsuccess:false};
    // },
    // [register_err]: (state, payload) => {
    //   return { ...state, loginsuccess:false};
    // },
    }, initial.userlogin);

export default userlogin;