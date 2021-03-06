/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getcurwifi_result,
    getcurwifi_devicelist_result,
    getcurwifi_devicelist_request,
} from '../actions/index.js';

const initial = {
    wifi: {
        ssid:'正在获取当前wifi的ssid....',
        code: '0',
        devicelist:[],
        wifipwd:{}
    },
};


const wifi = createReducer({
    [getcurwifi_devicelist_request]:(state, payload)=>{
        let wifipwd = {...state.wifipwd};
        wifipwd[payload.ssid] = payload.password;
        return { ...state,wifipwd};
    },
    [getcurwifi_result]: (state, payload) => {
        const {code,message} = payload;
        return { ...state,code,ssid:message};
    },
    [getcurwifi_devicelist_result]: (state, payload) => {
        let devicelist = [...payload];
        return { ...state, devicelist };
    },
}, initial.wifi);

export default wifi;
