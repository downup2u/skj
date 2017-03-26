/*
 * 订单评价
 * */
import React, { Component, PropTypes } from 'react';
import { Input, Button, Menu,Select,TextArea } from 'semantic-ui-react';
import NavBar from './nav.js';
import '../../public/css/orderevaluation.css';

export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        let countryOptions = [{key: 'af', value: 'af', text: 'Afghanistan'}]
        return (
            <div className="orderevaluationPage"
                 style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll"
                 }}
                >
                <NavBar lefttitle="返回" title="商品评价" onClickLeft={this.onClickReturn}/>

                <div className="proinfo">

                    <div className="li">
                        <img src="img/myprofile/16.png"/>

                        <div>
                            <span>这是产品标题内容这是产品标题内容这是产品标题内容这是产品标题内容</span>
                            <span className="price">
                                <span>订单编号:<span>092374924792</span></span>
                            </span>
                        </div>
                    </div>

                </div>

                <div className="list">
                    <div className="li explain">
                        <TextArea placeholder='喜欢宝贝吗？卖家服务怎么样，产品效果怎么怎么样？'/>
                    </div>
                </div>

                <div className="subBtn">
                    <Button primary>完成</Button>
                </div>

            </div>
        );
    }
}