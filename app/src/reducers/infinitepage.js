/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createReducer } from 'redux-act';
import {
    uiinfinitepage_init,
    uiinfinitepage_setstate,
    uiinfinitepage_getdata,
    uiinfinitepage_deleteitem,
    uiinfinitepage_updateitem
} from '../actions';
import {normalizr_notifymessageslist} from './normalizr';
import union from 'lodash/union';
import _ from 'lodash';

const initial = {
    infinitepage: {
         items: [],
         pullDownStatus: 3,
         pullUpStatus: 0,
         pageEnd : false,//判断是否加载到最后一页
         page:1,
         totalPage:1,
         itemsChanged:false,
         isTouching:false
    },
};

const infinitepage = createReducer({
        [uiinfinitepage_updateitem]:(state, payload) => {
            let newitems = [];
            _.map(state.items,(item)=>{
                if(item.id === payload.id){
                    newitems.push(payload);
                }
                else{
                    newitems.push(item);
                }
            });
            return  {...state,items:[...newitems]};
        },
        [uiinfinitepage_deleteitem]:(state, payload) => {
            let newitems = [];
            _.map(state.items,(item)=>{
                if(item.id === payload.id){
                }
                else{
                    newitems.push(item);
                }
            });
            return  {...state,items:[...newitems]};
        },
        [uiinfinitepage_init]:(state, payload) => {
            return  {...state,...initial.infinitepage};
        },
        [uiinfinitepage_setstate]:(state, payload) => {
            return  {...state,...payload};
        },
        [uiinfinitepage_getdata]:(state, {result,append}) => {
            // docs {Array} - Array of documents
            // total {Number} - Total number of documents in collection that match a query
            // limit {Number} - Limit that was used
            //     [page] {Number} - Only if specified or default page/offset values were used
            //     [pages] {Number} - Only if page specified or default page/offset values were used
            //     [offset] {Number} - Only if specified or default page/offset values were used
            let items = append?union(state.items, result.docs) : result.docs;//result.docs;
            let page = result.page;
            let totalPage = result.pages;
            let pageEnd = result.page === result.pages;
            return {...state,page,items,pageEnd,totalPage};
        },

}, initial.infinitepage);

export default infinitepage;