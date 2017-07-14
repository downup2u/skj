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
import QRCode from "qrcode.react";

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
        const { match } = this.props;
        return (
            <div className="mycodePage">
                <div className="PageHead">
                    <span className="title">我的邀请码</span>
                </div>
                <div className="content">
                    <span className="tt">邀请其他用户加入</span>
                    <span className="code">{match.params.code}</span>
                    <QRCode
                        value={`${config.serverurl}/app/#/registerborrow/${match.params.code}`}
                        size={200}
                        />
                    <div className="desc" style={{fontSize:"14px",lineHeight:"30px"}}>
                        扫描二维码,邀请好友加入
                    </div>
                </div>
                <div className="zhu">
                    注：邀请用户注册的时候，填写上您的邀请码，该用户就成为你的下级用户，下级用户在本平台的消费和使用，您也将获利！
                </div>
            </div>
        );
    }
}

export default connect()(Page);
