/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingprolist.css';

const Page = () => (
    <div className="ProlistPage">
        <div className="searchHead">
            <Icon name="angle left"/>
            <Input placeholder="请输入关键字" value="净水器"/>
            <img src="img/shopping/11.png"/>
        </div>
        <div className="hotLnk">
            <span className="sel">净水器·滤芯</span>
            <span>净水器·水龙头</span>
            <span>净水器·配件</span>
            <span>净水器·净水装置</span>
        </div>
        <div className="sortList">
            <span>综合</span>
            <span>热门</span>
            <span>新品</span>
            <span>价格<Icon name="sort" /></span>
            <div className="sortlistmore">
                <span>销量</span>
                <span>价格</span>
            </div>
        </div>

        <div className="proList" style={{height:(window.innerHeight-58-42-43)+"px"}}>

            <div className="li">
                <img src="img/shopping/8.png" />
                <span className="name">水可净智能水盒子</span>
                <span className="price">
                    <span>¥499.00</span>
                    <img src="img/shopping/9.png" />
                </span>
            </div>
            <div className="li">
                <img src="img/shopping/8.png" />
                <span className="name">水可净智能水盒子</span>
                <span className="price">
                    <span>¥499.00</span>
                    <img src="img/shopping/9.png" />
                </span>
            </div>
            <div className="li">
                <img src="img/shopping/8.png" />
                <span className="name">水可净智能水盒子</span>
                <span className="price">
                    <span>¥499.00</span>
                    <img src="img/shopping/9.png" />
                </span>
            </div>
            <div className="li">
                <img src="img/shopping/8.png" />
                <span className="name">水可净智能水盒子</span>
                <span className="price">
                    <span>¥499.00</span>
                    <img src="img/shopping/9.png" />
                </span>
            </div>
            <div className="li">
                <img src="img/shopping/8.png" />
                <span className="name">水可净智能水盒子</span>
                <span className="price">
                    <span>¥499.00</span>
                    <img src="img/shopping/9.png" />
                </span>
            </div>
            <div className="li">
                <img src="img/shopping/8.png" />
                <span className="name">水可净智能水盒子</span>
                <span className="price">
                    <span>¥499.00</span>
                    <img src="img/shopping/9.png" />
                </span>
            </div>
            <div className="li">
                <img src="img/shopping/8.png" />
                <span className="name">水可净智能水盒子</span>
                <span className="price">
                    <span>¥499.00</span>
                    <img src="img/shopping/9.png" />
                </span>
            </div>
        </div>
    </div>
)

export default Page
