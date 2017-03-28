/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../../../public/css/shoppingproevaluate.css';

const Page = () => (
    <div className="ShoppingproevaluatePage">
        <div className="ProinfoPageHead">
            <Icon name="angle left"/>
            <span className="title">商品详情</span>
            <span className="imgcont"><img src="img/head/1.png"/></span>
        </div>

        <div className="proList" style={{minHeight:(window.innerHeight-48)+"px"}}>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
            <div className="li">
                <div className="tt">
                    <img src="img/shopping/14.png" />
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
        </div>
    </div>
)

export default Page
