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
        let payway = this.props.payway;//注意：这里是undefined!!!!!!!!!!

        let payload = {
            _id:orderinfo._id,
            data:{...orderinfo}
        };

        dispatch(myorderupdateone(payload)).then((result)=>{
            //{"updateditem":{"_id":"58ed8391d3f83a025b8067b9","payway":"alipay"
            console.log("myorderupdateone result=>" + JSON.stringify(result));
            onclickpay({orderinfo,payway,dispatch},(result)=>{
                console.log(`获得数据：${result}`);
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

        if(type=="usebalance"){}
        if(type=="usebalance"){}
        if(type=="usepoint"){}

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
        const {orderinfo, orderAddressInfo, payprice, newbalance, newpoint, paystatus,balance,point} = this.props;
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
        );
    }
}

// payload.usecoupon = true;//是否使用优惠券
// payload.usepoint = true;//是否使用积分
// payload.usebalance = true;//是否使用余额

let mapStateToProps = ({shop,app,shoporder,order,userlogin:{balance,point,defaultaddress},paystatus},props) => {
    let orderinfo = shoporder.orders[props.match.params.id];
    if(!orderinfo.hasOwnProperty("couponid")){
        orderinfo = {...orderinfo, couponid: ''};
    }
    
    //获取当前订单地址
    let orderAddressInfo = order.orderAddressInfo;
    if(_.isEmpty(orderAddressInfo)){
        orderAddressInfo = defaultaddress;
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

    //设置支付方式
    if(payprice==0){
        orderinfo.payway="leftbalance";
    }else{
        if(orderinfo.payway==''||orderinfo.payway=="leftbalance"){
            orderinfo.payway = "alipay";
        }
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

    let newbalance = balance - orderinfo.balanceprice;
    let newpoint = point - point_used;
    
    //修改订单积分抵扣数
    orderinfo.point = point_used;


    return { orderinfo:{...orderinfo}, orderAddressInfo, payprice, newbalance, newpoint, balance, point, paystatus };
}

Page = connect(mapStateToProps)(Page);
export default Page;

