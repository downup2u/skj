/*
* 订单详情
* */
import React, { Component, PropTypes } from 'react';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import NavBar from './nav.js';
import '../../public/css/logisticsinfo.css';

export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        return (
            <div className="logisticsinfoPage"
                 style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll"
                 }}
                >
                <NavBar lefttitle="返回" title="查看物流" onClickLeft={this.onClickReturn}/>

                <div className="proinfo">

                    <div className="li">
                        <img src="img/myprofile/16.png"/>

                        <div>
                            <span>物流编号: 234801791257</span>
                            <span>商品名称: 这是产品标题内容这是</span>
                        </div>
                    </div>

                </div>

                <div className="list">
                    <div className="tit">
                        <span>物流详情</span>
                    </div>
                    <div className="li nowli">
                        <span>南京[BEX南京建邺区一部]，已送达 已签收！</span>
                        <span>2016-11-09 16:00</span>
                    </div>
                    <div className="li">
                        <span>南京[BEX南京建邺区一部]，已送达 已签收！</span>
                        <span>2016-11-09 16:00</span>
                    </div>
                    <div className="li">
                        <span>南京市[南京运转中心]</span>
                        <span>2016-11-09 16:00</span>
                    </div>
                    <div className="li">
                        <span>你的订单开始处理</span>
                        <span>2017－01-11 14:00</span>
                    </div>
                    <div className="li">
                        <span>订单支付成功，等待商家处理</span>
                        <span>2017－01-11 14:00</span>
                    </div>
                </div>

            </div>
        );
    }
}