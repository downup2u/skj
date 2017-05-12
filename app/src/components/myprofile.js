import React, { Component } from 'react';
import NavBar from './nav.js';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/myprofile.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    myOrderList_filler_set,
    share_data_updata,
    getusergetpointsigntoday_request,
    useraddpoint_request
} from '../actions';
import _ from "lodash";

export class Page extends Component {

    componentWillMount () {
        //判断今天是否签到
        this.props.dispatch(getusergetpointsigntoday_request({}));
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    handleOrderClick = (status) => {
        this.props.dispatch(myOrderList_filler_set(status));
        this.onClickPage("/myorder");
    };

    showShare =()=>{
        this.props.dispatch(share_data_updata(true));
    }

    signAdd =(reason)=>{
        this.props.dispatch(useraddpoint_request({reason}));
        // setTimeout(()=>{
        //     this.props.dispatch(getusergetpointsigntoday_request({}));
        // },10)
    }

    render(){
        return (
            <div className="myProfilePage"
                 style={{
                    height:(window.innerHeight-57)+"px",
                    overflow:"scroll"
                 }}>
                <div className="headCont">
                {
                    this.props.loginsuccess?(
                    <div className="userInfo" onClick={()=>{this.onClickPage('/userinfo')}}>
                        <img src={this.props.profile.avatar} className="avatar"/>
                        <span className="username">{this.props.profile.nickname}</span>
                        <span className="usertype">{this.props.usertype}</span>
                    </div>):
                    (<div className="userInfo" onClick={()=>{this.onClickPage('/login')}}>
                        <img src="img/myprofile/1.png" className="avatar"/>
                        <span className="username">未登录</span>
                        <span className="usertype"></span>
                    </div>)
                }
                    <div className="userCode">我的积分 <span>{this.props.point}</span></div>
                    <div className="userMessageLnk"  onClick={()=>{this.onClickPage('/mymessage')}}>
                        <img src="img/message.png"/>
                        {this.props.newmsgnumber>0?(
                            <span>{this.props.newmsgnumber}</span>
                        ):""}
                    </div>
                    {!this.props.isusergetpointsigntoday?(
                        <div className="signDom">
                            <span className="lnk" onClick={()=>{this.signAdd("签到")}}>签到</span>
                            <span>领积分</span>
                        </div>
                    ):""}
                </div>
                <div className="myProfileBannerCont">
                    <div className="l1con">
                        <div className="l1">
                            <span>我的订单</span>
                            <span onClick={()=>{this.handleOrderClick('全部')}}>全部订单</span>
                        </div>
                        <div className="l2">
                            <div onClick={()=>{this.handleOrderClick('未支付')}}>
                                <img src="img/myprofile/2.png"/>
                                <span>待付款</span>
                            </div>
                            <div onClick={()=>{this.handleOrderClick('待发货')}}>
                                <img src="img/myprofile/3.png"/>
                                <span>待发货</span>
                            </div>
                            <div onClick={()=>{this.handleOrderClick('待收货')}}>
                                <img src="img/myprofile/4.png"/>
                                <span>待收货</span>
                            </div>
                            <div onClick={()=>{this.handleOrderClick('已完成')}}>
                                <img src="img/myprofile/5.png"/>
                                <span>已完成</span>
                            </div>
                        </div>
                    </div>
                    <div className="llcont">
                        <div className="ll">
                            <div onClick={()=>{this.onClickPage('/distribution')}}>
                                <img src="img/myprofile/6.png"/>
                                <span>我的分销</span>
                            </div>
                            <div onClick={()=>{this.onClickPage('/myprofit')}}>
                                <img src="img/myprofile/7.png" />
                                <span>我的钱包</span>
                            </div>
                            <div onClick={()=>{this.onClickPage('/integral')}}>
                                <img src="img/myprofile/17.png"/>
                                <span>积分明细</span>
                            </div>
                        </div>
                        <div className="ll">
                            <div onClick={()=>{this.onClickPage('/mycode')}}>
                                <img src="img/myprofile/8.png"/>
                                <span>推广产品</span>
                            </div>
                            <div onClick={()=>{this.showShare()}}>
                                <img src="img/myprofile/9.png"/>
                                <span>分享赚钱</span>
                            </div>
                        </div>
                        <div className="ll">
                            <div onClick={()=>{this.onClickPage('/settings')}}>
                                <img src="img/myprofile/10.png"/>
                                <span>设置</span>
                            </div>
                        </div>

                        <div className="ll">
                            <div onClick={()=>{this.onClickPage('/mycollection')}}>
                                <img src="img/myprofile/11.png"/>
                                <span>我的收藏</span>
                            </div>
                            <div onClick={()=>{this.onClickPage('/mycoupon')}}>
                                <img src="img/myprofile/12.png"/>
                                <span>优惠券</span>
                            </div>
                        </div>
                        <div className="ll">
                            <div onClick={()=>{this.onClickPage('/addresslist')}}>
                                <img src="img/myprofile/13.png"/>
                                <span>地址管理</span>
                            </div>
                        </div>
                        <div className="ll">
                            <div onClick={()=>{this.onClickPage('/feedback')}}>
                                <img src="img/myprofile/14.png"/>
                                <span>意见反馈</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
}

const mapStateToProps =  ({userlogin,app:{newmsgnumber,memberlevelsetting}}) =>{
    let usertype = "";
    let usertypeArry = [];
    _.map(memberlevelsetting, (typepoint, index)=>{
        let s = {};
        s.number = typepoint;
        s.name = index;
        usertypeArry.push(s);
    })
    usertypeArry = _.sortBy(usertypeArry, ['number']);
    _.forEach(usertypeArry, function(value) {
        if(userlogin.point>=value.number){
            usertype = value.name;
        }
    });
    let userlogins = {...userlogin}
    return {...userlogins,newmsgnumber,usertype};
};
Page = withRouter(Page);
export default connect(
    mapStateToProps
)(Page);

