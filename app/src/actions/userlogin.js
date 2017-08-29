/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const setlastreadmsgtime_request = createAction('setlastreadmsgtime_request');
export const setlastreadmsgtime_result = createAction('setlastreadmsgtime_result');

export const wait_register_request = createAction('wait_register_request');
export const wait_register_result = createAction('wait_register_result');
export const register_request = createAction('userlogin.register_request');
export const register_result = createAction('userlogin.register_result');
export const register_err = createAction('userlogin.register_err');

export const wait_oauthbinduser_request = createAction('wait_oauthbinduser_request');
export const wait_oauthbinduser_result = createAction('wait_oauthbinduser_result');
export const oauthbinduser_request = createAction('userlogin.oauthbinduser_request');
export const oauthbinduser_result = createAction('userlogin.oauthbinduser_result');


export const loginwithoauth_request = createAction('loginwithoauth_request');
export const loginwithoauth_result = createAction('loginwithoauth_result');

export const loginwithauth_request = createAction('userlogin.loginwithauth_request');
export const login_request = createAction('userlogin.login_request');
export const login_result = createAction('userlogin.login_result');
export const login_err = createAction('userlogin.login_err');
export const loginwithtoken_request = createAction('userlogin.loginwithtoken');

export const sendauth_request = createAction('userlogin.sendauth_request');
export const sendauth_result = createAction('userlogin.sendauth_result');
export const sendauth_err = createAction('userlogin.sendauth_err');

//发送编辑信息请求
export const fillprofile_request = createAction('fillprofile_request');
export const fillprofile_result = createAction('fillprofile_result');
export const ui_changeusername = createAction('ui_changeusername');
export const logout_request = createAction('userlogin.logout_request');
export const logout_result = createAction('userlogin.logout_result');


export const findpwd_request = createAction('findpwd_request');
export const findpwd_result = createAction('findpwd_result');


export const queryuserbalance_request= createAction('queryuserbalance_request');
export const queryuserbalance_result= createAction('queryuserbalance_result');
