/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

export const setisweixininstalled = createAction('setisweixininstalled');
export const setisqqstalled = createAction('setisqqstalled');
//以下为saga用
export const clickTab = createAction('click bottom tab');
export const showpopmessage = createAction('showpopmessage');
export const hidepopmessage = createAction('hidepopmessage');

//点击显示大图
export const uicommentimg = createAction('forum.uicommentimg');
export const ui_setcurrentdeviceid = createAction('ui_setcurrentdeviceid');
//滚动事件
export const uiinfinitepage_init = createAction('uiinfinitepage_init');
export const uiinfinitepage_getdata = createAction('uiinfinitepage_getdata');
export const uiinfinitepage_setstate = createAction('uiinfinitepage_setstate');
export const uiinfinitepage_deleteitem = createAction('uiinfinitepage_deleteitem');
export const uiinfinitepage_updateitem = createAction('uiinfinitepage_updateitem');

export const getsystemconfig_request = createAction('getsystemconfig_request');
export const getsystemconfig_result = createAction('getsystemconfig_result');

export const setmsgcount = createAction('setmsgcount');

export const common_err = createAction('common_err');
export const set_innerheight = createAction('set_innerheight');

export const setsharesettingcur = createAction('setsharesettingcur');
//set_innerheight
export const getserverdate_request = createAction('getserverdate_request');
export const getserverdate_result = createAction('getserverdate_result');


//set_homeconfirmday,
//set_homeconfirmvol,
export const set_homeconfirmday = createAction('set_homeconfirmday');
export const set_homeconfirmvol = createAction('set_homeconfirmvol');
