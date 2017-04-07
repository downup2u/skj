/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    ui_setcartinited,
    mycartaddone_result,
    mycartdelone_result,
    mycartgetall_result
} from '../actions';
import {normalizr_cartslist} from './normalizr';

const initial = {
    carts: {
        remoteRowCount:0,
        inited:true,
        list:[],
        carts:{

        }
    },
};

const carts = createReducer({
        [ui_setcartinited]:(state, inited) => {
            return  {...state,inited};
        },
        [mycartgetall_result]:(state, {result}) => {
            // docs {Array} - Array of documents
            // total {Number} - Total number of documents in collection that match a query
            // limit {Number} - Limit that was used
            //     [page] {Number} - Only if specified or default page/offset values were used
            //     [pages] {Number} - Only if page specified or default page/offset values were used
            //     [offset] {Number} - Only if specified or default page/offset values were used
            let list = result.docs;
            let remoteRowCount = result.total;
            let carts = normalizr_cartslist({list});

            if(state.inited){
                //替换
                return { ...state,
                    list:[...carts.result.list],
                    carts:{...carts.entities.carts},
                    inited:false,
                    remoteRowCount};
            }
            //追加记录
            return {
                    ...state,
                     list:[...state.list,...carts.result.list],
                     carts:{
                        ...state.carts,
                        ...carts.entities.carts

                    }

            };

        },
        [mycartaddone_result]:(state, payload) => {
            let list = [payload._id,...state.list];
            let carts = state.carts;
            carts[payload._id] = payload;
            return {
                ...state,
                list,
                carts
            };
        },
        [mycartdelone_result]:(state, payload) => {
            let carts =  state.carts;
            let newcarts = [];
            for(let item of carts){
                if(item._id !== payload._id){
                    newcarts.push(item);
                }
            }
            return { ...state,carts:[...newcarts]};
        },
}, initial.carts);

export default carts;