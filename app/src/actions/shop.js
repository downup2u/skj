/**
 * Created by wangxiaoqing on 2017/4/7.
 */
import { createAction } from 'redux-act';


export const ui_cartooder_additem = createAction('ui_cartooder_additem');
export const ui_cartooder_delitem = createAction('ui_cartooder_delitem');
export const ui_cartooder_updateitem = createAction('ui_cartooder_updateitem');

export const search_shoptxt = createAction('search_shoptxt');

export const getbanner_request = createAction('getbanner_request');
export const getbanner_result = createAction('getbanner_result');

export const getcategory_request = createAction('getcategory_request');
export const getcategory_result = createAction('getcategory_result');

//获取支付验证字符串
export const wait_getpaysign_request= createAction('wait_getpaysign_request');
export const wait_getpaysign_result= createAction('wait_getpaysign_result');
export const getpaysign_request = createAction('getpaysign_request');
export const getpaysign_result = createAction('getpaysign_result');
export const getpaysign_err = createAction('getpaysign_err');

//添加购物车控件
export const uiaddcartdilog = createAction('uiaddcartdilog');

//显示商品是否被收藏
export const uiiscollection = createAction("uiiscollection");

//我的优惠券类型
export const setulcoupontype = createAction("setulcoupontype");

//产品分页数据
export const getproduct_request = createAction('getproduct_request');
export const getproduct_result = createAction('getproduct_result');

//设置产品列表页面配置参数
export const set_productlist = createAction('set_productlist');

//生成订单确认页面
export const set_orderSurePage = createAction('set_orderSurePage');

//新增一个订单数据
export const myorderlist_addreducers = createAction('myorderlist_addreducers');

//选择当前支付组件
export const payway_set = createAction('payway_set');

//购物车
export const mycartaddone_request = createAction('mycartaddone_request');//添加购物车
export const mycartaddone_result = createAction('mycartaddone_result');
export const wait_mycartaddone_request = createAction('wait_mycartaddone_request');//添加购物车
export const wait_mycartaddone_result = createAction('wait_mycartaddone_result');

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
//新增一个订单
export const wait_myorderaddone_request = createAction('wait_myorderaddone_request');
export const wait_myorderaddone_result = createAction('wait_myorderaddone_result');
export const myorderaddone_request = createAction('myorderaddone_request');
export const myorderaddone_result = createAction('myorderaddone_result');

//更新一个订单
export const wait_myorderupdateone_request = createAction('wait_myorderupdateone_request');
export const wait_myorderupdateone_result = createAction('wait_myorderupdateone_result');
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



//产品评论相关
//获取一个产品下所有评论
export const wait_productcommentsfromproduct_request = createAction('wait_productcommentsfromproduct_request');
export const wait_productcommentsfromproduct_result = createAction('wait_productcommentsfromproduct_result');
export const productcommentsfromproduct_request = createAction('productcommentsfromproduct_request');
export const productcommentsfromproduct_result = createAction('productcommentsfromproduct_result');

//新增一个商品评论 productcommentaddone
export const wait_productcommentaddone_request = createAction('wait_productcommentaddone_request');
export const wait_productcommentaddone_result = createAction('wait_productcommentaddone_result');
export const productcommentaddone_request = createAction('productcommentaddone_request');
export const productcommentaddone_result = createAction('productcommentaddone_result');


//获取一个商品评论个数 productcommentsfromproductgetcount
export const wait_productcommentsfromproductgetcount_request = createAction('wait_productcommentsfromproductgetcount_request');
export const wait_productcommentsfromproductgetcount_result = createAction('wait_productcommentsfromproductgetcount_result');
export const productcommentsfromproductgetcount_request = createAction('productcommentsfromproductgetcount_request');
export const productcommentsfromproductgetcount_result = createAction('productcommentsfromproductgetcount_result');

//============提现============
//提现申请
export const wait_withdrawcashapplyaddone_request = createAction('wait_withdrawcashapplyaddone_request');
export const wait_withdrawcashapplyaddone_result = createAction('wait_withdrawcashapplyaddone_result');
export const withdrawcashapplyaddone_request = createAction('withdrawcashapplyaddone_request');
export const withdrawcashapplyaddone_result = createAction('withdrawcashapplyaddone_result');

//提现手机验证
export const wait_withdrawcashapplyauth_request = createAction('wait_withdrawcashapplyauth_request');
export const wait_withdrawcashapplyauth_result = createAction('wait_withdrawcashapplyauth_result');
export const withdrawcashapplyauth_request = createAction('withdrawcashapplyauth_request');
export const withdrawcashapplyauth_result = createAction('withdrawcashapplyauth_result');

//获取我的优惠券
export const mycoupongetall_request = createAction('mycoupongetall_request');
export const mycoupongetall_result = createAction('mycoupongetall_result');
export const wait_mycoupongetall_request = createAction('wait_mycoupongetall_request');
export const wait_mycoupongetall_result = createAction('wait_mycoupongetall_result');

//获取我的分销相关信息
//获取下级用户个数
export const getnextusers_request = createAction('getnextusers_request');
export const getnextusers_result = createAction('getnextusers_result');

export const getdistsalesorderstat_request = createAction('getdistsalesorderstat_request');
export const getdistsalesorderstat_result = createAction('getdistsalesorderstat_result');


export const getdistsalesorders_request = createAction('getdistsalesorders_request');
export const getdistsalesorders_result = createAction('getdistsalesorders_result');

//获取分销明细（放分页里面）
export const getdistsalesorderdetails_request = createAction('getdistsalesorderdetails_request');
export const getdistsalesorderdetails_result = createAction('getdistsalesorderdetails_result');
export const wait_getdistsalesorderdetails_request = createAction('wait_getdistsalesorderdetails_request');
export const wait_getdistsalesorderdetails_result = createAction('wait_getdistsalesorderdetails_result');


//积分相关接口
export const serverpush_usermoney = createAction('serverpush_usermoney');
export const getusermoney = createAction('getusermoney');//进入个人中心时发送，刷新积分和用户余额，返回即：serverpush_usermoney，因此不需要专门写request,result
export const useraddpoint = createAction('useraddpoint');//签到或分享，返回即：serverpush_usermoney，并新增明细
export const getusergetpointsigntoday_request = createAction('getusergetpointsigntoday_request');//今日是否签到过
export const getusergetpointsigntoday_result = createAction('getusergetpointsigntoday_result');
export const getuserpointdetails_request = createAction('getuserpointdetails_request');
export const getuserpointdetails_result = createAction('getuserpointdetails_result');
export const wait_getuserpointdetails_request = createAction('wait_getuserpointdetails_request');
export const wait_getuserpointdetails_result = createAction('wait_getuserpointdetails_result');
