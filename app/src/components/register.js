import React, { Component } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox,Label} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {sendauth_request,register_request} from '../actions/index.js';
import {register} from '../actions/sagacallback.js';
import Sendauth from './tools/sendauth.js';

import WeUI from 'react-weui';
import 'weui';
import '../../public/react-weui.min.css';
import {withRouter} from 'react-router-dom';
const {

    FormCell
    } = WeUI;

let renderRegisterForm = (fields)=> {
    let ispasswordvisiable = fields.ispasswordvisiable.input.value;
    if (typeof ispasswordvisiable === 'string') {
        ispasswordvisiable = true;
    }

    let onChangePasswordvisiable = (event)=> {
        let newvalue = !ispasswordvisiable;
        fields.ispasswordvisiable.input.onChange(newvalue);
    }

    //发送
    let onClickAuth = (callback)=> {
        const name = fields.username.input.value;
        const phone =  !!name && !(name.match(/\D/g)||name.length !== 11||!name.match(/^1/));
        console.log(phone);
        if(phone){

            fields.dispatch(sendauth_request({username: name,reason:'register'}));
        }
        callback(phone);
    }

    //服务条款
    let showsrever =()=>{
        console.log(fields);
        fields.history.push('/aboutus/servicerule');
    }

    return (<div className='loginform'>
        <div className="username logininput">
            <Input placeholder='输入手机号' {...fields.username.input} type="text"/>
            {fields.username.meta.touched && fields.username.meta.error &&
            <Label basic color='red' pointing>{fields.username.meta.error}</Label>}
            <Icon name="mobile" className='lefticon'/>
        </div>
        <div className="password logininput yanzhenyinput">
            <Input placeholder='输入验证码'  {...fields.authcode.input} type="text"/>
            {fields.authcode.meta.touched && fields.authcode.meta.error &&
            <Label basic color='red' pointing>{fields.authcode.meta.error}</Label>}
            <img src="img/rg2.png" className='lefticon'/>
            <Sendauth primary action={onClickAuth} className="yanzhenBtn" />
        </div>
        <div className="password logininput">
            <Input placeholder='输入密码'  {...fields.password.input} type={ispasswordvisiable?"text":"password"}/>
            {fields.password.meta.touched && fields.password.meta.error &&
            <Label basic color='red' pointing>{fields.password.meta.error}</Label>}
            <img src="img/rg3.png" className='lefticon'/>
            <img className="eye" src={ispasswordvisiable?"img/eye.png":"img/eye2.png"} onClick={onChangePasswordvisiable} />
        </div>
        <div className="password logininput">
            <Input placeholder='输入邀请码'  {...fields.invitecode.input} type="text"/>
            {fields.invitecode.meta.touched && fields.invitecode.meta.error &&
            <Label basic color='red' pointing>{fields.invitecode.meta.error}</Label>}
            <img src="img/rg4.png" className='lefticon'/>
        </div>
        <FormCell style={{paddingLeft:"6%"}} className="logininput">
            <label className="weui-agree">
                <input className="weui-agree__checkbox" {...fields.aggree.input} type="checkbox" />
                <span className="weui-agree__text">
                    &nbsp;&nbsp;同意水可净的
                </span>
            </label>
            《<a onClick={showsrever}>服务条款</a>》
            {fields.aggree.meta.touched && fields.aggree.meta.error &&
            <Label basic color='red' pointing><span style={{
                border:"1px solid #C00",
                borderRadius: "20px",
                display:"block",
                width : "14px",
                height : "14px",
                lineHeight: "14px",
                textAlign: "center"
            }}>{fields.aggree.meta.error}</span></Label>}
        </FormCell>
    </div>);
}
renderRegisterForm = connect()(renderRegisterForm);
renderRegisterForm = withRouter(renderRegisterForm);


let resizetime = null;

// let RegisterForm = (props)=> {
export class RegisterForm extends React.Component {

//     constructor(props) {  
//         super(props);  
//         this.state = {
//             innerHeight : window.innerHeight
//         };
//     } 
//     componentWillMount() {
//         window.onresize = ()=>{
//             window.clearTimeout(resizetime);
//             resizetime = window.setTimeout(()=>{
//                 this.setState({innerHeight: window.innerHeight});
//             }, 10)
//         }
//     }

    render(){
        let {handleSubmit,onClickRegister,onClickLogin,onClickReturn} = this.props;
        return (
            <Form
                onSubmit={handleSubmit(onClickRegister)} id="UserLoginPageForm"
                // style={{height:this.state.innerHeight + "px", overflow:"scroll"}}
                >
            <div className="loginPageTop">
                <div className="loginHead">
                    <Icon name='angle left' onClick={onClickReturn}/>
                    <img src="img/4.png" className="loginhead"/>
                </div>
                <Fields names={['username','ispasswordvisiable','password','authcode','invitecode','aggree']} component={renderRegisterForm}/>

                <div className="loginBotton" style={{padding: "2px 14% 10px 14%"}}>
                    <Button primary>注册</Button>
                    <Button basic type="button" onClick={onClickLogin}>快速登录</Button>
                </div>
            </div>
        </Form>);
    }
};


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = '必填项';
    }
    else {
        let phone = values.username;
        phone = phone.replace(/\s/g, '');
        if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
            errors.username = '无效手机号';
        }
    }

    if (!values.authcode) {
        errors.authcode = '必填项';
    }
    else {
        let authcode = values.authcode;
        authcode = authcode.replace(/\s/g, '');
        if (authcode.match(/\D/g) || authcode.length !== 4) {
            errors.authcode = '四位数字';
        }
    }

    if (!values.password) {
        errors.password = '必填项'
    }
    else {
        let psd = values.password;
        if (psd.match(/\s/g)) {
            errors.password = '不能含有空格';
        }
        else if (psd.length < 6) {
            errors.password = '密码至少六位';
        }
        else if (psd.length > 16) {
            errors.password = '密码太长';
        }
    }

   if (values.invitecode) {
        let invitecode = values.invitecode;
        if (invitecode.match(/\D/g) || invitecode.length !== 8) {
            errors.invitecode = '八位数字(选填)';
        }
    }


    if (!values.aggree) {
        errors.aggree = '!';
    }

    return errors;
}

RegisterForm = reduxForm({
    form: 'register',
    validate,
    initialValues: {
        username: '',
        password: '',
        authcode: '',
        invitecode:'',
        aggree: false,
        ispasswordvisiable: false,
    }
})(RegisterForm);


import {login_request} from '../actions/index.js';
let resizetime2 = null;
export class Page extends React.Component {

//     constructor(props) {  
//         super(props);  
//         this.state = {
//             innerHeight : window.innerHeight
//         };
//     } 
//     componentWillMount() {
//         window.onresize = ()=>{
//             window.clearTimeout(resizetime2);
//             resizetime2 = window.setTimeout(()=>{
//                 this.setState({innerHeight: window.innerHeight});
//             }, 10)
//         }
//     }

    onClickReturn =()=>{
        this.props.history.goBack();
    }
    onClickRegister = (values)=> {
        console.dir(values);

        let payload = {
            username: values.username,
            password: values.password,
            authcode: values.authcode,
            invitecode:values.invitecode
        }
        //alert(JSON.stringify(formdata));
        this.props.dispatch(register(payload)).then((result)=> {
            this.props.history.replace('/');
        }).catch((error)=> {
            console.log("注册失败:" + JSON.stringify(error));
        });
    }

    onClickLogin = ()=> {
        this.props.history.replace('/login');

    }

    render() {
        return (
            <div className="UserLoginPage">
                <RegisterForm onClickRegister={this.onClickRegister}
                              onClickLogin={this.onClickLogin}
                              onClickReturn={this.onClickReturn}/>
            </div>
        );
    }

}

const mapStateToProps = ({userlogin}) => {
    return {userlogin};
}
Page = connect(mapStateToProps)(Page);
export default Page;
