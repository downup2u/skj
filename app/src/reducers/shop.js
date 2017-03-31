/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';


const initial = {
	//
    shop: {
        s: "aaaa"
    }
};

const shop = createReducer({

}, initial.shop);

export default shop;