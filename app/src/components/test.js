/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    test_mycartgetall_request,
    test_mycartaddone_request,
    test_mycartupdateone_request,
    test_mycartdelone_request,

    test_mycollectiongetall_request,
    test_mycollectionaddone_request,
    test_mycollectiondelone_request,
    test_mycollectionisproductexits,

    test_myordergetall_request,
    test_myorderaddone_request,
    test_myorderupdateone_request,
    test_myorderdelone_request,

    test_productcommentsfromproduct_request,
    test_productcommentaddone_request,
    test_productcommentsfromproductgetcount_request,

    test_withdrawcashapplyaddone_request,
    test_withdrawcashapplyauth_request,

    test_mycoupongetall_request,

    test_getnextusers_request,
    test_getdistsalesorderstat_request,
    test_getdistsalesorders_request,
    test_getdistsalesorderdetails_request
} from '../test/testshop';

import {
    test_feedbackaddone
} from '../test/testfeedback';

import {
    test_getusermoney,
    test_useraddpoint,
    test_getusergetpointsigntoday_request,
    test_getuserpointdetails,
} from '../test/testpoint';

import {
  zfbPay,
  wxPay,
  testnotifypay
} from '../test/testpay';


let Page =(props)=>{
    let onClickPage=(name)=>{
        props.history.push(name);
    };
    return (<div>
        <p style={{textAlign: 'center'}}>
            <Button onClick={()=>{test_feedbackaddone(props.dispatch)}}>测试用户反馈</Button><br />
             <br />

            <Button onClick={()=>{testnotifypay()}}>测试服务端回调</Button><br />
             <br />

        <Button onClick={()=>{test_getusermoney(props.dispatch)}}>获取积分&余额</Button><br />
        <Button onClick={()=>{test_useraddpoint(props.dispatch,'签到')}}>签到得积分</Button><br />
        <Button onClick={()=>{test_useraddpoint(props.dispatch,'分享')}}>分享得积分</Button><br />
        <Button onClick={()=>{test_getusergetpointsigntoday_request(props.dispatch)}}>今日是否已分享</Button><br />
        <Button onClick={()=>{test_getuserpointdetails(props.dispatch)}}>获取积分明细（分页）</Button><br />
        <br />

         <Button onClick={()=>{zfbPay()}}>测试支付宝</Button><br />
      <Button onClick={()=>{wxPay()}}>测试微信</Button><br />
    <br />
    <Button onClick={()=>{test_getnextusers_request(props.dispatch)}}>分销-获取下级用户个数</Button><br />
    <Button onClick={()=>{test_getdistsalesorderstat_request(props.dispatch)}}>分销-获取下级用户订单统计</Button><br />
    <Button onClick={()=>{test_getdistsalesorders_request(props.dispatch)}}>分销-获取下级用户订单</Button><br />
    <Button onClick={()=>{test_getdistsalesorderdetails_request(props.dispatch)}}>分销-获取所有订单提现记录（分页）</Button><br />
    <br />


   <Button onClick={()=>{test_mycartgetall_request(props.dispatch)}}>测试获取购物车</Button><br />
   <Button onClick={()=>{test_mycartaddone_request(props.dispatch)}}>测试新增购物车</Button><br />
   <Button onClick={()=>{test_mycartupdateone_request(props.dispatch)}}>测试修改购物车</Button><br />
   <Button onClick={()=>{test_mycartdelone_request(props.dispatch)}}>测试删除我的购物车</Button><br />
   <br />
   <Button onClick={()=>{test_mycollectiongetall_request(props.dispatch)}}>测试获取我的收藏</Button><br />
   <Button onClick={()=>{test_mycollectionaddone_request(props.dispatch)}}>测试新增我的收藏</Button><br />
   <Button onClick={()=>{test_mycollectiondelone_request(props.dispatch)}}>测试删除我的收藏</Button><br />
   <Button onClick={()=>{test_mycollectionisproductexits(props.dispatch)}}>测试是否某产品被我收藏过</Button><br />
   <br />

   <Button onClick={()=>{test_myordergetall_request(props.dispatch)}}>测试获取我的订单</Button><br />
   <Button onClick={()=>{test_myorderaddone_request(props.dispatch)}}>测试新增我的订单</Button><br />
   <Button onClick={()=>{test_myorderupdateone_request(props.dispatch)}}>测试修改我的订单</Button><br />
   <Button onClick={()=>{test_myorderdelone_request(props.dispatch)}}>测试删除我的订单</Button><br />
    <br />

   <Button onClick={()=>{test_productcommentsfromproduct_request(props.dispatch)}}>根据产品获取所有评论</Button><br />
   <Button onClick={()=>{test_productcommentaddone_request(props.dispatch)}}>插入一条评论</Button><br />
   <Button onClick={()=>{test_productcommentsfromproductgetcount_request(props.dispatch)}}>根据产品获取所有评论个数</Button><br />
    <br />

    <Button onClick={()=>{test_withdrawcashapplyaddone_request(props.dispatch)}}>提现申请</Button><br />
    <Button onClick={()=>{test_withdrawcashapplyauth_request(props.dispatch)}}>提现手机验证</Button><br />
    <br />

   <Button onClick={()=>{test_mycoupongetall_request(props.dispatch)}}>获取我的优惠券</Button><br />
    <br />
  
 

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