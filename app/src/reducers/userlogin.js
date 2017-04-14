/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    //登录
    login_result,
    login_err,
    fillprofile_result,
    ui_changeusername,
    logout_result,
    serverpush_defaultaddress,
} from '../actions/index.js';

const initial = {
    userlogin: {
        editusername:'',
        loginsuccess:false,
        username:'',
        userid:'',
        token:'',
        profile:{},
        defaultaddress:{}
    },
};

const userlogin = createReducer({
    [serverpush_defaultaddress]:(state, defaultaddress)=>{
        return { ...state,defaultaddress:{...defaultaddress}};
    },
    [logout_result]:(state, payload)=>{
        return { ...initial.userlogin,defaultaddress:{}};
    },
    [ui_changeusername]:(state,editusername)=>{
        return {...state,editusername};
    },
    [fillprofile_result]: (state, {profile}) => {
        return { ...state, profile,editusername:profile.nickname};
    },
    [login_result]: (state, payload) => {
        localStorage.setItem('shuikejing_user_token',payload.token);
        return { ...state, ...payload,loginsuccess:true ,editusername:payload.profile.nickname};
    },
    [login_err]: (state, payload) => {
        return { ...initial.userlogin};
    },
}, initial.userlogin);

export default userlogin;