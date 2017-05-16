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
    mycollectionaddone_result,
    setulcoupontype,
    set_productlist,
    set_orderSurePage,
    myorderlist_addreducers,
    paytype_set,
    myOrderList_filler_set,
    logout_result
} from '../actions/index.js';
import {
    normalizrbanners,
    normalizrcategories,
    normalizrproducts,
}from './normalizr.js';

import _ from 'lodash';

const initial = {
	//订单
    order: {

        //生成订单确认页
        // orderProductsdetail = [{
        //     productid:String,
        //     number:Number,
        //     price:Number
        // }]

        orderAddressId : '',//地址id
        orderProductsdetail:[],//产品列表
        orderExpress:"",//运费
        orderPrice:"",//订单价格
        orderProductPrice: 0,//产品总价格
        orderAddressInfo : {},

        //我的订单列表
        myOrderList : {},//我的临时订单列表,不是我的所有订单
        myOrderListFiller : "全部", //订单过滤条件

        //选择支付方式
        paytype:'alipay',

        // creator:{ type: Schema.Types.ObjectId, ref: 'User' },
        // paytype:String,
        // realprice:Number,//实付价
        // orderprice:Number,//订单价=应付价
        // orderstatus:String,
        // paystatus:{ type: String, default:'未支付'},
        // provincename:String,
        // cityname:String,
        // distinctname:String,
        // address:String,
        // isdeleted:{ type:Boolean, default: false },
        // productsdetail:[
        //     {
        //         productid:String,
        //         number:Number,
        //         price:Number
        //     }
        // ],
        // couponprice:Number,//抵扣价
        // couponid:{ type: Schema.Types.ObjectId, ref: 'Coupon' },
        // productprice:Number,//产品总价
        // expressid:{ type: Schema.Types.ObjectId, ref: 'Express' },
        // expressbarid:String,
        // created_at: Date,
        // pay_at:Date,
        
    }
};

const order = createReducer({
    [logout_result]:(state, payload)=>{
        return { ...initial.order};
    },
    //设置支付方式
    [paytype_set]:(state, payload)=>{
        return {...state, paytype: payload};
    },
    //设置我的订单列表
    [myorderlist_addreducers]:(state, payload)=>{
        let myOrderList = {...state.myOrderList, ...payload};
        return {...state, myOrderList};
    },
    //生成订单确认页
    [set_orderSurePage]:(state, payload)=>{
        return {...state, ...payload}
    },
    //设置订单列表页面筛选条件
    [myOrderList_filler_set]:(state, payload)=>{
        return {...state, myOrderListFiller:payload}
    },
}, initial.order);

export default order;

