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
    mycoupongetall,
    myorderupdateone
} from '../../actions/sagacallback.js';
import {
    payway_set,
    updata_orderinfo,
    updata_orderpaydata
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
        let payway = orderinfo.payway;
        orderinfo.realprice = parseInt(this.props.payprice);

        let payload = {
            _id:orderinfo._id,
            data:{...orderinfo}
        };

        dispatch(myorderupdateone(payload)).then((result)=>{
            onclickpay({orderinfo, payway, dispatch},(result)=>{
                //console.log(`获得数据：${result}`);
            });
        });

    };
    //设置支付方式
    setpayway =(paytype)=>{
        let orderinfo = this.props.orderinfo;
        orderinfo.payway = paytype;
        this.props.dispatch(updata_orderinfo(orderinfo));
    };

    //设置是否使用优惠
    updataUse =(type)=>{
        let payprice = this.props.payprice;
        let paystatus = this.props.paystatus;
        paystatus[type] = !paystatus[type];

        //选择余额支付
        if(type=="usebalance"){
            if(paystatus[type]){
                this.setpayway("leftbalance");
            }else{
                this.setpayway("alipay");
            }
        }
        this.props.dispatch(updata_orderpaydata(paystatus));
    }

    render() {
        const {orderinfo, payprice, newbalance, newpoint, paystatus, balance, point} = this.props;
        return (
            <div>
                {orderinfo.paystatus=="未支付"?(
                    <div 
                        className="PayPage"
                        style={{height:(window.innerHeight)+"px"}}
                        >
                        <div className="PageHead">
                            <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                            <span className="title">支付订单</span>
                        </div>
                        <div className="PayPageBody">
                            <div className="orderaddress" onClick={()=>{this.onClickPage(`/orderseladdress/${orderinfo._id}`)}}>
                                <img src="img/shopping/mark.png" />
                                <div className="addressinfo">
                                    <div>
                                        <div className="userinfo">
                                            <span>收货人:{orderinfo.orderaddress.truename}</span>
                                            <span>{orderinfo.orderaddress.phonenumber}</span>
                                        </div>
                                        <div>
                                            收货地址:
                                            {orderinfo.orderaddress.seladdr.selprovice.value}
                                            {orderinfo.orderaddress.seladdr.selcity.value}
                                            {orderinfo.orderaddress.seladdr.seldistict.value}
                                            {orderinfo.orderaddress.addressname}
                                        </div>
                                    </div>
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
                                    <span>{orderinfo.expressprice==0?'免运费':`¥${orderinfo.expressprice}`}</span>
                                </div>
                                <div className="li">
                                    <span>使用积分({point})</span>
                                    <div className="setpaycoupon">
                                        <span>{orderinfo.pointprice==0?'':`- ¥${orderinfo.pointprice}`}</span>
                                        <Checkbox toggle checked={paystatus.usepoint} onClick={()=>{this.updataUse("usepoint")}}/>
                                    </div>
                                </div>
                                <div className="li selcoupon" onClick={()=>{this.onClickPage(`/selcoupon/${orderinfo._id}`)}}>
                                    <span>使用优惠券</span>
                                    <span>{orderinfo.couponprice==0?'':`- ¥${orderinfo.couponprice}`}</span>
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
                                        onClick={()=>{this.setpayway("alipay")}} 
                                        checked={orderinfo.payway=="alipay"}
                                        />
                                </div>
                                <div className="li">
                                    <img src="img/shopping/17.png" />
                                    <div className="txt">
                                        <span>余额支付</span>
                                        <span>账户余额:¥{balance}</span>
                                    </div>
                                    <span className="showbalanceprice">{orderinfo.balanceprice==0?'':`- ¥${orderinfo.balanceprice}`}</span>
                                    <Checkbox 
                                        onClick={()=>{this.setpayway("leftbalance")}} 
                                        checked={orderinfo.payway=="leftbalance"}
                                        />
                                </div>
                            </div>
                        </div>
                        <div className="subBtn">
                            <div className="i">
                                实付金额: <span>¥{payprice}</span>
                            </div>
                            <div className="b" onClick={()=>{this.onClickPay()}}>
                                <span>提交订单</span>
                            </div>

                        </div>

                    </div>
                ):(
                    <div 
                        className="PayPage"
                        style={{height:(window.innerHeight)+"px"}}
                        >
                        <div className="PageHead">
                            <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                            <span className="title">订单详情</span>
                        </div>
                        <div className="orderinfoPage">
                            <div className="orderaddress" onClick={()=>{this.onClickPage(`/orderseladdress/${orderinfo._id}`)}}>
                                <img src="img/shopping/mark.png" />
                                <div className="addressinfo">
                                    <div>
                                        <div className="userinfo">
                                            <span>收货人:{orderinfo.orderaddress.truename}</span>
                                            <span>{orderinfo.orderaddress.phonenumber}</span>
                                        </div>
                                        <div>
                                            收货地址:
                                            {orderinfo.orderaddress.seladdr.selprovice.value}
                                            {orderinfo.orderaddress.seladdr.selcity.value}
                                            {orderinfo.orderaddress.seladdr.seldistict.value}
                                            {orderinfo.orderaddress.addressname}
                                        </div>
                                    </div>
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
                                    <span>{orderinfo.expressprice==0?'免运费':`¥${orderinfo.expressprice}`}</span>
                                </div>
                                <div className="li">
                                    <span>使用积分({point})</span>
                                    <span>{orderinfo.pointprice==0?'未使用':`${orderinfo.point}分抵扣${orderinfo.pointprice}`}</span>
                                </div>
                                <div className="li">
                                    <span>使用优惠券</span>
                                    <span>{orderinfo.couponprice==0?'未使用':`抵扣¥${orderinfo.couponprice}`}</span>
                                </div>
                                <div className="li">
                                    <span>订单金额</span>
                                    <span>¥{orderinfo.orderprice}</span>
                                </div>
                                <div className="li">
                                    <span>支付方式</span>
                                    <span>
                                        {orderinfo.payway=="weixin"?"微信":''}
                                        {orderinfo.payway=="alipay"?"支付宝":''}
                                        {orderinfo.payway=="leftbalance"?"余额支付":''}
                                    </span>
                                </div>
                            </div>
                            <div className="list">
                                <div className="li">
                                    <span>订单状态</span>
                                    <div className="orderstatusinfo">
                                        <div>{orderinfo.orderstatus}</div>
                                        {orderinfo.orderstatus=="待收货"?(
                                            <div>
                                                查看物流详情
                                            </div>
                                        ):""}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        );
    }
}

let mapStateToProps = ({shop,app,shoporder,userlogin:{balance,point,defaultaddress},paystatus},props) => {
    let orderinfo = shoporder.orders[props.match.params.id];
    if(orderinfo.paystatus=="已支付"){
        return { orderinfo:{...orderinfo}};
    }
    if(orderinfo.paystatus=="未支付"){
        if(!orderinfo.hasOwnProperty("couponid")){
            orderinfo = {...orderinfo, couponid: ''};
        }
        //最终支付金额
        let payprice = orderinfo.orderprice;
        //扣除优惠券
        payprice -=  orderinfo.couponprice;
        //初始化抵扣金额
        orderinfo.balanceprice = 0;
        orderinfo.pointprice = 0;
        //使用的积分
        let point_used = 0;
        //积分抵扣金额
        if(paystatus.usepoint && point>0 && payprice>0){
            let pointvsmoney = app.pointvsmoney;
            let pointprice = point * pointvsmoney * .01;
            orderinfo.pointprice = pointprice<=payprice?pointprice:payprice;
            point_used =  (orderinfo.pointprice * 100) / pointvsmoney;
            payprice -= orderinfo.pointprice;
        }
        //判断是否可以余额支付
        let balancePay = (balance>=payprice);
        //设置余额抵扣
        if(balancePay){
            if(orderinfo.payway=="leftbalance" && balance>0 && payprice>0){
                orderinfo.balanceprice = balance<=payprice?balance:payprice;
                payprice -= orderinfo.balanceprice;
            }
        }
        //设置支付方式
        if(payprice==0){
            orderinfo.payway="leftbalance";
        }else{
            if(orderinfo.payway=='' || (orderinfo.payway=="leftbalance") ){
                orderinfo.payway = "alipay";
            }
        }
        let newbalance = balance - orderinfo.balanceprice;
        let newpoint = point - point_used;
        //修改订单积分抵扣数
        orderinfo.point = point_used;
        return { orderinfo:{...orderinfo}, payprice, newbalance, newpoint, balance, point, paystatus };
    }
}

Page = connect(mapStateToProps)(Page);
export default Page;

