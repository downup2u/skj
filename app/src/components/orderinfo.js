/*
* 订单详情
* */
import React, { Component } from 'react';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import NavBar from './nav.js';
import '../../public/css/orderinfo.css';

export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        return (
            <div className="orderinfoPage"
                 style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll"
                 }}
                >
                <NavBar lefttitle="返回" title="订单详情" onClickLeft={this.onClickReturn}/>

                <div className="orderaddress">
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

                    <div className="li">
                        <img src="img/myprofile/16.png"/>

                        <div>
                            <span>这是产品标题内容这是产品标题内容这是产品标题内容这是产品标题内容</span>
                            <span className="price">
                                <span>¥499.00</span>
                                <span>X1</span>
                            </span>
                        </div>
                    </div>

                </div>

                <div className="list">
                    <div className="li">
                        <span>订单编号</span>
                        <span>01223442</span>
                    </div>
                    <div className="li">
                        <span>下单时间</span>
                        <span>2017－01-11 14:00</span>
                    </div>
                    <div className="li">
                        <span>优惠抵扣券</span>
                        <span>－¥400.00</span>
                    </div>
                    <div className="li">
                        <span>运费</span>
                        <span>¥400.00</span>
                    </div>
                    <div className="li">
                        <span>积分扣券</span>
                        <span>－¥400.00</span>
                    </div>
                    <div className="li">
                        <span>支付总金额</span>
                        <span className="price">¥400.00</span>
                    </div>
                </div>

                <div className="subBtn">
                    <Button>取消订单</Button>
                    <Button className="pay">立刻支付</Button>
                </div>

            </div>
        );
    }
}