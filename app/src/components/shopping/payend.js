/*
 * 订单详情
 * */
import React, { Component, PropTypes } from 'react';
import { Input, Button, Menu, Icon, Checkbox} from 'semantic-ui-react';
import NavBar from '../nav.js';
import '../../../public/css/pay.css';

export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        return (
            <div className="PayPage"
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
                        <span>运费</span>
                        <span>¥10.00</span>
                    </div>
                    <div className="li">
                        <span>使用积分</span>
                        <span>- ¥20.00</span>
                    </div>
                    <div className="li">
                        <span>使用优惠券</span>
                        <span>- ¥4.00</span>
                    </div>
                </div>

                <div className="paytype">
                    <div className="li">
                        <img src="img/shopping/15.png" />
                        <div className="txt">
                            <span>微信</span>
                            <span>推荐微信用户使用</span>
                        </div>
                        <Checkbox />
                    </div>
                    <div className="li">
                        <img src="img/shopping/15.png" />
                        <div className="txt">
                            <span>支付宝</span>
                            <span>推荐支付宝用户使用</span>
                        </div>
                        <Checkbox />
                    </div>
                </div>


                <div className="subBtn">
                    <div className="i">
                        实付金额: <span>¥400.00</span>
                    </div>
                    <div className="b">
                        <span>提交订单</span>
                    </div>

                </div>

            </div>
        );
    }
}