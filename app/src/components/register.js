import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox,Label} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {sendauth_request,register_request} from '../actions/index.js';
import {register} from '../actions/sagacallback.js';


let renderRegisterForm = (fields)=> {
    console.dir(fields);
    let ispasswordvisiable = fields.ispasswordvisiable.input.value;
    if (typeof ispasswordvisiable === 'string') {
        ispasswordvisiable = true;
    }

    let onChangePasswordvisiable = (event)=> {
        let newvalue = !ispasswordvisiable;
        fields.ispasswordvisiable.input.onChange(newvalue);
    }

    let onClickAuth = (e)=> {
        const name = fields.username.input.value;
        fields.dispatch(sendauth_request({username: name}));
        console.log("发送验证码:" + name);
    }



    return (<div className='loginform'>
        <div className="username logininput">
            <Input placeholder='输入手机号' {...fields.username.input} type="text"/>
            {fields.username.meta.touched && fields.username.meta.error &&
            <Label basic color='red' pointing>{fields.username.meta.error}</Label>}
            <Icon name="mobile" className='lefticon'/>
        </div>
        <div className="password logininput">
            <Input placeholder='输入验证码'  {...fields.authcode.input} type="text"/>
            {fields.authcode.meta.touched && fields.authcode.meta.error &&
            <Label basic color='red' pointing>{fields.authcode.meta.error}</Label>}
            <img src="img/rg2.png" className='lefticon'/>
            <Button type="button" className="yanzhenBtn" primary onClick={onClickAuth}>发送验证码</Button>
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

    </div>);
}
renderRegisterForm = connect()(renderRegisterForm);

let RegisterForm = (props)=> {
    let {handleSubmit,onClickRegister,onClickLogin,onClickReturn} = props;
    return (<Form onSubmit={handleSubmit(onClickRegister)}>
        <div className="loginPageTop">
            <div className="loginHead">
                <Icon name='angle left' onClick={onClickReturn}/>
                <img src="img/4.png" className="loginhead"/>
            </div>
            <Fields names={['username','ispasswordvisiable','password','authcode','invitecode']} component={renderRegisterForm}/>

            <div className="loginBotton">
                <Button primary>注册</Button>
                <Button basic type="button" onClick={onClickLogin}>快速登录</Button>
            </div>
        </div>
    </Form>);
};


const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = '必须填写用户名';
    }
    else {
        let phone = values.username;
        phone = phone.replace(/\s/g, '');
        if (phone.match(/\D/g) || phone.length !== 11 || !phone.match(/^1/)) {
            errors.username = '无效的手机号码';
        }
    }

    if (!values.authcode) {
        errors.authcode = '必须填写验证码';
    }
    else {
        let authcode = values.authcode;
        authcode = authcode.replace(/\s/g, '');
        if (authcode.match(/\D/g) || authcode.length !== 4) {
            errors.authcode = '验证码必须是四位数字';
        }
    }

    if (!values.password) {
        errors.password = '必须填写密码'
    }
    else {
        let psd = values.password;
        if (psd.match(/\s/g)) {
            errors.password = '密码不能含有空格';
        }
        else if (psd.length < 6) {
            errors.password = '密码不能小于六位';
        }
        else if (psd.length > 16) {
            errors.password = '密码太长';
        }
    }

   if (values.invitecode) {
        let invitecode = values.invitecode;
        if (invitecode.match(/\D/g) || invitecode.length !== 8) {
            errors.invitecode = '邀请码必须是八位数字(也可不填)';
        }
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
        ispasswordvisiable: false,
    }
})(RegisterForm);


import {login_request} from '../actions/index.js';
export class Page extends React.Component {

    componentWillMount() {
    }

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
