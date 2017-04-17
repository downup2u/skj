/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    getnextusers_result,
    set_nextusersfiller,
    getdistsalesorderstat_result
} from '../actions/index.js';

const initial = {
    nextusers: {
        nextnumber: 0,

        //代理分销列表条件筛选
        nextusersfiller: {
            srctype : "order",
            type : 1,
        },

        //分销订单统计
        nextusersorder: {
            all : { number : 0, monery : 0 },
            level1 : { number : 0, monery : 0 },
            level2 : { number : 0, monery : 0 }
        },

        //level2 : {},//我的二级代理
    },
};

const nextusers = createReducer({
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