/**
 * 提现功能
 */
import { createReducer } from 'redux-act';
import _ from 'lodash';
import {
    getuserpointdetails_result,
    integral_set_listtype
} from '../actions/index.js';

const initial = {
    integral: {
        //设置提现首页菜单列表
        type : 0,

        //获取收益列表
        list : [],

    },
};

const integral = createReducer({
    //设置提现首页菜单列表
    [integral_set_listtype]:(state, payload)=>{
        return {...state, type: payload}
    },
    //获取收益列表
    [getuserpointdetails_result]:(state, payload)=>{
        let list = payload.result.docs
        return {...state, list}
    },

}, initial.integral);

export default integral;