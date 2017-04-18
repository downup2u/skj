/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    getnextusers_result,
    set_nextusersfiller,
    getdistsalesorderstat_result,
    getdistsalesorderdetails_result,
    getdistsalesorders_result,
} from '../actions/index.js';

const initial = {
    nextusers: {
        nextnumber: 0,

        //代理分销列表条件筛选
        nextusersfiller: {
            srctype : "order",
            type : 1,
        },

        //分销订单统计 nextusersorder level1users
        nextusersorder: {
            level1users : {},
            level2users : {}
        },

        nextnumbers : {
            level1_totalorderprices: 0,
            level1_totalfeebonus: 0,
            level2_totalorderprices: 0,
            level2_totalfeebonus: 0,
        },

        //下级用户订单数据
        nextuserorderspage : {
            orderlist : [],
            orderprice : 0,
            feebonus : 0
        }
    },
};

const nextusers = createReducer({
    //获取下级用户订单详情页面数据
    [getdistsalesorderdetails_result]:(state, payload)=>{
        let orderlist = payload.result.docs;
        let orderprice = 0;
        let feebonus = 0;
        _.map(orderlist,(order, index)=>{
            orderprice = orderprice+order.orderprice;
            feebonus = feebonus+order.feebonus;
        })
        let nextuserorderspage = {
            orderlist : orderlist,
            orderprice : orderprice,
            feebonus : feebonus
        }
        return { ...state, nextuserorderspage};
    },
    //获取下级用户列表
    [getdistsalesorders_result]:(state, payload)=>{
        let level1users = {...payload.level1users};
        let level2users = {...payload.level2users};
        let nextusersorder = {level1users, level2users};
        let level1_totalorderprices=0;
        let level1_totalfeebonus=0;
        let level2_totalorderprices=0;
        let level2_totalfeebonus=0;
        _.map(level1users, (nextuser, userid)=>{
            level1_totalorderprices = level1_totalorderprices + nextuser.totalorderprices;
            level1_totalfeebonus = level1_totalfeebonus + nextuser.totalfeebonus;
        })
        _.map(level2users, (nextuser, userid)=>{
            level2_totalorderprices = level2_totalorderprices + nextuser.totalorderprices;
            level2_totalfeebonus = level2_totalfeebonus + nextuser.totalfeebonus;
        })
        let nextnumbers = {
            level1_totalorderprices: level1_totalorderprices,
            level1_totalfeebonus: level1_totalfeebonus,
            level2_totalorderprices: level2_totalorderprices,
            level2_totalfeebonus: level2_totalfeebonus,
        }
        return { ...state, nextusersorder, nextnumbers};
    },
    //获取下级用户数量
    [getnextusers_result]: (state, payload) => {
        let level1 = _.has(payload, 'level1')?payload.level1:0;
        let level2 = _.has(payload, 'level2')?payload.level2:0;
        let number = level1+level2;
        return { ...state, nextnumber: number};
    },
    [set_nextusersfiller]: (state, payload) => {
        let nextusersfiller = { ...state.nextusersfiller, type : payload }
        return { ...state, nextusersfiller};
    },
    //获取订单分销统计
    [getdistsalesorderstat_result]:(state, payload) => {
        console.log(payload);
        return { ...state };
    }


}, initial.nextusers);

export default nextusers;