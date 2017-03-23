import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/distribution.css';


export default class Page extends Component {
    state = {activeItem: '一级代理'};

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn =()=>{
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        const { activeItem } = this.state;
        return (
            <div className="distributionPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll"
             }}>
                <NavBar lefttitle="返回" title="我的分销" onClickLeft={this.onClickReturn} />
                <div className="headCont">
                    <div className="userInfo">
                        <img src="img/myprofile/1.png" className="avatar"/>
                        <span className="username">爱喝水的孩子</span>
                        <span className="usertype">代理人数(56人)</span>
                    </div>
                </div>

                <Menu pointing secondary>
                    <Menu.Item name='一级代理' active={activeItem === '一级代理'} onClick={this.handleItemClick}/>
                    <Menu.Item name='二级代理' active={activeItem === '二级代理'} onClick={this.handleItemClick}/>
                </Menu>

                <div className="cont">
                    <div className="li">
                        <span className="num">1</span>
                        <img src="img/myprofile/1.png" className="avatar"/>
                        <div>
                            <span>姓名: 王小胖</span>
                            <span>消费金额: <i>¥499.00</i></span>
                        </div>
                        <span>奖励金额: <i>¥499.00</i></span>
                    </div>
                </div>

                <div className="bottomBttn"><span>订单统计</span></div>
            </div>
        );
    }
}