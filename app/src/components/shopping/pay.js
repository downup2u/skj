/*
* 订单详情
* */
import React, { Component, PropTypes } from 'react';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import NavBar from '../nav.js';
import '../../../public/css/pay.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    myorderaddone,
} from '../../actions/sagacallback.js';
import {
    myorderlist_addreducers
} from '../../actions';

export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    // orderAddressId : '',//地址id
    // orderProductsdetail:[],//产品列表
    // orderExpress:"",//运费
    // orderPrice:"",//订单价格

    //提交订单,生成一条新的订单
    createNewOrder = ()=>{
        let productsdetail = this.props.orderProductsdetail;
        let payload = {
            productsdetail,
            payway: 'alipay',//支付方式
            realprice: this.props.orderPrice,//实付价
            orderprice: this.props.orderPrice,//订单价=应付价
            orderstatus: '未支付',
            provincename: '江苏省',
            cityname: '常州市',
            distinctname: '武进区',
            address: '天润大厦',
            couponprice: 0,//抵扣价
            orderexpress: this.props.orderExpress,//运费
            productprice: this.props.orderProductPrice,//产品总价
        };
        this.props.dispatch(myorderaddone(payload)).then((result)=>{
            let payload = {};
            payload[result.newitem._id] = result.newitem;
            this.props.dispatch(myorderlist_addreducers(payload));
            this.props.history.push(`/payend/${result.newitem._id}`);
        });
    };

    render() {
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
                <div className="orderaddress" onClick={()=>{this.onClickPage('/addresslist')}}>
                    <img src="img/shopping/mark.png" />
                    <div className="addressinfo">
                        <div className="userinfo">
                            <span>收货人:小胖</span>
                            <span>18088888888</span>
                        </div>
                        <div>
                            收货地址: 江苏省 南京市 建邺区 沙洲街道9号
                        </div>
                    </div>
                </div>
                <div className="proinfo">
                    {_.map(this.props.orderProductsdetail, (prodetail,index)=>{
                        console.log(this.props);
                        let proinfo = this.props.products[prodetail.productid];
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

let mapStateToProps = ({shop,order}) => {
    return {...shop,...order};
}

Page = connect(mapStateToProps)(Page);
export default Page;
