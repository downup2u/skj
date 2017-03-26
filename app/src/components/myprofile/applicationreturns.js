/*
* 退货申请
* */
import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu,Select,TextArea } from 'semantic-ui-react';
import PicturesWall  from '../controls/pictureswall.js';
import '../../../public/css/applicationreturns.css';

export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        let  countryOptions = [{ key: 'af', value: 'af', text: 'Afghanistan' }]
        return (
            <div className="applicationreturnsPage"
                 style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll"
                 }}
                >
                <NavBar lefttitle="返回" title="申请退货" onClickLeft={this.onClickReturn}/>

                <div className="proinfo">

                    <div className="li">
                        <img src="./img/myprofile/16.png" />
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
                        <span>退货原因</span>
                        <span className="rightinput">
                            <Select placeholder='Select your country' options={countryOptions} />
                        </span>
                    </div>
                    <div className="li">
                        <span>退款金额<span className="maxPrice">*最多<span>¥499.00</span></span></span>
                        <span className="rightinput">
                            <Input placeholder="请输入退款金额" />
                        </span>
                    </div>
                    <div className="li explain">
                        <span>退款说明</span>
                        <TextArea placeholder='请输入退款说明' />
                    </div>
                    <div className="li">
                        <PicturesWall />
                    </div>
                </div>

                <div className="subBtn">
                    <Button primary>完成</Button>
                </div>

            </div>
        );
    }
}