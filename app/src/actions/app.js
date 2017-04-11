/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

//以下为saga用
export const clickTab = createAction('click bottom tab');
export const showpopmessage = createAction('showpopmessage');
export const hidepopmessage = createAction('hidepopmessage');

//点击显示大图
export const uicommentimg = createAction('forum.uicommentimg');

//滚动事件
export const uiinfinitepage_init = createAction('uiinfinitepage_init');
export const uiinfinitepage_getdata = createAction('uiinfinitepage_getdata');
export const uiinfinitepage_setstate = createAction('uiinfinitepage_setstate');