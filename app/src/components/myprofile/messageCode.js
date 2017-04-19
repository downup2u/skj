import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu, List, Label,Select } from 'semantic-ui-react';
import '../../../public/css/tixian.css';
import { connect } from 'react-redux';
import {
    profit_set_profityanzhen,
    showpopmessage,
    sendauth_request
} from '../../actions';
import {
    withdrawcashapplyauth
} from '../../actions/sagacallback.js';

export class Page extends Component {

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    //重新获取验证码
    getSendCode =()=>{
        this.props.dispatch(sendauth_request({username: this.props.username}));
    }

    submitProfitform =()=>{
        let form = this.props.profitform;
        let payload = {
            _id: this.props.profitid,
            username: this.props.username,
            authcode: this.props.profityanzhen
        };
        this.props.dispatch(withdrawcashapplyauth(payload)).then((result)=>{
            if(result.result=="OK"){
                this.props.dispatch((showpopmessage({
                    title: '申请成功',
                    msg: '',
                    type: 'success'
                })));
                setTimeout(()=>{
                    this.props.history.goBack();
                },2000)
            }
            if(result.result=="Error"){
                this.props.dispatch((showpopmessage({
                    title: '验证失败',
                    msg: '请输入正确的验证码',
                    type: 'error'
                })))
            }
        });
    }

    setYanzhen =(e)=>{
        let val = e.target.value;
        this.props.dispatch(profit_set_profityanzhen(val));
    }

    render() {
        let showphonenumber = this.props.username.substr(0,3)+"****"+this.props.username.substr(7,4);
        return (
            <div className="messageCode"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll",
                backgroundColor:"#F5F5F5"
             }}>
                <NavBar lefttitle="返回" title="短信验证" onClickLeft={this.onClickReturn} />
                <div className="messageCodeContent">
                    <span className="tit">请输入<span className="phone">{showphonenumber}</span>收到的短信验证码</span>
                    <div className="messageCodeInput">
                        <span className="txt">验证码</span>
                        <Input placeholder='请输入验证码' onChange={(e)=>{this.setYanzhen(e)}} />
                        <span className="getcode" onClick={()=>{this.getSendCode()}}>获取验证码</span>
                    </div>

                </div>
                <div className="buttoncon">
                    <Button primary onClick={()=>{this.submitProfitform()}}>完成</Button>
                </div>
            </div>
        );
    }
}
const mapStateToProps =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(mapStateToProps)(Page);


