/**
 * Created by wangxiaoqing on 2017/3/25.
 */

import { createReducer } from 'redux-act';
import {
    uiinfinitepage_init,
    uiinfinitepage_getdata,
} from '../actions';
import {normalizr_notifymessageslist} from './normalizr';
import union from 'lodash/union';

const initial = {
    infinitepage: {
        list: [],
        currentPage: 1,
        totalPage:1,
        lastPage: false
    },
};

const infinitepage = createReducer({
        [uiinfinitepage_init]:(state, rendered) => {
            return  {...state,...initial.infinitepage};
        },
        [uiinfinitepage_getdata]:(state, {result,append}) => {
            // docs {Array} - Array of documents
            // total {Number} - Total number of documents in collection that match a query
            // limit {Number} - Limit that was used
            //     [page] {Number} - Only if specified or default page/offset values were used
            //     [pages] {Number} - Only if page specified or default page/offset values were used
            //     [offset] {Number} - Only if specified or default page/offset values were used
            let list = append?union(state.list, result.docs) : result.docs;//result.docs;
            let currentPage = result.page;
            let totalPage = result.pages;
            let lastPage = result.page === result.pages;
            return {...state,currentPage,list,lastPage,totalPage};
        },

}, initial.infinitepage);

export default infinitepage;