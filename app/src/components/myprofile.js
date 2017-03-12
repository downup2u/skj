import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
//import { browserHistory,} from 'react-router-dom';

export default function MyPage(props){
    let onClickPage=(name)=>{
      props.history.push(name);
    };
    return (<div>
      <p style={{textAlign: 'center'}}>
      <Button onClick={()=>{onClickPage('/login')}}>登录</Button><br />
      <Button onClick={()=>{onClickPage('/register')}}>注册</Button><br />
      <Button onClick={()=>{onClickPage('/devicelist')}}>设备列表</Button><br />
      <Button onClick={()=>{onClickPage('/newdevice')}}>新增设备</Button><br />
      <Button onClick={()=>{onClickPage('/addresslist')}}>地址列表</Button><br />
      <Button onClick={()=>{onClickPage('/newaddress')}}>新增地址</Button><br />
      <Button onClick={()=>{onClickPage('/userinfo')}}>用户信息</Button><br />
      <Button onClick={()=>{onClickPage('/profiledetail')}}>用户信息详情</Button><br />
      <Button onClick={()=>{onClickPage('/newtopic')}}>新建帖子</Button><br />
      </p>
    </div>);
}
