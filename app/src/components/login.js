import React, { Component } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox,Label} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import NavBar from './nav.js';
import {loginQQ,loginWx} from '../env/login.js';
import {loginwithoauth_result,loginwithoauth_request} from '../actions';
import {withRouter} from 'react-router-dom';

//import 'semantic-ui/dist/semantic.min.css';
let renderLoginForm = (fields)=> {
    let ispasswordvisiable = fields.ispasswordvisiable.input.value;
    let ischeckedpassword = fields.ischeckedpassword.input.value;
    if (typeof ispasswordvisiable === 'string') {
        ispasswordvisiable = true;
    }
    if (typeof ischeckedpassword === 'string') {
        ischeckedpassword = true;
    }
    let onChangePasswordvisiable = (event)=> {
        let newvalue = !ispasswordvisiable;
        fields.ispasswordvisiable.input.onChange(newvalue);
    }
    let onChangeRememberpassword = (event, data)=> {
        let newvalue = data.checked;//!ischeckedpassword;
        fields.ischeckedpassword.input.onChange(newvalue);
    }


    //选中时候怎么弄？  <Icon name={ispasswordvisiable?"lock":"eye"} className="sel" onClick={onChangePasswordvisiable}/>
    return (<div className='loginform'>
        <div className="username logininput">
            <Input placeholder='输入手机号' {...fields.username.input} type="text"/>
            {fields.username.meta.touched && fields.username.meta.error &&
            <Label basic color='red' pointing>{fields.username.meta.error}</Label>}
            <Icon name="mobile" className='lefticon'/>
        </div>
        <div className="password logininput">
            <Input placeholder='输入密码'  {...fields.password.input} type={ispasswordvisiable?"text":"password"}/>
            {fields.password.meta.touched && fields.password.meta.error &&
            <Label basic color='red' pointing>{fields.password.meta.error}</Label>}
            <Icon name="lock" className='lefticon'/>
            <Icon name="eye" className={ispasswordvisiable?"eye sel":"eye"} onClick={onChangePasswordvisiable}/>
        </div>
    </div>);
}

let LoginForm = (props)=> {
    let {handleSubmit,onClickRegister,onClickLogin,onClickForgetPasword, id} = props;
    let onClickReturn = ()=> {
        props.history.goBack();
    }



    return (
        <Form onSubmit={handleSubmit(onClickLogin)} id={id}>
            <div className="loginPageTop">

                <div className="loginHead" onClick={()=>{}}>
                    <Icon  name='angle left' onClick={onClickReturn} />
                    <img src="img/4.png" className="loginhead"/>
                </div>
                <Fields names={[ 'username', 'password','ispasswordvisiable','ischeckedpassword' ]}
                        component={renderLoginForm}/>
                <div className="loginBotton">
                    <Button primary>登录</Button>
                    <Button basic type="button" onClick={onClickRegister}>快速注册</Button>
                    <div className="forgetpwdcon">
                        <div className="loginbysms" onClick={()=>props.history.push("/loginbysms")}>验证码登录</div>
                        <div className="forgetpwd" onClick={onClickForgetPasword}>忘记密码</div>
                    </div>
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
    return errors;
}

LoginForm = reduxForm({
    form: 'login',
    validate,
    initialValues: {
        username: '',
        password: '',
        ispasswordvisiable: false,
        ischeckedpassword: true
    }
})(LoginForm);

LoginForm = withRouter(LoginForm);

let resizetime = null;

import {login_request} from '../actions/index.js';
export class Page extends React.Component {

    constructor(props) {  
        super(props);  
        this.state = {
            p: 0,
            innerHeight : window.innerHeight
        };
    } 

    componentWillMount() {
        this.props.dispatch(loginwithoauth_result({bindtype:'',openid:''}));
        window.onresize = ()=>{
            window.clearTimeout(resizetime);
            resizetime = window.setTimeout(()=>{
                this.setState({innerHeight: window.innerHeight});
            }, 10)
        }


    }

    onClickRegister = ()=> {
        this.props.history.push('/register');
    }

    onClickLogin = (values)=> {
        console.dir(values);
        let payload = {
            username: values.username,
            password: values.password,
        }
        //alert(JSON.stringify(formdata));
        this.props.dispatch(login_request(payload));
    }
    onClickForgetPasword = ()=> {
        this.props.history.push('/forgetpwd');
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
                this.props.history.goBack();
            }
            return;
        }
        // else{
        //     if(nextProps.bindtype !== '' && this.props.bindtype === '' &&
        //     nextProps.openid !== '' && this.props.openid === ''){
        //         this.props.history.push('/userbind');
        //     }
        // }
    }


    render() {
        const {isweixininstalled} = this.props;
        let loginwithqq = ()=>{
            loginQQ((result)=>{
                if(result.code === '0'){
                  this.props.dispatch(loginwithoauth_request({bindtype:'qq',openid:result.openId}));
                }

            });
        }
        let loginwithwechat = ()=>{
            loginWx((result)=>{
              if(result.code === '0'){
                this.props.dispatch(loginwithoauth_request({bindtype:'weixin',openid:result.openid}));
              }
            });

        }
        return (
            <div className="UserLoginPage">
                <div>
                <LoginForm onClickRegister={this.onClickRegister}
                           onClickLogin={this.onClickLogin}
                           onClickForgetPasword={this.onClickForgetPasword}
                           id="UserLoginPageForm"
                            {...this.props}/>

                <div className="loginPageBottom">
                    <div className="tit"><span>其他登录方式</span></div>
                    <div className="lnk">
                        <div onClick={()=>{loginwithqq();}}><Icon name="qq" /></div>
                        {isweixininstalled && <div onClick={()=>{loginwithwechat();}}><Icon name="weixin" /></div>}
                    </div>
                </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({userlogin,app:{isweixininstalled}}) => {
    return {...userlogin,isweixininstalled};
}
Page = connect(mapStateToProps)(Page);
export default Page;
