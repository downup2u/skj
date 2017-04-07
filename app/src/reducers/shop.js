/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import { createReducer } from 'redux-act';
import {
    getbanner_result,
    getcategory_result,
    getproduct_result,
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
    	//顶部滚动广告
        banner1: [
        	{url : "img/shopping/banner.png"},
        	{url : "img/shopping/banner.png"},
        	{url : "img/shopping/banner.png"}
        ],
        //产品列表类型分类：每个类型的产品取前两个产品
        prolist: {
            "1" : [
            	{
                    proid : "1",
                    name : "水可净智能水盒子1",
                    avatar : "img/shopping/9.png",
                    imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                    price : "301.00",
                    info : "<div><img src='img/shopping/banner3.png'></div>"
                },
                {
                    proid : "2",
                    name : "水可净智能水盒子2",
                    avatar : "img/shopping/9.png",
                    imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                    price : "302.00",
                    info : "<div><img src='img/shopping/banner3.png'></div>"
                }
            ]
        },
        //所有的产品列表
        prolistall : {
            "1" : {
                proid : "1",
                name : "水可净智能水盒子1",
                avatar : "img/shopping/9.png",
                imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                price : "301.00",
                info : "<div><img src='img/shopping/banner3.png'></div>",
                type : "1",
                comment : [
                    {
                        uid : "01",
                        content : "这里是评论内容，这里是评论内容，这里是评论内容，1111",
                        createtime : "2017-09-09 09:22",
                    },
                    {
                        uid : "02",
                        content : "这里是评论内容，这里是评论内容，这里是评论内容，2222",
                        createtime : "2017-09-10 09:22",
                    }
                ]
            },
            "2" : {
                proid : "2",
                name : "水可净智能水盒子2",
                avatar : "img/shopping/9.png",
                imglist : ['img/shopping/12.png','img/shopping/12.png','img/shopping/12.png'],
                price : "302.00",
                info : "<div><img src='img/shopping/banner3.png'></div>",
                type : "1",
                comment : [
                    {
                        uid : "03",
                        content : "这里是评论内容，这里是评论内容，这里是评论内容，3333",
                        createtime : "2017-09-11 09:22",
                    },
                    {
                        uid : "04",
                        content : "这里是评论内容，这里是评论内容，这里是评论内容，4444",
                        createtime : "2017-09-12 09:22",
                    }
                ]
            }
        },
        //产品类型列表
        protype : {
            "1" : {
                name : "净水系统"
            },
            "2" : {
                name : "卫浴系统"
            },
            "3" : {
                name : "管道系统"
            },
            "4" : {
                name : "品质生活"
            }
        },
        //购物车
        cartlist : [
            {
                proid : "1",
                number : 2
            },
            {
                proid : "2",
                number : 3
            }
        ],
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