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
    uiiscollection,
    mycollectionisproductexits_result,
    mycollectiondelone_result,
    mycollectionaddone_result
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

        //判断是否已收藏
        iscollection:{},
    }
};

const shop = createReducer({
    //商品是否已经被收藏
    [mycollectionisproductexits_result]:(state, payload)=>{
        console.log("mycollectionisproductexits_result"+JSON.stringify(payload));
        let iscollection = {...state.iscollection,...payload.result};
        return {...state,iscollection};
    },
    //添加商品收藏
    // payload = {
    //     "newitem": {
    //         "__v": 0,
    //         "product": "58e74f9fc965ed04e8768ae7",
    //         "creator": "58e455e7f6de2471258b292d",
    //         "created_at": "2017-04-12T09:35:09.545Z",
    //         "_id": "58edf4cd65071a04fa554b48"
    //     }
    // }
    [mycollectionaddone_result]:(state, payload)=>{
        let newitem = {};
        newitem[payload.newitem.product] = true;
        let iscollection = {...state.iscollection,...newitem};
        return {...state,iscollection};
    },
    //删除商品
    // payload = {
    //     "newitem": {
    //         "__v": 0,
    //         "product": "58e74f9fc965ed04e8768ae7",
    //         "creator": "58e455e7f6de2471258b292d",
    //         "created_at": "2017-04-12T09:35:09.545Z",
    //         "_id": "58edf4cd65071a04fa554b48"
    //     }
    // }
    [mycollectiondelone_result]:(state, payload)=>{
        console.log("mycollectiondelone_result:::"+JSON.stringify(payload));
        let newitem = {};
        newitem[payload.product] = false;
        let iscollection = {...state.iscollection,...newitem};
        return {...state,iscollection};
    },
    //
    [uiiscollection]:(state, payload)=>{
        let iscollection = {...state.iscollection,payload};
        return {...state,iscollection};
    },
    [search_shoptxt]:(state, searchtxt)=>{
        return {...state, searchtxt};
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