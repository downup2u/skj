import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu, List, Label,Select } from 'semantic-ui-react';
import '../../../public/css/tixian.css';


export default class Page extends Component {
    state = {activeItem: '全部'};

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn =()=>{
        this.props.history.goBack();
    }

    render() {
        const { activeItem } = this.state;
        const countryOptions = [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }]
        return (
            <div className="messageCode"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll",
                backgroundColor:"#F5F5F5"
             }}>
                <NavBar lefttitle="返回" title="短信验证" onClickLeft={this.onClickReturn} />
                <div className="messageCodeContent">
                    <span className="tit">请输入<span className="phone">139＊＊＊＊1536</span>收到的短信验证码</span>
                    <div className="messageCodeInput">
                        <span className="txt">验证码</span>
                        <Input placeholder='请输入验证码' />
                        <span className="getcode">获取验证码</span>
                    </div>

                </div>
                <div className="buttoncon">
                    <Button primary>完成</Button>
                </div>
            </div>
        );
    }
}