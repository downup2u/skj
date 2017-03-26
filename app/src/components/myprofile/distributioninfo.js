import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/distribution.css';


export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        return (
            <div className="distributionInfoPage"
                 style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll"
                 }}
                >
                <NavBar lefttitle="返回" title="分销单详情" onClickLeft={this.onClickReturn}/>

                <div className="proinfo">

                    <div className="li">
                        <img src="./img/myprofile/16.png"/>

                        <div>
                            <span>这是产品标题内容这是产品标题内容这是产品标题内容这是产品标题内容</span>
                            <span className="price">
                                <span>¥499.00</span>
                                <span>X1</span>
                            </span>
                        </div>
                    </div>

                    <div className="li">
                        <img src="./img/myprofile/16.png"/>

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
                        <span>消费金额</span>
                        <span className="price">400.00</span>
                    </div>
                    <div className="li">
                        <span>下单时间</span>
                        <span>2017－01-11 14:00</span>
                    </div>
                    <div className="li">
                        <span>消费金额</span>
                        <span className="price">400.00</span>
                    </div>
                    <div className="li">
                        <span>下单时间</span>
                        <span>2017－01-11 14:00</span>
                    </div>
                </div>

            </div>
        );
    }
}