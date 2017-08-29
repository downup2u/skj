import React, { Component } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox,Label} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {sendauth_request,loginwithauth_request} from '../actions/index.js';
import {register} from '../actions/sagacallback.js';
import NavBar from './nav.js';
import Sendauth from './tools/sendauth.js';


let renderFindPwdForm = (fields)=> {
    console.dir(fields);



    let onClickAuth = (callback)=> {
        const name = fields.username.input.value;
        const phone =  !!name && !(name.match(/\D/g)||name.length !== 11||!name.match(/^1/));
        console.log(phone);
        if(phone){
            fields.dispatch(sendauth_request({username: name,reason:'loginuser'}));
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
        <div className="password logininput yanzhenyinput">
            <Input placeholder='输入验证码'  {...fields.authcode.input} type="text"/>
            {fields.authcode.meta.touched && fields.authcode.meta.error &&
            <Label basic color='red' pointing>{fields.authcode.meta.error}</Label>}
            <Icon name="lock" className='lefticon'/>

            <Sendauth primary action={onClickAuth} className="yanzhenBtn" />
        </div>
    </div>);
}
renderFindPwdForm = connect()(renderFindPwdForm);

let FindpwdForm = (props)=> {
    let {handleSubmit,onClickOK,onClickLogin,onClickReturn} = props;
    return (<Form onSubmit={handleSubmit(onClickOK)}>
        <div className="loginPageTop">
            <NavBar lefttitle="返回" title="验证码登录" onClickLeft={onClickReturn}/>
            <Fields names={['username','ispasswordvisiable','password','authcode']} component={renderFindPwdForm}/>

            <div className="loginBotton">
                <Button primary>确定</Button>
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

    return errors;
}

FindpwdForm = reduxForm({
    form: 'loginbysms',
    validate,
    initialValues: {
        username: '',
        authcode: ''
    }
})(FindpwdForm);


import {findpwd} from '../actions/sagacallback';
export class Page extends React.Component {

    componentWillMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loginsuccess && !this.props.loginsuccess) {
            console.log("------->" + JSON.stringify(this.props.location));
            //search:?next=/devicelist
            var fdStart = this.props.location.search.indexOf("?next=");
            if (fdStart === 0) {
                const redirectRoute = this.props.location.search.substring(6);
                this.props.history.replace(redirectRoute);
            }
            else {
                this.props.history.go(-2);
            }
            return;
        }
    }

    onClickOK = (values)=> {
        console.dir(values);

        let payload = {
            phonenumber: values.username,
            password: values.password,
            authcode: values.authcode
        };

        this.props.dispatch(loginwithauth_request(payload));
    }

    onClickLogin = ()=> {
        this.props.history.replace('/login');

    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="UserLoginPage">
                <FindpwdForm onClickOK={this.onClickOK}
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
