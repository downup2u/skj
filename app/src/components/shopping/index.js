/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash'; 
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
    //let proid = this.props.match.params.id;
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
                    {_.map(props.shop.banner1, (banner)=>{
                        return (
                            <Slide className="Demo-swiper__slide">
                                <img src={banner.url}/>
                            </Slide>
                        )
                    })}
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
            {_.map(props.shop.prolist, (list, typeid)=>{
                return (
                    <div>
                        <div className="listTitle2" onClick={()=>{onClickPage(`/shoppingprolist/${typeid}`)}}>
                            <span>{props.shop.protype[typeid].name}</span>
                            <span>更多 <Icon name="angle right"/></span>
                        </div>
                        <div className="proList">
                            {_.map(list, (pro)=>{
                                return (
                                    <div className="li" onClick={()=>{onClickPage(`/shoppingproinfo/${pro.proid}`)}}>
                                        <img src="img/shopping/8.png"/>
                                        <span className="name">{pro.name}</span>
                                        <span className="price">
                                            <span>{pro.price}</span>
                                            <img src={pro.avatar} />
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

let mapStateToProps = ({shop}) => {
    return {shop};
}

Page = connect(mapStateToProps)(Page);
export default Page;

