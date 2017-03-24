import { createAction } from 'redux-act';

//涉及到页面跳转的操作，可以用promise方式，便于管理，但需要额外对saga的封装
//1.
export const wait_createaddress_request = createAction('wait_createaddress_request');
export const wait_createaddress_result = createAction('wait_createaddress_result');
export const wait_editaddress_request = createAction('wait_editaddress_request');
export const wait_editaddress_result = createAction('wait_editaddress_result');
export const wait_register_request = createAction('wait_register_request');
export const wait_register_result = createAction('wait_register_result');
export const wait_inserttopic_request= createAction('wait_inserttopic_request');
export const wait_inserttopic_result= createAction('wait_inserttopic_result');
export const wait_createdevice_request = createAction('wait_createdevice_request');
export const wait_createdevice_result = createAction('wait_createdevice_result');
//以下为saga用
export const clickTab = createAction('click bottom tab');
export const clickNavPage = createAction('click nav page');
export const showpopmessage = createAction('showpopmessage');
export const hidepopmessage = createAction('hidepopmessage');

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

//forum.
export const getmytopic_request = createAction('forum.getmytopic_request');
export const getmytopic_result = createAction('forum.getmytopic_result');

export const inserttopic_request = createAction('forum.inserttopic_request');
export const inserttopic_result = createAction('forum.inserttopic_result');

export const gettopiclist_request = createAction('forum.gettopiclist_request');
export const gettopiclist_result = createAction('forum.gettopiclist_result');

export const insertcommentstotopic_request = createAction('forum.insertcommentstotopic_request');
export const insertcommentstotopic_result = createAction('forum.insertcommentstotopic_result');

export const insertcommentstocomments_request = createAction('forum.insertcommentstocomments_request');
export const insertcommentstocomments_result = createAction('forum.insertcommentstocomments_result');

export const lovetopicadd_request = createAction('forum.lovetopicadd_request');
export const lovetopicadd_result = createAction('forum.lovetopicadd_result');

export const lovetopicunadd_request = createAction('forum.lovetopicunadd_request');
export const lovetopicunadd_result = createAction('forum.lovetopicunadd_result');

export const lovecommentsadd_request = createAction('forum.lovecommentsadd_request');
export const lovecommentsadd_result = createAction('forum.lovecommentsadd_result');

export const lovecommentsunadd_request = createAction('forum.lovecommentsunadd_request');
export const lovecommentsunadd__result = createAction('forum.lovecommentsunadd__result');

export const uicommentshow = createAction('forum.uicommentshow');
export const uicommenthide = createAction('forum.uicommenthide');

//device
export const createdevice_request = createAction('device.createdevice_request');
export const createdevice_result = createAction('device.createdevice_result');

export const getdevicelist_request = createAction('device.getdevicelist_request');
export const getdevicelist_result = createAction('device.getdevicelist_result');

export const deletedevice_request = createAction('device.deletedevice_request');
export const deletedevice_result = createAction('device.deletedevice_result');

export const deletedevice_confirmpopshow =  createAction('device.deletedevice_confirmpopshow');
export const deletedevice_confirmpophide =  createAction('device.deletedevice_confirmpophide');
//-------------------------------------
export const disconnect =  createAction('disconnect');

export const serverpush_newtopic = createAction('serverpush_newtopic');
export const serverpush_newcoments = createAction('serverpush_newcoments');

export const newtopicfileuploadsetpreview =  createAction('newtopicfileupload.setpreview');
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
