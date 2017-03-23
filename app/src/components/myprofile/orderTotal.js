import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/ordertotal.css';


export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="orderTotalPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll",
                backgroundColor:"#EEE"
             }}>
                <NavBar lefttitle="返回" title="订单统计" onClickLeft={this.onClickReturn}/>
                <div className="orderTotalPageContent">
                    <div className="item">
                        <span className="tit">我的订单</span>
                        <div className="cont">
                            <span className="li"><span>订单数量</span><span>122</span></span>
                            <span className="li"><span>累计收益</span><span>¥ 47394.0元</span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}