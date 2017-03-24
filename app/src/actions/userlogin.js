/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const wait_register_request = createAction('wait_register_request');
export const wait_register_result = createAction('wait_register_result');


export const login_request = createAction('userlogin.login_request');
export const login_result = createAction('userlogin.login_result');
export const login_err = createAction('userlogin.login_err');
export const loginwithtoken_request = createAction('userlogin.loginwithtoken');

export const sendauth_request = createAction('userlogin.sendauth_request');
export const sendauth_result = createAction('userlogin.sendauth_result');
export const sendauth_err = createAction('userlogin.sendauth_err');
export const register_request = createAction('userlogin.register_request');
export const register_result = createAction('userlogin.register_result');
export const register_err = createAction('userlogin.register_err');

export const logout_request = createAction('userlogin.logout_request');
