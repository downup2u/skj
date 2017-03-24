/**
 * Created by wangxiaoqing on 2017/3/25.
 */
/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getwifilist_result,
} from '../actions/index.js';

const initial = {
    wifi: {
        wifilist: [],
    },
};


const wifi = createReducer({
    [getwifilist_result]: (state, payload) => {
        let wifilist = [...payload];
        return { ...state, wifilist };
    },
}, initial.wifi);

export default wifi;