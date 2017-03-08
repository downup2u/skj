import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
//import 'semantic-ui/dist/semantic.min.css';
let renderLoginForm = (fields)=>{
  let ispasswordvisiable = fields.ispasswordvisiable.input.value;
  let ischeckedpassword = fields.ischeckedpassword.input.value;
  if(typeof ispasswordvisiable === 'string'){
    ispasswordvisiable = true;
  }
  if(typeof ischeckedpassword === 'string'){
    ischeckedpassword = true;
  }
  let onChangePasswordvisiable = (event)=>{
    let newvalue = !ispasswordvisiable;
    fields.ispasswordvisiable.input.onChange(newvalue);
  }
  let onChangeRememberpassword =(event,data)=>{
    let newvalue = data.checked;//!ischeckedpassword;
    fields.ischeckedpassword.input.onChange(newvalue);
  }
  //选中时候怎么弄？  <Icon name={ispasswordvisiable?"lock":"eye"} className="sel" onClick={onChangePasswordvisiable}/>
  return (<div className='loginform'>
      <div className="username logininput">
          <Input placeholder='输入手机号' {...fields.username.input} type="text"/>
          <Icon name="mobile" className='lefticon'/>
      </div>
      <div className="password logininput">
          <Input placeholder='输入密码'  {...fields.password.input} type={ispasswordvisiable?"text":"password"}/>
          <Icon name="lock" className='lefticon'/>
          <Icon name={ispasswordvisiable?"lock":"eye"} className="sel" onClick={onChangePasswordvisiable}/>
      </div>
      <div className="remember">
          <Checkbox label='记住密码' checked={ischeckedpassword} onChange={onChangeRememberpassword}/>
      </div>
  </div>);
}

let LoginForm = (props)=>{
  let {handleSubmit,onClickRegister,onClickLogin,onClickForgetPasword} = props;
  return (<Form onSubmit={handleSubmit(onClickLogin)}>
    <div className="loginPageTop">
        <img src="/img/1.png" className="loginhead"/>
        <Fields names={[ 'username', 'password','ispasswordvisiable','ischeckedpassword' ]} component={renderLoginForm}/>
        <div className="loginBotton">
            <Button primary>登录</Button>
            <Button basic  type="button"  onClick={onClickRegister}>快速注册</Button>
            <div className="forgetpwd" onClick={onClickForgetPasword}>忘记密码</div>
        </div>
    </div>
  </Form>);
};

LoginForm = reduxForm({
  form: 'login',
  initialValues:{
    username:'',
    password:'',
    ispasswordvisiable:false,
    ischeckedpassword:true
  }
})(LoginForm);


import {login_request} from '../actions/index.js';
export class Page extends React.Component {

  componentWillMount () {
  }

  onClickRegister = ()=>{
    this.props.history.push('/register');
  }

  onClickLogin = (values)=>{
    console.dir(values);
    let payload = {
      username:values.username,
      password:values.password,
      // ispasswordvisiable:values.ispasswordvisiable,
      // ischeckedpassword:values.ischeckedpassword,
    }
    //alert(JSON.stringify(formdata));
    this.props.dispatch(login_request(payload));
  }
  onClickForgetPasword = ()=>{
    this.props.history.push('/forgetpwd');
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.loginsuccess){
      const redirectRoute = this.props.location.query.next || '/';
      this.props.history.replace(redirectRoute);
      return;
    }
  }
  render() {
    return (
        <div className="UserLoginPage">
            <LoginForm onClickRegister={this.onClickRegister}
             onClickLogin={this.onClickLogin}
             onClickForgetPasword={this.onClickForgetPasword}/>
            <div className="loginPageBottom">
                <div className="tit"><span>其他登录方式</span></div>
                <div className="lnk">
                    <div><Icon name="qq"/></div>
                    <div><Icon name="weixin"/></div>
                </div>
            </div>
        </div>
    );
  }

}

const mapStateToProps = ({userlogin}) => {
  return {userlogin};
}
Page = connect(mapStateToProps)(Page);
export default Page;
