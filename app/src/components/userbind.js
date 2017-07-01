import React, { Component } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox,Label} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {sendauth_request} from '../actions/index.js';
import {oauthbinduser} from '../actions/sagacallback.js';
import Sendauth from './tools/sendauth.js';


let renderBinduserForm = (fields)=> {
    console.dir(fields);
    let ispasswordvisiable = fields.ispasswordvisiable.input.value;
    if (typeof ispasswordvisiable === 'string') {
        ispasswordvisiable = true;
    }

    let onChangePasswordvisiable = (event)=> {
        let newvalue = !ispasswordvisiable;
        fields.ispasswordvisiable.input.onChange(newvalue);
    }

    // let onClickAuth = (e)=> {
    //     const name = fields.username.input.value;
    //     fields.dispatch(sendauth_request({username: name,reason:'binduser'}));
    //     console.log("发送验证码:" + name);
    // }

    let onClickAuth = (callback)=> {
        const name = fields.username.input.value;
        const phone =  !!name && !(name.match(/\D/g)||name.length !== 11||!name.match(/^1/));
        console.log(phone);
        if(phone){
            fields.dispatch(sendauth_request({username: name,reason:'binduser'}));
        }
        callback(phone);
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

    </div>);
}
renderBinduserForm = connect()(renderBinduserForm);

let BinduserForm = (props)=> {
    let {handleSubmit,onClickBinduser,onClickLogin,onClickReturn} = props;
    return (<Form onSubmit={handleSubmit(onClickBinduser)}>
        <div className="loginPageTop">
            <div className="loginHead">
                <Icon name='angle left' onClick={onClickReturn}/>
                <img src="img/4.png" className="loginhead"/>
            </div>
            <Fields names={['username','ispasswordvisiable','password','authcode','invitecode']} component={renderBinduserForm}/>

            <div className="loginBotton">
                <Button primary>绑定</Button>
             </div>
        </div>
    </Form>);
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
    return errors;
}

BinduserForm = reduxForm({
    form: 'binduser',
    validate,
    initialValues: {
        username: '',
        password: '',
        authcode: '',
        invitecode:'',
        ispasswordvisiable: false,
    }
})(BinduserForm);


export class Page extends React.Component {

    componentWillMount() {
    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }
    onClickBinduser = (values)=> {
        console.dir(values);

        let payload = {
            bindtype:this.props.bindtype,
            openid:this.props.openid,
            username: values.username,
            password: values.password,
            authcode: values.authcode,
            invitecode:values.invitecode
        }
        //alert(JSON.stringify(formdata));
        this.props.dispatch(oauthbinduser(payload)).then((result)=> {
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
                <BinduserForm onClickBinduser={this.onClickBinduser}
                              onClickLogin={this.onClickLogin}
                              onClickReturn={this.onClickReturn}/>
            </div>
        );
    }

}

const mapStateToProps = ({userlogin}) => {
    return {...userlogin};
}
Page = connect(mapStateToProps)(Page);
export default Page;
