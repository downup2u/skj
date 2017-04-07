/**
 * Created by wangxiaoqing on 2017/4/7.
 */
import { createAction } from 'redux-act';

export const getbanner_request = createAction('getbanner_request');
export const getbanner_result = createAction('getbanner_result');

export const getcategory_request = createAction('getcategory_request');
export const getcategory_result = createAction('getcategory_result');

export const getproduct_request = createAction('getproduct_request');
export const getproduct_result = createAction('getproduct_result');
