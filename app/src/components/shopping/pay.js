/*
* 订单详情
* */
import React, { Component } from 'react';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import NavBar from '../nav.js';
import '../../../public/css/pay.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    myorderaddone
} from '../../actions/sagacallback.js';
import {
    myorderlist_addreducers,
    set_orderSurePage,
    set_weui
} from '../../actions';


export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    //提交订单,生成一条新的订单
    createNewOrder = ()=>{
        if(!this.props.orderAddressInfo.hasOwnProperty("_id")){
            this.props.dispatch(set_weui({toast:{
                show : true,
                text : `请选择收货地址`,
                type : "error"
            }}));
            return;
        }
        let productsdetail = this.props.orderProductsdetail;
        let ordertitle = '';
        let body = '';
        _.map(productsdetail, (product, index)=>{
            let p1 = ordertitle==''?'':',';
            let p2 = body==''?'':',';
            ordertitle +=  p1 + product.productinfo.name;
            body +=  p2 + product.productinfo.brief;
        });
        let payload = {
            productsdetail,
            paytype: 'alipay',//支付方式
            ordertitle: ordertitle,
            body: body,
            realprice: parseFloat(this.props.orderPrice),//实付价
            orderprice: parseFloat(this.props.orderPrice),//订单价=应付价
            orderstatus: '未支付',
            paystatus: '未支付',
            isdeleted : false,
            orderaddress: this.props.orderAddressInfo,
            couponprice: 0,//抵扣价
            couponid:"",
            pointprice: 0,
            point: 0,
            expressprice: parseFloat(this.props.orderExpress),//运费
            //productprice: parseFloat(this.props.orderProductPrice),//产品总价
            expressid: '',//快递信息
            expressbarid: '',//快递运单号
        };
        this.props.dispatch(myorderaddone(payload)).then((result)=>{
            let payload = {};
            payload[result.newitem._id] = result.newitem;
            payload.balanceprice = 0;//余额抵扣金额
            //this.props.dispatch(myorderlist_addreducers(payload));
            this.props.history.push(`/payend/${result.newitem._id}/shopping`);
        });
    };

    render() {
        const {products, orderPrice, orderProductsdetail, orderExpress, orderAddressInfo, defaultaddress} = this.props;
        return (
            <div className="PayPage"
                style={{
                    height:(window.innerHeight)+"px",
                }}
                >
                <div className="PageHead">
                    <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                    <span className="title">提交订单</span>
                </div>
                <div className="PayPageBody">
                    <div className="orderaddress" onClick={()=>{this.onClickPage('/seladdress')}}>
                        <img src="img/shopping/mark.png" />
                        <div className="addressinfo">
                            {orderAddressInfo.hasOwnProperty("_id")?(
                                <div>
                                    <div className="userinfo">
                                        <span>收货人:{orderAddressInfo.truename}</span>
                                        <span>{orderAddressInfo.phonenumber}</span>
                                    </div>
                                    <div>
                                        收货地址:
                                        {orderAddressInfo.seladdr.selprovice.value}
                                        {orderAddressInfo.seladdr.selcity.value}
                                        {orderAddressInfo.seladdr.seldistict.value}
                                        {orderAddressInfo.addressname}
                                    </div>
                                </div>
                            ):(
                                <div className="goToseladdress">请选择收获地址</div>
                            )}

                        </div>
                    </div>
                    <div className="proinfo">
                        {_.map(orderProductsdetail, (prodetail,index)=>{
                            let proinfo = products[prodetail.productid];
                            return (
                                <div className="li" key={index}>
                                    <img src={proinfo.picurl} />
                                    <div>
                                        <span>{proinfo.name}</span>
                                        <span className="price">
                                            <span>¥{prodetail.price}</span>
                                            <span>X{prodetail.number}</span>
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="list">
                        <div className="li">
                            <span>运费</span>
                            <span>¥{this.props.orderExpress}</span>
                        </div>
                    </div>
                </div>

                <div className="subBtn">
                    <div className="i">
                        实付金额: <span>¥{this.props.orderPrice}</span>
                    </div>
                    <div className="b" onClick={()=>{this.createNewOrder()}}>
                        <span>提交订单</span>
                    </div>
                </div>

            </div>
        );
    }
}

let mapStateToProps = ({shop, order, shoporder, userlogin, address}) => {
    let products = shop.products;
    let orderPrice = order.orderPrice;
    let orderProductsdetail = order.orderProductsdetail;
    let orderExpress = order.orderExpress;
    //获取当前订单地址
    let orderAddressInfo = order.orderAddressInfo;
    if(_.isEmpty(orderAddressInfo)){
        orderAddressInfo = userlogin.defaultaddress;
    }
    return {products, orderPrice, orderProductsdetail, orderExpress, orderAddressInfo};
}
Page = connect(mapStateToProps)(Page);
export default Page;
