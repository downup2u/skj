/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingproinfo.css';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

const Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    };
    let onClickPage = (name)=> {
        props.history.push(name);
    };
    return (
        <div className="ProinfoPage">
            <div className="ProinfoPageHead">
                <Icon name="angle left" onClick={()=>{onClickReturn()}} />
                <span className="title">商品详情</span>
                <span className="imgcont" onClick={()=>{onClickPage('/shoppingcart')}} >
                    <img src="img/shopping/11.png"/>
                </span>
            </div>

            <div className="shoppingBanner">
                <Swiper
                    swiperOptions={{slidesPerView: 'auto'}}
                    {...swiperOptions}>

                    <Slide className="Demo-swiper__slide">
                        <img src='img/shopping/12.png'/>
                    </Slide>

                    <Slide className="Demo-swiper__slide">
                        <img src='img/shopping/12.png'/>
                    </Slide>

                </Swiper>
            </div>
            <div className="proinfoHead">
                <div className="p1">
                    <span className="proname">海尔家用净水器海尔家用净水器海尔家用净水器海尔家用净水器海尔家用净水器</span>
                <span className="collectionLnk">
                    <img src="img/shopping/star.png"/>
                    <span>收藏</span>
                </span>
                </div>
                <div className="p2">
                    ¥1564.00
                </div>
                <div className="p3">
                    运费:0元
                </div>
            </div>
            <div className="discountlist">
                <div className="li">
                <span className="tt">
                    <img src="img/shopping/13.png"/>
                    抵扣20元
                </span>
                    <span className="btn getdiscountlnk">领取</span>
                </div>
                <div className="li" onClick={()=>{onClickPage('/shoppingproevaluate')}} >
                    <span className="tt">
                        商品评论(22条评论)
                    </span>
                    <span className="btn"><Icon name="angle right"/></span>
                </div>
            </div>
            <div className="proinfoBody">
                <div className="proinfoBodyHead">
                    商品详情
                </div>
                <div className="proinfoBodyBody">
                    <img src='img/shopping/banner3.png'/>
                </div>

            </div>
            <div className="proinfoFoot">
                <span><i>加入购物车</i></span>
                <span onClick={()=>{onClickPage('/pay')}}><i>立刻购买</i></span>
            </div>
        </div>
    )
}

export default Page
