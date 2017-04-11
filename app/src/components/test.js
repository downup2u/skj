/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    test_mycartgetall_request,
    test_mycollectiongetall_request,
    test_myordergetall_request,
    test_mycartaddone_request,
    test_mycollectionaddone_request
} from '../test/testshop';

let Page =(props)=>{
    let onClickPage=(name)=>{
        props.history.push(name);
    };
    return (<div>
        <p style={{textAlign: 'center'}}>
    <Button onClick={()=>{test_mycartgetall_request(props.dispatch)}}>测试获取购物车</Button><br />
   <Button onClick={()=>{test_mycollectiongetall_request(props.dispatch)}}>测试获取我的收藏</Button><br />
   <Button onClick={()=>{test_myordergetall_request(props.dispatch)}}>测试获取我的订单</Button><br />
 
   <Button onClick={()=>{test_mycartaddone_request(props.dispatch)}}>测试新增购物车</Button><br />
   <Button onClick={()=>{test_mycollectionaddone_request(props.dispatch)}}>测试新增我的收藏</Button><br />

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


Page = connect()(Page);
export default Page;