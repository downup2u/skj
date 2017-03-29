/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingpackage.css';

const Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    };
    let onClickPage = (name)=> {
        props.history.push(name);
    };
    return (
        <div className="PackagePage">
            <div className="searchHead">
                <Icon name="angle left" onClick={()=>{onClickReturn()}} />
                <Input placeholder="请输入关键字" value="净水器"/>
                <img src="img/shopping/11.png"  onClick={()=>{onClickPage('/shoppingcart')}} />
            </div>
            <div className="proList" style={{height:(window.innerHeight-58)+"px"}}>
                <div className="li">
                    <img src="img/shopping/banner2.png"/>
                    <span className="name">[¥1564.00元套餐价]水可净滤芯HR002-5/5003/7503/10003滤芯套餐</span>
                    <span className="price">
                        <span>
                            <span className="p1">套餐价</span>
                            <span className="p2">¥1564.00</span>
                            <span className="p3"><i>单价</i>¥2200.00</span>
                        </span>
                        <Button color='red'><span>立刻购买</span><Icon name="caret right"/></Button>
                    </span>
                </div>
                <div className="li">
                    <img src="img/shopping/banner2.png"/>
                    <span className="name">[¥1564.00元套餐价]水可净滤芯HR002-5/5003/7503/10003滤芯套餐</span>
                    <span className="price">
                        <span>
                            <span className="p1">套餐价</span>
                            <span className="p2">¥1564.00</span>
                            <span className="p3"><i>单价</i>¥2200.00</span>
                        </span>
                        <Button color='red'><span>立刻购买</span><Icon name="caret right"/></Button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Page
