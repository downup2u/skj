import React, { Component } from 'react';
import '../../../public/css/bigimg.css';
import _ from 'lodash'; 
import { connect } from 'react-redux';
import '../../../public/css/addcartdilog.css';
import { 
    uiaddcartdilog,
    mycartaddone_request,
    set_weui,
    set_orderSurePage
} from '../../actions/index.js';
import { mycartaddone } from '../../actions/sagacallback.js';
import { withRouter } from 'react-router-dom';

let Page = ({proid, show, number, dispatch, products, loginsuccess, history, type, expressfeeforfree, expressfee})=>{

    //判断是否登录
    if(!loginsuccess&&show){
        history.push("/login");
    }

    let hidedilog = ()=>{
        dispatch(uiaddcartdilog({
            addcartdilogshow : false,
            addcartdilogproid : '',
            addcartdilogpronumber : 1,
        }));
    }
    //取消冒泡事件
    let stopDefault =(e)=>{
        e.stopPropagation();
    }

    //添加数量
    let addnumver =()=>{
        dispatch(uiaddcartdilog({
            addcartdilogpronumber : ++number
        }));
    }
    //减少数量
    let delnumber =()=>{
        if(number>1){
            dispatch(uiaddcartdilog({
                addcartdilogpronumber : --number
            }));
        }
    }
    //加入购物车
    let addcart =()=>{
        dispatch(mycartaddone({
            product: proid,
            number: number
        })).then((result)=>{
            hidedilog();
            dispatch((set_weui({
                toast:{
                    show: true,
                    text: '成功加入购物车',
                    type: 'success'
                }
            })))
        });
    }
    //直接购买
    let toshopping = ()=>{
        let proinfo = products[proid];
        if(typeof proinfo.pricenow === 'string'){
            proinfo.pricenow = parseFloat(proinfo.pricenow.toFixed(2));
        }
        let prolist = [{
            productid: proinfo._id,
            number:number,
            price:proinfo.pricenow,
            productinfo: proinfo
        }];
        let express = proinfo.pricenow>=expressfeeforfree?0:expressfee;
        let productprice = parseFloat((proinfo.pricenow*number).toFixed(2));
        let orderprice = productprice + express;
        let payload = {
            orderAddressId:'',//地址id
            orderProductsdetail:prolist,//产品列表
            orderExpress:express,//运费
            orderPrice:orderprice,//订单价格
            orderProductPrice : productprice, //产品总价格
        }
        dispatch(set_orderSurePage(payload));
        history.push("/pay");
    }


    let showstyle = show?"addcartdilog":"addcartdilog hide";
    let translatestyle = show?"weui-actionsheet weui-actionsheet_toggle":"weui-actionsheet";
    let proinfo = {};
    if(show){
        proinfo = products[proid];
    }

    return (
        <div className={showstyle}
             onClick={()=>{hidedilog()}}
             >
            <div 
                className={translatestyle} 
                id="iosActionsheet"
                onClick={(e)=>{stopDefault(e)}}
                >
                <div className="addcartdilogProinfo">
                    <img src={proinfo.picurl} />
                    <div>
                        <span>{proinfo.name}</span>
                        <span>¥ {proinfo.pricenow}</span>
                    </div>
                </div>
                <div className="setnumber">
                    <span>数量</span>
                    <div>
                        <span className="add" onClick={()=>{delnumber()}}>-</span>
                        <span className="input">{number}</span>
                        <span className="del" onClick={()=>{addnumver()}}>＋</span>
                    </div>
                </div>
                {type=="cart"?(<div className="addcartbtn" onClick={()=>{addcart()}}>加入购物车</div>):""}
                {type=="shop"?(<div className="addshopbtn" onClick={()=>{toshopping()}}>立刻购买</div>):""}
            </div>
        </div>
    )
};

const mapStateToProps =  ({userlogin, shop, app:{expressfeeforfree,expressfee} }) =>{
  return {...userlogin, ...shop, expressfeeforfree, expressfee};
};
Page = connect(mapStateToProps)(Page);
Page = withRouter(Page);
export default Page;