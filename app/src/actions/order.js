/**
 * Created by wangxiaoqing on 2017/4/7.
 */
import { createAction } from 'redux-act';

//设置订单列表页面筛选参数
export const myOrderList_filler_set = createAction('myOrderList_filler_set');
//支付成功更新订单状态
export const serverpush_orderinfo = createAction('serverpush_orderinfo');
//用户操作更新订单状态
export const updata_orderinfo = createAction('updata_orderinfo');