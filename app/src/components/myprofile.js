import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/myprofile.css';

let countryOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'}];

export default function Page(props) {
    let onClickPage = (name)=> {
        props.history.push(name);
    };
    return (
        <div className="myProfilePage"
             style={{
                height:(window.innerHeight-57)+"px",
                overflow:"scroll"
             }}>
            <div className="headCont">
                <div className="userInfo">
                    <img src="img/myprofile/1.png" className="avatar"/>
                    <span className="username">爱喝水的孩子</span>
                    <span className="usertype">普通会员</span>
                </div>
                <div className="userCode">我的积分 <span>0</span></div>
                <div className="userMessageLnk"  onClick={()=>{onClickPage('/mymessage')}}>
                    <img src="img/message.png"/>
                    <span>0</span>
                </div>
            </div>
            <div className="myProfileBannerCont">
                <div className="l1con">
                    <div className="l1">
                        <span>我的订单</span>
                        <span onClick={()=>{onClickPage('/myorder')}}>全部订单</span>
                    </div>
                    <div className="l2">
                        <div>
                            <img src="img/myprofile/2.png"/>
                            <span>待付款</span>
                        </div>
                        <div>
                            <img src="img/myprofile/3.png"/>
                            <span>待发货</span>
                        </div>
                        <div>
                            <img src="img/myprofile/4.png"/>
                            <span>待收货</span>
                        </div>
                        <div>
                            <img src="img/myprofile/5.png"/>
                            <span>退货</span>
                        </div>
                    </div>
                </div>
                <div className="llcont">
                    <div className="ll">
                        <div onClick={()=>{onClickPage('/distribution')}}>
                            <img src="img/myprofile/6.png"/>
                            <span>我的分销</span>
                        </div>
                        <div onClick={()=>{onClickPage('/myprofit')}}>
                            <img src="img/myprofile/7.png" />
                            <span>我的钱包</span>
                        </div>
                    </div>
                    <div className="ll">
                        <div>
                            <img src="img/myprofile/8.png"/>
                            <span>推广产品</span>
                        </div>
                        <div>
                            <img src="img/myprofile/9.png"/>
                            <span>分享赚钱</span>
                        </div>
                    </div>
                    <div className="ll">
                        <div>
                            <img src="img/myprofile/10.png"/>
                            <span>设置</span>
                        </div>
                    </div>

                    <div className="ll">
                        <div onClick={()=>{onClickPage('/mycollection')}}>
                            <img src="img/myprofile/11.png"/>
                            <span>我的收藏</span>
                        </div>
                        <div onClick={()=>{onClickPage('/mycoupon')}}>
                            <img src="img/myprofile/12.png"/>
                            <span>优惠券</span>
                        </div>
                    </div>
                    <div className="ll">
                        <div  onClick={()=>{onClickPage('/addresslist')}}>
                            <img src="img/myprofile/13.png"/>
                            <span>地址管理</span>
                        </div>
                    </div>
                    <div className="ll">
                        <div>
                            <img src="img/myprofile/14.png"/>
                            <span>意见反馈</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}