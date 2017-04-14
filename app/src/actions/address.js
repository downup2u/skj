/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const wait_createaddress_request = createAction('wait_createaddress_request');
export const wait_createaddress_result = createAction('wait_createaddress_result');
export const wait_editaddress_request = createAction('wait_editaddress_request');
export const wait_editaddress_result = createAction('wait_editaddress_result');

//-------------------------------------
//address
export const createaddress_request = createAction('address.createaddress_request');
export const createaddress_result = createAction('address.createaddress_result');

export const deleteaddress_request = createAction('address.deleteaddress_request');
export const deleteaddress_result = createAction('address.deleteaddress_result');

export const editaddress_request = createAction('address.editaddress_request');
export const editaddress_result = createAction('address.editaddress_result');

export const getaddresslist_request = createAction('address.getaddresslist_request');
export const getaddresslist_result = createAction('address.getaddresslist_result');

export const deleteaddress_confirmpopshow = createAction('address.deleteaddress_confirmpopshow');
export const deleteaddress_confirmpophide = createAction('address.deleteaddress_confirmpophide');

export const serverpush_defaultaddress = createAction('address.serverpush_defaultaddress');