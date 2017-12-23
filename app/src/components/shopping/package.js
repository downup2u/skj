/*
 * 套餐一体机
 * */
import React, { Component } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import NavBar from '../newnav.js';
import _ from 'lodash';
import { Swiper, Slide } from 'react-dynamic-swiper';
import {ui_viewshoppingproinfo} from '../../actions';

import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingpackage.css';

const Page = (props) => {

    let onClickPage = (name)=> {
        props.history.push(name);
    };

    return (
        <div className="PackagePage">
            <NavBar
                back = {true}
                title = "一体机"
                rightnav = {
                    [
                        {
                            icon : 'img/shopping/11.png',
                            text : '',
                            type : 'push',//push, action,
                            url : '/shoppingcart',
                            width : "30px",
                            height : "30px",
                            number : props.remoteRowCount
                        },
                    ]
                }

            />

            <div className="proList" style={{height:(window.innerHeight-58)+"px"}}>
                {
                    _.map(props.prolist, (proinfo, index)=>{
                        return (
                            <div className="li" key={index} onClick={()=>{
                              // onClickPage(`/shoppingproinfo/${proinfo._id}`)
                              this.props.dispatch(ui_viewshoppingproinfo(proinfo._id));
                            }
                            }>
                                <img src={proinfo.picurl}/>
                                <span className="name">{proinfo.name}</span>
                                <span className="price">
                                    <span>
                                        <span className="p1">套餐价</span>
                                        <span className="p2">¥{proinfo.pricenow}</span>
                                        <span className="p3"><i>单价</i>¥{proinfo.pricemarket}</span>
                                    </span>
                                    <Button color='red'><span>立刻购买</span><Icon name="caret right"/></Button>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

let Data = ({shop,shopcart:{remoteRowCount}},props) => {
    let fillerList = _.filter(shop.products, { 'categoryid': props.match.params.id });
    //排序
    let prolist = _.sortBy(fillerList, ['publishdate']);
    return { prolist, remoteRowCount };
}

export default connect(Data)(Page);
