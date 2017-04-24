/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    updata_logisticsinfo_logisticsinfo,
    expressquery_result
} from '../actions';
import _ from 'lodash';

const initial = {
    logisticsinfo: {
    	order : {},
    	info : {}
    },
};

const logisticsinfo = createReducer({
    //更新数据
    [updata_logisticsinfo_logisticsinfo]:(state, payload)=>{
    	let logisticsinfo = { ...state.logisticsinfo, ...payload }
        return  {...state, ...logisticsinfo};
    },
    [expressquery_result]:(state, payload)=>{
    	let info = JSON.parse(payload);
    	let logisticsinfo = { ...state.logisticsinfo, info }
        return  {...state, ...logisticsinfo};
    }
}, initial.logisticsinfo);

export default logisticsinfo;