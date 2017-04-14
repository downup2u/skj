/*
* 订单详情
* */
import React, { Component, PropTypes } from 'react';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import NavBar from '../nav.js';
import '../../../public/css/pay.css';
import { connect } from 'react-redux';
import _ from 'lodash'; 

export class Page extends Component {

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
                 }}
                >

                <div className="PageHead">
                    <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                    <span className="title">提交订单</span>
                </div>

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

                <div className="subBtn">
                    <div className="i">
                        实付金额: <span>¥400.00</span>
                    </div>
                    <div className="b" onClick={()=>{this.onClickPage('/payend')}}>
                        <span>提交订单</span>
                    </div>
                </div>

            </div>
        );
    }
}

let mapStateToProps = ({shop,app}) => {
    return {...shop,...app};
}

Page = connect(mapStateToProps)(Page);
export default Page;