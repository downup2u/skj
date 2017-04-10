/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getbanner_result,
    getcategory_result,
    getproduct_result,
    getnews_result,
    search_shoptxt,
} from '../actions/index.js';
import {
    normalizrbanners,
    normalizrcategories,
    normalizrproducts,
}from './normalizr.js';

import _ from 'lodash';

const initial = {
	//商城
    shop: {
        news:[],
        searchtxt:'',
        //以下数据从后台取
        shopbanners:[],//商城首页广告
        shopcategorylist1:[],//商城首页横排分类
        shopcategorylist2:[],//商城首页竖排分类
        banners:{},//所有广告集合
        categories:{},//所有分类即集合
        products:{},//所有产品集合
    }
};

const shop = createReducer({
    [search_shoptxt]:(state, searchtxt)=>{
        return {...state,searchtxt};
    },
    [getnews_result]:(state, payload)=>{
        let news = payload.list;
        return {...state,news};
    },
    [getbanner_result]:(state, payload)=>{
        let bannerslist = normalizrbanners(payload);
        let shopbanners = [];
        let sortedlist = _.orderBy(payload.list, ['sortflag'], ['asc']);
        _.map(sortedlist,(banner)=>{
            if(banner.type === "商城首页广告"){
                shopbanners.push(banner._id);
            }
        });
        return { ...state,shopbanners,banners:{...bannerslist.entities.banners}};
    },    
    [getcategory_result]:(state, payload)=>{
        let categorylist = normalizrcategories(payload);
        let shopcategorylist1 = [];//商城首页横排分类
        let shopcategorylist2 = [];//商城首页竖排分类
        let sortedlist = _.orderBy(payload.list, ['sortflag'], ['asc']);
        _.map(sortedlist,(category)=>{
            if((category.showflag & 1) > 0){
                shopcategorylist1.push(category._id);
            }
            if((category.showflag & 2) > 0){
                shopcategorylist2.push(category._id);
            }
        });
        return { ...state,shopcategorylist1,shopcategorylist2,categories:{...categorylist.entities.categories}};
    },    
    [getproduct_result]:(state, payload)=>{
        let productslist = normalizrproducts(payload);
        return { ...state,products:{...productslist.entities.products}};
    },
}, initial.shop);

export default shop;