import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image, Checkbox} from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
//import 'semantic-ui/dist/semantic.min.css';
let renderLoginForm = (fields)=>{
  let ispasswordvisiable = fields.ispasswordvisiable.input.value;
  let ischeckedpassword = fields.ischeckedpassword.input.value;
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
            <Button basic onClick={handleSubmit(onClickRegister)}>快速注册</Button>
            <div className="forgetpwd" onClick={handleSubmit(onClickForgetPasword)}>忘记密码</div>
        </div>
    </div>
  </Form>);
};

LoginForm = connect(
  state => ({
    initialValues:{
      username:'',
      password:'',
      ispasswordvisiable:false,
      ischeckedpassword:true
    }
  }))(LoginForm);

LoginForm = reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm);




let ListExampleDivided = (props) =>{
  let onClickRegister = ()=>{
    props.history.push('/register');
  }
  let onClickLogin = (values)=>{
    console.dir(values);
    let formdata = {
      username:values.username,
      password:values.password,
      ispasswordvisiable:values.ispasswordvisiable,
      ischeckedpassword:values.ischeckedpassword,
    }
    alert(JSON.stringify(formdata));
  }
  let onClickForgetPasword = ()=>{
    props.history.push('/forgetpwd');
  }
  return (
      <div className="UserLoginPage">
          <LoginForm onClickRegister={onClickRegister} onClickLogin={onClickLogin} onClickForgetPasword={onClickForgetPasword}/>
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

ListExampleDivided = connect()(ListExampleDivided);
export default ListExampleDivided
