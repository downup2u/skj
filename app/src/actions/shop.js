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
export const wait_mycartupdateone_request = createAction('wait_mycartupdateone_request');//修改购物车
export const wait_mycartupdateone_result = createAction('wait_mycartupdateone_result');
export const mycartupdateone_request = createAction('mycartupdateone_request');//修改购物车
export const mycartupdateone_result = createAction('mycartupdateone_result');
export const wait_mycartdelone_request = createAction('wait_mycartdelone_request');
export const wait_mycartdelone_result = createAction('wait_mycartdelone_result');
export const mycartdelone_request = createAction('mycartdelone_request');
export const mycartdelone_result = createAction('mycartdelone_result');
export const mycartgetall_request = createAction('mycartgetall_request');
export const mycartgetall_result = createAction('mycartgetall_result');
export const wait_mycartgetall_request = createAction('wait_mycartgetall_request');
export const wait_mycartgetall_result = createAction('wait_mycartgetall_result');
export const serverpush_mycartcount = createAction('serverpush_mycartcount');
//我的收藏
export const mycollectionaddone_request = createAction('mycollectionaddone_request');
export const mycollectionaddone_result = createAction('mycollectionaddone_result');
export const wait_mycollectiondelone_request = createAction('wait_mycollectiondelone_request');
export const wait_mycollectiondelone_result = createAction('wait_mycollectiondelone_result');
export const mycollectiondelone_request = createAction('mycollectiondelone_request');
export const mycollectiondelone_result = createAction('mycollectiondelone_result');
export const mycollectiongetall_request = createAction('mycollectiongetall_request');
export const mycollectiongetall_result = createAction('mycollectiongetall_result');
export const wait_mycollectiongetall_request = createAction('wait_mycollectiongetall_request');
export const wait_mycollectiongetall_result = createAction('wait_mycollectiongetall_result');
export const serverpush_mycollectioncount = createAction('serverpush_mycollectioncount');

export const mycollectionisproductexits_request = createAction('mycollectionisproductexits_request');
export const mycollectionisproductexits_result = createAction('mycollectionisproductexits_result');
export const wait_mycollectionisproductexits_request = createAction('wait_mycollectionisproductexits_request');
export const wait_mycollectionisproductexits_result = createAction('wait_mycollectionisproductexits_result');

//我的订单
export const myorderaddone_request = createAction('myorderaddone_request');
export const myorderaddone_result = createAction('myorderaddone_result');
export const myorderupdateone_request = createAction('myorderupdateone_request');
export const myorderupdateone_result = createAction('myorderupdateone_result');
export const myorderdelone_request = createAction('myorderdelone_request');
export const myorderdelone_result = createAction('myorderdelone_result');
export const wait_myordergetall_request = createAction('wait_myordergetall_request');
export const wait_myordergetall_result = createAction('wait_myordergetall_result');
export const myordergetall_request = createAction('myordergetall_request');
export const myordergetall_result = createAction('myordergetall_result');

//动态（自动获取）
export const getnews_request = createAction('getnews_request');
export const getnews_result = createAction('getnews_result');