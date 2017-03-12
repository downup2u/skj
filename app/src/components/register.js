import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {sendauth_request,register_request} from '../actions/index.js';
import {register} from '../actions/sagacallback.js';
//import 'semantic-ui/dist/semantic.min.css';
let renderRegisterForm = (fields)=>{
  console.dir(fields);
  let ispasswordvisiable = fields.ispasswordvisiable.input.value;
  if(typeof ispasswordvisiable === 'string'){
    ispasswordvisiable = true;
  }

  let onChangePasswordvisiable = (event)=>{
    let newvalue = !ispasswordvisiable;
    fields.ispasswordvisiable.input.onChange(newvalue);
  }

  let onClickAuth =(e)=>{
    const name = fields.username.input.value;
    fields.dispatch(sendauth_request({username:name}));
    console.log("发送验证码:"+name);
  }

  return (<div className='registerform'>
      <div className="username logininput">
          <Input placeholder='输入手机号' {...fields.username.input} type="text"/>
          <Icon name="mobile" className='lefticon'/>
      </div>
      <div className="password logininput">
          <Input placeholder='输入验证码'  {...fields.authcode.input} type="text"/>
          <Icon name="lock" className='lefticon'/>
          <Button type="button" primary onClick={onClickAuth}>发送验证码</Button>
      </div>
      <div className="password logininput">
          <Input placeholder='输入密码'  {...fields.password.input} type={ispasswordvisiable?"text":"password"}/>
          <Icon name="lock" className='lefticon'/>
          <Icon name={ispasswordvisiable?"lock":"eye"} className="sel" onClick={onChangePasswordvisiable}/>
      </div>
  </div>);
}
renderRegisterForm = connect()(renderRegisterForm);

let RegisterForm = (props)=>{
  let {handleSubmit,onClickRegister,onClickLogin} = props;
  return (<Form onSubmit={handleSubmit(onClickRegister)}>
    <div className="loginPageTop">
        <img src="/img/1.png" className="loginhead"/>
        <Fields names={['username','ispasswordvisiable','password','authcode']} component={renderRegisterForm}/>
        <div className="loginBotton">
            <Button primary>注册</Button>
            <Button basic  type="button" onClick={onClickLogin}>快速登录</Button>
        </div>
    </div>
  </Form>);
};

RegisterForm = reduxForm({
  form: 'register',
  initialValues:{
    username:'',
    password:'',
    authcode:'',
    ispasswordvisiable:false,
  }
})(RegisterForm);


import {login_request} from '../actions/index.js';
export class Page extends React.Component {

  componentWillMount () {
  }

  onClickRegister = (values)=>{
    console.dir(values);

    let payload = {
      username:values.username,
      password:values.password,
      authcode:values.authcode
    }
    //alert(JSON.stringify(formdata));
    this.props.dispatch(register(payload)).then((result)=>{
      this.props.history.goBack();
    }).catch((error)=>{
      console.log("注册失败:" + JSON.stringify(error));
    });
  }

  onClickLogin = ()=>{
    this.props.history.replace('/login');

  }

  render() {
    return (
        <div className="UserLoginPage">
            <RegisterForm onClickRegister={this.onClickRegister}
             onClickLogin={this.onClickLogin}/>
        </div>
    );
  }

}

const mapStateToProps = ({userlogin}) => {
  return {userlogin};
}
Page = connect(mapStateToProps)(Page);
export default Page;
