/**
 * Created by wangxiaoqing on 2017/4/7.
 */

import { createReducer } from 'redux-act';
import {
    ui_setcollectioninited,
    mycollectionaddone_result,
    mycollectiondelone_result,
    mycollectiongetall_result
} from '../actions';
import {normalizr_collectionslist} from './normalizr';

const initial = {
    collections: {
        remoteRowCount:0,
        inited:true,
        list:[],
        collections:{

        }
    },
};

const collections = createReducer({
        [ui_setcollectioninited]:(state, inited) => {
            return  {...state,inited};
        },
        [mycollectiongetall_result]:(state, {result}) => {
            // docs {Array} - Array of documents
            // total {Number} - Total number of documents in collection that match a query
            // limit {Number} - Limit that was used
            //     [page] {Number} - Only if specified or default page/offset values were used
            //     [pages] {Number} - Only if page specified or default page/offset values were used
            //     [offset] {Number} - Only if specified or default page/offset values were used
            let list = result.docs;
            let remoteRowCount = result.total;
            let collections = normalizr_collectionslist({list});

            if(state.inited){
                //替换
                return { ...state,
                    list:[...collections.result.list],
                    collections:{...collections.entities.collections},
                    inited:false,
                    remoteRowCount};
            }
            //追加记录
            return {
                    ...state,
                     list:[...state.list,...collections.result.list],
                     collections:{
                        ...state.collections,
                        ...collections.entities.collections

                    }

            };

        },
        [mycollectionaddone_result]:(state, payload) => {
            let list = [payload._id,...state.list];
            let collections = state.collections;
            collections[payload._id] = payload;
            return {
                ...state,
                list,
                collections
            };
        },
        [mycollectiondelone_result]:(state, payload) => {
            let collections =  state.collections;
            let newcollections = [];
            for(let item of collections){
                if(item._id !== payload._id){
                    newcollections.push(item);
                }
            }
            return { ...state,collections:[...newcollections]};
        },
}, initial.collections);

export default collections;