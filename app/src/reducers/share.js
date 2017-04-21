/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    share_data_updata
} from '../actions/index.js';

const initial = {
	//商城
    share: {
        show : false,
    }
};

const share = createReducer({

    //更新分享控件显示隐藏
    [share_data_updata]:(state, payload)=>{
        return {...state, show: payload};
    },
    
}, initial.share);

export default share;