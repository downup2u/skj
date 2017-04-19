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
    serverpush_usermoney,
    getusergetpointsigntoday_result,
    loginwithoauth_result
} from '../actions/index.js';

const initial = {
    userlogin: {
        editusername:'',
        loginsuccess:false,
        username:'',
        userid:'',
        token:'',
        profile:{},
        invitecode:'',
        defaultaddress:{},
        balance:0,
        point:0,
        isusergetpointsigntoday:true,
        bindtype:'',
        openid:'',
    },
};

const userlogin = createReducer({
    [loginwithoauth_result]:(state,payload)=>{
        const {bindtype,openid} = payload;
        return  {...state,bindtype,openid};
    },
    [getusergetpointsigntoday_result]:(state, isusergetpointsigntoday)=>{
        return { ...state,isusergetpointsigntoday};
    },
    [serverpush_usermoney]:(state, payload)=>{
        const {balance,point} = payload;
        return { ...state,balance,point};
    },
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