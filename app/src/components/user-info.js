import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image } from 'semantic-ui-react'
import NavBar from './nav.js';
import { connect } from 'react-redux';

class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        return (
            <div className="UserInfoPage">
                <NavBar title="账号信息" lefttitle="返回" onClickLeft={this.onClickReturn.bind(this)} />
                <List selection>
                    <List.Item>
                        <div className="tit">
                            <span>头像</span>
                        </div>
                        <div className="rightCont">
                            <Image avatar src={this.props.profile.avatar} />
                        </div>
                    </List.Item>
                    <List.Item onClick={this.onClickPage.bind(this, '/changeusername')}>
                        <div className="tit">
                            <span>昵称</span>
                        </div>
                        <div className="rightCont">
                            <span>{this.props.profile.nickname}</span>
                            <Icon name="angle right"/>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div className="tit">
                            <span>手机号</span>
                        </div>
                        <div className="rightCont">
                            <span>{this.props.username}</span>
                            <Icon name="angle right"/>
                        </div>
                    </List.Item>
                    <List.Item onClick={this.onClickPage.bind(this, '/forgetpwd')}>
                        <div className="tit">
                            <span>修改密码</span>
                        </div>
                        <div className="rightCont">
                            <Icon name="angle right"/>
                        </div>
                    </List.Item>
                </List>
                <div className="escLogin">
                    <Button basic>退出登录</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({userlogin}) =>{
    return userlogin;
};

export default connect(
    mapStateToProps
)(Page);