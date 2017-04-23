import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import Config from '../env/config';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import "../../public/css/setting.css";
import { logout_request } from '../actions';

let Page =(props)=> {

    let onClickPage = (name)=> {
        props.history.push(name);
    };

    let onClickReturn = ()=> {
        props.history.goBack();
    };

    let onClickLogout = ()=>{
        props.dispatch(logout_request());
    };

    return (
        <div className="settingPage">
            <div className="ProinfoPageHead">
                <Icon name="angle left" onClick={()=>{onClickReturn()}} />
                <span className="title">设置</span>
            </div>
            <div className="list">
                <div className="li" onClick={()=>{onClickPage("/aboutus/helpcenter")}}>
                    <span>帮助中心</span>
                    <img src="img/myprofile/15.png" />
                </div>
                <div className="li" onClick={()=>{onClickPage("/aboutus/aboutus")}}>
                    <span>关于我们</span>
                    <img src="img/myprofile/15.png" />
                </div>
                <div className="li" onClick={()=>{onClickPage("/aboutus/servicerule")}}>
                    <span>服务协议</span>
                    <img src="img/myprofile/15.png" />
                </div>
            </div>
            <div className="list">
                <div className="li">
                    <span>当前版本</span>
                    <span>{Config.appversion}</span>
                </div>
            </div>
            {props.loginsuccess?(
                <div className="loginOut" onClick={()=>{onClickLogout()}}>退出登录</div>
            ):''}
        </div>
    );
}

const mapStateToProps =  ({userlogin}) =>{
    return {...userlogin};
};
export default connect(
    mapStateToProps
)(Page);

