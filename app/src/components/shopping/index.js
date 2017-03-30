/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shopping.css';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

let Page = (props) => {
    let onClickPage = (name)=> {
        props.history.push(name);
    };
    return (
        <div className="shoppingPage">
            <div className="shoppingHead">
                <Input placeholder="请输入关键字" value="净水器"/>
                <img src="img/shopping/10.png"/>
            </div>
            <div className="shoppingBanner">
                <Swiper
                    swiperOptions={{slidesPerView: 'auto'}}
                    {...swiperOptions}>

                    <Slide className="Demo-swiper__slide">
                        <img src='img/shopping/banner.png'/>
                    </Slide>

                    <Slide className="Demo-swiper__slide">
                        <img src='img/shopping/banner.png'/>
                    </Slide>

                </Swiper>
            </div>
            <div className="listTitle">
                <img src="img/shopping/1.png"/>
                <span>家用套餐特惠价活动进行中</span>
            </div>
            <div className="shoppingBanner2">
                <img src="img/shopping/2.png" onClick={()=>{onClickPage('/shoppingpackage')}} />
                <img src="img/shopping/3.png" onClick={()=>{onClickPage('/shoppingpackage')}}/>
            </div>
            <div className="shoppingBannerLnk">
            <span onClick={()=>{onClickPage('/shoppingprolist')}}>
                <img src='img/shopping/4.png'/>
                净水系统
            </span>
            <span onClick={()=>{onClickPage('/shoppingprolist')}}>
                <img src='img/shopping/5.png'/>
                卫浴系统
            </span>
            <span onClick={()=>{onClickPage('/shoppingprolist')}}>
                <img src='img/shopping/6.png'/>
                管道系统
            </span>
            <span onClick={()=>{onClickPage('/shoppingprolist')}}>
                <img src='img/shopping/7.png'/>
                品质生活
            </span>
            </div>
            <div className="listTitle2" onClick={()=>{onClickPage('/shoppingprolist')}}>
                <span>水智能产品1</span>
                <span>更多 <Icon name="angle right"/></span>
            </div>
            <div className="proList">
                <div className="li" onClick={()=>{onClickPage('/shoppingproinfo')}}>
                    <img src="img/shopping/8.png"/>
                    <span className="name">水可净智能水盒子</span>
                    <span className="price">
                        <span>¥499.00</span>
                        <img src="img/shopping/9.png"/>
                    </span>
                </div>
                <div className="li" onClick={()=>{onClickPage('/shoppingproinfo')}}>
                    <img src="img/shopping/8.png"/>
                    <span className="name">水可净智能水盒子</span>
                    <span className="price">
                        <span>¥499.00</span>
                        <img src="img/shopping/9.png"/>
                    </span>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({shop}) => {
    return {shop};
}

Page = connect(mapStateToProps)(Page);
export default Page;

