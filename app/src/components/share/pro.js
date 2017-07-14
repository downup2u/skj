/*
 * 产品详情
 * */
import React, { Component } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingproinfo.css';

import {
    uiaddcartdilog,
    uiiscollection,
    mycollectionaddone_request,
    mycollectiondelone_request,
    mycollectionisproductexits_request,
    set_productevaluatenumber,
    set_orderSurePage,
    set_weui,
    setsharesettingcur,
    share_data_updata,
 } from '../../actions';
 import {
    mycollectionisproductexits,
    mycollectiondelone,
    productcommentsfromproductgetcount
} from '../../actions/sagacallback.js';
import config from '../../env/config.js';
import {setbackhandler,removebackhandler} from '../../env/android';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

export class Page extends React.Component {

    componentWillUnmount(){
        //清空弹窗数据
        // this.props.dispatch(uiaddcartdilog({
        //     addcartdilogshow : false,
        //     addcartdilogproid : '',
        //     addcartdilogpronumber : 1,
        //     addcartdilogtype : "",
        // }));
    }

    componentWillMount () {
        // let sharesetting = {...this.props.sharesetting};
        // sharesetting.url = `${config.serverurl}/app/#/shareprodinfo/${this.props.match.params.id}`;
        // this.props.dispatch(setsharesettingcur(sharesetting));
        // this.checkCollection();
        // this.getEvaluate();
    };

    //提示下载
    downloadevent =()=>{
        this.props.dispatch(set_weui({
            confirm : {
                show : true,
                title : "下载水智盒app",
                text : "当前支持IOS和安卓系统",
                buttonsClose : ()=>{},
                buttonsClick : ()=>{
                  window.location.href=`${this.props.downloadurl}`;
                  //this.props.history.push(`${this.props.downloadurl}`)
                }
            },
        }));
    }

    render(){
        let proid = this.props.match.params.id;
        let proinfo = this.props.products[proid];
        if(!!proinfo){
          return (
              <div className="ProinfoPage">
                  <div className="ProinfoPageHead">
                      <Icon name="angle left" onClick={this.downloadevent} />
                      <span className="title">商品详情</span>
                      <span className="imgcont" onClick={this.downloadevent} >
                          <img src="img/shopping/11.png"/>
                          <span className={this.props.remoteRowCount==0?"hide":""}>{this.props.remoteRowCount}</span>
                      </span>
                  </div>
                  <div className="PageContent" style={{height:(window.innerHeight-118)+"px"}}>
                      <div className="shoppingBanner"
                          style={{
                              minHeight: "200px",
                              overflow: "visible"
                          }}
                          >
                          <Swiper
                              swiperOptions={{slidesPerView: 'auto'}}
                              {...swiperOptions}>
                              {_.map(proinfo.picurls.length>0?proinfo.picurls:[proinfo.picurl], (piclist,index)=>{
                                  return (
                                      <Slide
                                          key={index}
                                          className="Demo-swiper__slide">
                                          <img src={piclist}/>
                                      </Slide>
                                  )
                              })}

                          </Swiper>
                      </div>
                      <div className="proinfoHead">
                          <div className="p1">
                              <div>
                                  <span className="proname">{proinfo.name}</span>
                                  <span className="p2">
                                      <span>¥{proinfo.pricenow}</span>
                                      <span>¥{proinfo.pricemarket}</span>
                                  </span>
                              </div>
                          </div>
                      </div>
                      <div className="discountlist">
                          <div className="li" onClick={this.downloadevent} >
                              <span className="tt">
                                  商品评论
                              </span>
                              <span className="btn">{proinfo.evaluatenumber} 条评论 <Icon name="angle right"/></span>
                          </div>
                      </div>
                      <div className="proinfoBody">
                          <div className="proinfoBodyHead">
                              商品详情
                          </div>
                          <div className="proinfoBodyBody">

                              {
                                  proinfo.picurldetails.length>0
                                  ?
                                  _.map(proinfo.picurldetails, (picurl,index)=>{
                                      return (<img src={picurl} key={index} />)
                                  })
                                  :
                                  (<div style={{textAlign:"center",lineHeight:"50px",color:"#999999"}}>－暂无数据－</div>)
                              }

                          </div>
                      </div>

                  </div>
                  <div className="proinfoFoot">
                      <span onClick={this.downloadevent}><i>加入购物车</i></span>
                      <span onClick={this.downloadevent}><i>立刻购买</i></span>
                  </div>
              </div>
          );
        }
        return (<div>loading...</div>);

    }
}

let mapStateToProps = ({shop,shopcart,app,order,userlogin:{loginsuccess}}) => {
    return {...shop,...shopcart,...app,...order,loginsuccess};
}

Page = connect(mapStateToProps)(Page);
export default Page;
