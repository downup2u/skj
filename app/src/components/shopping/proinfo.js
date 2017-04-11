/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash'; 
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingproinfo.css';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

let Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    };
    let onClickPage = (name)=> {
        props.history.push(name);
    };
    let proid = props.match.params.id;
    let proinfo = props.products[proid];
    console.log(proinfo);

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
                    {_.map(proinfo.picurl, (proimg, index)=>{
                        return (
                            <Slide key={index} className="Demo-swiper__slide">
                                <img src={proinfo.picurl}/>
                            </Slide>
                        )
                    })}
                </Swiper>
            </div>
            <div className="proinfoHead">
                <div className="p1">
                    <span className="proname">{proinfo.name}</span>
                <span className="collectionLnk">
                    <img src="img/shopping/star.png"/>
                    <span>收藏</span>
                </span>
                </div>
                <div className="p2">
                    ¥{proinfo.pricenow}
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
                <div className="proinfoBodyBody" dangerouslySetInnerHTML={{__html: proinfo.info}} />
            </div>
            <div className="proinfoFoot">
                <span><i>加入购物车</i></span>
                <span onClick={()=>{onClickPage('/pay')}}><i>立刻购买</i></span>
            </div>
        </div>
    )
}

let mapStateToProps = ({shop}) => {
    return {...shop};
}

Page = connect(mapStateToProps)(Page);
export default Page;