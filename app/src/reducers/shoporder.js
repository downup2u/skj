/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    ui_setorderinited,
    myorderaddone_result,
    myorderupdateone_result,
    myorderdelone_result,
    myordergetall_result,
    serverpush_orderinfo,
    updata_orderinfo
} from '../actions';
import {normalizr_orderslist} from './normalizr';

const initial = {
    orders: {
        remoteRowCount:0,
        inited:true,
        list:[],
        orders:{

        },
        //我的优惠券列表
        couponlist:{},
        //优惠券
        couponid:"",
    },
};

const orders = createReducer({
    [updata_orderinfo]:(state, orderinfo)=>{
        let neworder = {};
        neworder[orderinfo._id] = orderinfo;
        let orders = {...state.orders, ...neworder}
        return  {...state, orders};
    },
    [serverpush_orderinfo]:(state, orderinfo)=>{
        let neworder = {};
        neworder[orderinfo._id] = orderinfo;
        orders = {...state.orders, ...neworder}
        return  {...state, orders};
    },
    [ui_setorderinited]:(state, inited) => {
        return  {...state,inited};
    },
    [myordergetall_result]:(state, {result}) => {
        // docs {Array} - Array of documents
        // total {Number} - Total number of documents in collection that match a query
        // limit {Number} - Limit that was used
        //     [page] {Number} - Only if specified or default page/offset values were used
        //     [pages] {Number} - Only if page specified or default page/offset values were used
        //     [offset] {Number} - Only if specified or default page/offset values were used
        let list = result.docs;
        let remoteRowCount = result.total;
        let orders = normalizr_orderslist({list});

        if(state.inited){
            //替换
            return { ...state,
                list:[...orders.result.list],
                orders:{...orders.entities.orders},
                inited:false,
                remoteRowCount};
        }
        //追加记录
        return {
                ...state,
                 list:[...state.list,...orders.result.list],
                 orders:{
                    ...state.orders,
                    ...orders.entities.orders

                }

        };

    },
    [myorderaddone_result]:(state, payload) => {
        let list = [payload._id,...state.list];
        let orders = state.orders;
        orders[payload._id] = payload;
        return {
            ...state,
            list,
            orders
        };
    },
        // [myorderdelone_result]:(state, payload) => {
        //     let orders =  state.orders;
        //     let neworders = [];
        //     for(let item of orders){
        //         if(item._id !== payload._id){
        //             neworders.push(item);
        //         }
        //     }
        //     return { ...state,orders:[...neworders]};
        // },
}, initial.orders);

export default orders;