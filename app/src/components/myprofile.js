import React, { Component, PropTypes } from 'react';
import {Page,Button} from 'react-onsenui';
import MyProfileDetail from './profiledetail.js';

export default function MyPage(props){
    let onClickPage=(name)=>{
      props.history.push(name);
    };
    return (<Page>
      <p style={{textAlign: 'center'}}>
      <Button onClick={()=>{onClickPage('/register')}}>注册</Button><br />
      <Button onClick={()=>{onClickPage('/addresslist')}}>地址列表</Button><br />
      <Button onClick={()=>{onClickPage('/addressadd')}}>新增地址</Button><br />
      <Button onClick={()=>{onClickPage('/userinfo')}}>用户信息</Button><br />
      <Button onClick={()=>{onClickPage('/profiledetail')}}>用户信息详情</Button><br />
      </p>
    </Page>);
}
