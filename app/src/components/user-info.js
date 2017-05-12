import React, { Component } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image } from 'semantic-ui-react'
import NavBar from './nav.js';
import { connect } from 'react-redux';
import {fileupload} from '../util/fileupload.js';
import {fillprofile_request} from '../actions';
import config from '../env/config.js';
import {logout_request} from '../actions';

class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    onClickLogout = ()=>{
        this.props.dispatch(logout_request());
    };

    fileChange=(event)=>{
        fileupload(event,localStorage.getItem('shuikejing_user_token'),(issuc,result)=>{
            if(issuc){
                let profile = {...this.props.profile};
                profile.avatar = config.serverurl + result.url;
                this.props.dispatch(fillprofile_request({profile}));
                //props.avatar.input.onChange(config.serverurl + result.url);
            }
        });
    }
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
                            <input type="file" id="cpic" name="cpic" onChange={this.fileChange }
                                style={
                                {
                                    filter:"alpha(opacity=0)","MozOpacity":"0.0",
                                    "KhtmlOpacity":0.0,opacity:0.0,position:"absolute",
                                    right: 0,top:0,zIndex:"9",
                                    height:"63px",
                                    left:0,width:"100%"
                                }
                            }
                            />
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
                    <Button basic onClick={this.onClickLogout}>退出登录</Button>
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