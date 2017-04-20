/*
 * 订单详情
 * */
import React, { Component, PropTypes } from 'react';
import { Input, Button, Menu, Icon, Checkbox} from 'semantic-ui-react';
import NavBar from '../nav.js';
import '../../../public/css/pay.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    myordergetall,
    mycoupongetall
} from '../../actions/sagacallback.js';
import {
    payway_set,
    updata_orderinfo
} from '../../actions';

import {onclickpay} from '../../env/pay';

export class Page extends Component {

    //获取我的地址列表
    componentWillMount() {
        let payload = {
            query: {usestatus : "未使用"},
            options: {
                page: 1,
                limit: 1000,
            }
        };
        this.props.dispatch(mycoupongetall(payload));
    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    onClickPay =()=> {
        let orderinfo = this.props.orderinfo;
        let dispatch = this.props.dispatch;
        let payway = this.props.payway;
        onclickpay({orderinfo,payway,dispatch},(result)=>{
            console.log(`获得数据：${result}`);
        });
    };
    //设置支付方式
    setpayway =(paytype)=>{
        let orderinfo = this.props.orderinfo;
        orderinfo.payway = paytype;
        this.props.dispatch(updata_orderinfo(orderinfo));
    };

    //设置是否是有优惠
    updataUse =(type)=>{
        let orderinfo = this.props.orderinfo;
        orderinfo[type] = !orderinfo[type];
        this.props.dispatch(updata_orderinfo(orderinfo));
    }

    render() {
        const {orderinfo, orderAddressInfo, balance, point, pointmoney} = this.props;
        console.log("orderinfo:::"+JSON.stringify(orderinfo));
        return (
            <div className="PayPage"
                style={{
                    height:(window.innerHeight)+"px",
                }}
                >
                <div className="PageHead">
                    <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                    <span className="title">支付订单</span>
                </div>
                <div className="PayPageBody">
                    <div className="orderaddress" onClick={()=>{this.onClickPage('/seladdress')}}>
                    <img src="img/shopping/mark.png" />
                    <div className="addressinfo">
                        {orderAddressInfo.hasOwnProperty("_id")?(
                            <div>
                                <div className="userinfo">
                                    <span>收货人:{orderAddressInfo.truename}</span>
                                    <span>{orderAddressInfo.phonenumber}</span>
                                </div>
                                <div>
                                    收货地址:
                                    {orderAddressInfo.seladdr.selprovice.value}
                                    {orderAddressInfo.seladdr.selcity.value}
                                    {orderAddressInfo.seladdr.seldistict.value}
                                    {orderAddressInfo.addressname}
                                </div>
                            </div>
                        ):(
                            <div className="goToseladdress">请选择收获地址</div>
                        )}
                        
                    </div>
                </div>
                    <div className="proinfo">
                        {_.map(orderinfo.productsdetail,(proinfo,index)=>{
                            return (
                                <div className="li" key={index}>
                                    <img src={proinfo.productinfo.picurl} />
                                    <div>
                                        <span>{proinfo.productinfo.name}</span>
                                        <span className="price">
                                            <span>¥{proinfo.price}</span>
                                            <span>X{proinfo.number}</span>
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="list">
                        <div className="li">
                            <span>运费</span>
                            <span>¥{orderinfo.orderexpress}</span>
                        </div>
                        <div className="li">
                            <span>余额支付</span>
                            <span>- ¥{orderinfo.balanceprice}</span>
                            <Checkbox toggle checked={orderinfo.usebalance} onClick={()=>{this.updataUse("usebalance")}}/>
                        </div>
                        <div className="li">
                            <span>使用积分</span>
                            <span>- ¥{orderinfo.pointprice}</span>
                            <Checkbox toggle checked={orderinfo.usepoint} onClick={()=>{this.updataUse("usebalance")}}/>
                        </div>
                        <div className="li selcoupon" onClick={()=>{this.onClickPage(`/selcoupon/${orderinfo._id}`)}}>
                            <span>使用优惠券</span>
                            <span>- ¥{orderinfo.couponprice}</span>
                        </div>
                    </div>

                    <div className="paytype">
                        <div className="li">
                            <img src="img/shopping/15.png" />
                            <div className="txt">
                                <span>微信</span>
                                <span>推荐微信用户使用</span>
                            </div>
                            <Checkbox 
                                name="paycheck" 
                                onClick={()=>{this.setpayway("weixin")}} 
                                checked={orderinfo.payway=="weixin"}
                                />
                        </div>
                        <div className="li">
                            <img src="img/shopping/16.png" />
                            <div className="txt">
                                <span>支付宝</span>
                                <span>推荐支付宝用户使用</span>
                            </div>
                            <Checkbox 
                                name="paycheck" 
                                onClick={()=>{this.setpayway("alipay")}} 
                                checked={orderinfo.payway=="alipay"}
                                />
                        </div>
                    </div>
                </div>

                <div className="subBtn">
                    <div className="i">
                        实付金额: <span>¥400.00</span>
                    </div>
                    <div className="b" onClick={()=>{this.onClickPay()}}>
                        <span>提交订单</span>
                    </div>

                </div>

            </div>
        );
    }
}

// payload.usecoupon = true;//是否使用优惠券
// payload.usepoint = true;//是否使用积分
// payload.usebalance = true;//是否使用余额

let mapStateToProps = ({shop,app,shoporder,order,userlogin:{balance,point}},props) => {
    let orderinfo = shoporder.orders[props.match.params.id];
    //获取当前订单地址
    let orderAddressInfo = order.orderAddressInfo;
    //积分抵扣金额
    if(orderinfo.usepoint && point>0){
        let pointvsmoney = app.pointvsmoney;
        orderinfo.pointprice = point * pointvsmoney * .01;
    }
    //设置余额抵扣
    if(orderinfo.usebalance && balance>0){
        orderinfo.balanceprice = balance;
    }
    //设置优惠券抵扣
    if(orderinfo.usecoupon){
        let couponlist = shoporder.couponlist;
        if(_.isEmpty(couponlist)){
            _.map(couponlist, (coupon,couponid)=>{
                if(orderinfo.couponid==''&& orderinfo.orderPrice >= coupon.pricecondition){
                    orderinfo.couponid = couponid;
                    orderinfo.couponprice = coupon.pricediscount;
                }
            })
        }
    }
    return { orderinfo:{...orderinfo}, orderAddressInfo};
}

Page = connect(mapStateToProps)(Page);
export default Page;

