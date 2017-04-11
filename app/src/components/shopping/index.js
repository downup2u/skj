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
import {
    search_shoptxt,
    mycartaddone_request,
    mycartgetall
} from '../../actions';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

let Page = (props) => {
    let onClickPage = (e,name)=> {
        stopDefault(e);
        props.history.push(name);
    };
    let shopcategorylist2ProList =(categoryid)=> {
        let products = [];
        _.map(props.products,(product,productid)=>{
            if(product.categoryid === categoryid){
                products.push(product);
            }
        });
        return products;
    }
    //加入购物车
    let addShoppingCart =(e, pro)=>{
        e.stopPropagation(e);
        props.dispatch(mycartaddone_request({
            product:pro._id
        }));  
    }
    //取消时间冒泡
    let stopDefault =(e)=>{
        e.stopPropagation
    }
    //let proid = this.props.match.params.id;
    return (
        <div className="shoppingPage">
            <div className="shoppingHead">
                <Input placeholder="请输入关键字" value={props.searchtxt} onClick={(e)=>{
                    onClickPage(e,'/shoppingprolist/search');
                }} />
                <img src="img/shopping/10.png"/>
            </div>
            <div className="shoppingBody">
                <div className="shoppingBanner">
                    <Swiper
                        swiperOptions={{slidesPerView: 'auto'}}
                        {...swiperOptions}>
                        {_.map(props.shopbanners, (bannerid,index)=>{
                            return (
                                <Slide key={index} className="Demo-swiper__slide">
                                    <img src={props.banners[bannerid].picurl} />
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
                    {_.map(props.shopcategorylist1, (categoryid, index)=>{
                        let category = props.categories[categoryid];
                        return (
                            <span key={index} onClick={()=>{onClickPage('/shoppingprolist')}}>
                                <img src={category.picurl}/>
                                {category.name}
                            </span>
                        )
                    })}
                </div>
                {_.map(props.shopcategorylist2, (categoryid, index)=>{
                    let category = props.categories[categoryid];
                    let prolist = shopcategorylist2ProList(categoryid);
                    return (
                        <div key={index}>
                            <div className="listTitle2" onClick={(e)=>{onClickPage(e,`/shoppingprolist/${index}`)}}>
                                <span>{category.name}</span>
                                <span>更多 <Icon name="angle right"/></span>
                            </div>
                            <div className="proList">
                                {_.map(prolist, (product,index)=>{
                                    return (
                                        <div key={index} className="li" onClick={(e)=>{onClickPage(e,`/shoppingproinfo/${product._id}`)}}>
                                            <img src={product.picurl}/>
                                            <span className="name">{product.name}</span>
                                            <span className="price">
                                                <span>{product.pricenow}</span>
                                                <img src='img/shopping/9.png' onClick={(e)=>{addShoppingCart(e,product)}}/>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}



let mapStateToProps = ({shop}) => {
    return {...shop};
}

Page = connect(mapStateToProps)(Page);
export default Page;

