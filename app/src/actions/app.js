/**
 * Created by wangxiaoqing on 2017/3/25.
 */
import { createAction } from 'redux-act';

//以下为saga用
export const clickTab = createAction('click bottom tab');
export const showpopmessage = createAction('showpopmessage');
export const hidepopmessage = createAction('hidepopmessage');