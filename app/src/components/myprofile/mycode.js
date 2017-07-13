/*
    我的邀请码
*/
import React, { Component } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import '../../../public/css/mycode.css';
import '../../../public/css/head.css';
import { connect } from 'react-redux';
import {
    share_data_updata,
    setsharesettingcur
} from '../../actions';
import config from '../../env/config.js';

export class Page extends Component {
    componentWillMount () {
        //判断今天是否签到
        let sharesetting = {...this.props.sharesetting};
        sharesetting.url = `${config.serverurl}/app/#/qrcode/${this.props.invitecode}`;
        this.props.dispatch(setsharesettingcur(sharesetting));
        //queryorderstatusstat_request
    };
    onClickReturn =()=>{
        this.props.history.goBack();
    }
    showShare =()=>{
        this.props.dispatch(share_data_updata(true));
    }

    render() {
        return (
            <div className="mycodePage">
                <div className="PageHead">
                    <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                    <span className="title">我的邀请码</span>
                    <span className="imgcont" onClick={()=>{this.showShare()}} >
                        <img src="img/head/1.png"/>
                    </span>
                </div>
                <div className="content">
                    <span className="tt">邀请其他用户加入</span>
                    <span className="code">{this.props.invitecode}</span>
                </div>
                <div className="zhu">
                    注：邀请用户注册的时候，填写上您的邀请码，该用户就成为你的下级用户，下级用户在本平台的消费和使用，您也将获利！
                </div>
            </div>
        );
    }
}

let PageRedux =  ({userlogin:{invitecode},app:{sharesetting}}) =>{
    return {invitecode,sharesetting};
};
export default connect(PageRedux)(Page);
