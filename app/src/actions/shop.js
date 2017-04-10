/**
 * Created by wangxiaoqing on 2017/4/7.
 */
import { createAction } from 'redux-act';
export const search_shoptxt = createAction('search_shoptxt');

export const getbanner_request = createAction('getbanner_request');
export const getbanner_result = createAction('getbanner_result');

export const getcategory_request = createAction('getcategory_request');
export const getcategory_result = createAction('getcategory_result');

//产品分页数据
export const getproduct_request = createAction('getproduct_request');
export const getproduct_result = createAction('getproduct_result');

//购物车
export const mycartaddone_request = createAction('mycartaddone_request');//添加购物车
export const mycartaddone_result = createAction('mycartaddone_result');
export const mycartdelone_request = createAction('mycartdelone_request');
export const mycartdelone_result = createAction('mycartdelone_result');
export const mycartgetall_request = createAction('mycartgetall_request');
export const mycartgetall_result = createAction('mycartgetall_result');

//我的收藏
export const mycollectionaddone_request = createAction('mycollectionaddone_request');
export const mycollectionaddone_result = createAction('mycollectionaddone_result');
export const mycollectiondelone_request = createAction('mycollectiondelone_request');
export const mycollectiondelone_result = createAction('mycollectiondelone_result');
export const mycollectiongetall_request = createAction('mycollectiongetall_request');
export const mycollectiongetall_result = createAction('mycollectiongetall_result');

//我的订单
export const myorderaddone_request = createAction('myorderaddone_request');
export const myorderaddone_result = createAction('myorderaddone_result');
export const myorderupdateone_request = createAction('myorderupdateone_request');
export const myorderupdateone_result = createAction('myorderupdateone_result');
export const myorderdelone_request = createAction('myorderdelone_request');
export const myorderdelone_result = createAction('myorderdelone_result');
export const myordergetall_request = createAction('myordergetall_request');
export const myordergetall_result = createAction('myordergetall_result');
