/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    updata_orderpaydata
} from '../actions';
import {normalizr_orderslist} from './normalizr';
import _ from 'lodash';

const initial = {
    paystatus: {
        couponnumber : 0,
        usecoupon : false,//是否适用优惠券
        usepoint : false,//是否适用积分
        usebalance : false,//是否适用余额
    },
};

const paystatus = createReducer({
    //更新订单状态数据
    [updata_orderpaydata]:(state, payload)=>{
        return  {...state};
    },
}, initial.paystatus);

export default paystatus;