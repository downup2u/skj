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
    myordergetall
} from '../../actions/sagacallback.js';

export class Page extends Component {

    constructor(props, context) {
        super(props, context);
        this.orderinfo = {};
    }

    //获取订单详情
    // __v:0
    // payway:"alipay"
    // realprice:1498
    // orderprice:1498
    // orderstatus:"未支付"
    // provincename:"江苏省"
    // cityname:"常州市"
    // distinctname:"武进区"
    // address:"天润大厦"
    // couponprice:0
    // orderexpress:0
    // productprice:1498
    // creator:"58e455e7f6de2471258b292d"
    // created_at:"2017-04-14T12:47:35.589Z"
    // _id:"58f0c4e7e1e039036e4193e2"
    //productsdetail []
            // {
            //     productid:"58f075a5c2065a04efdb828b"
            //     number:1
            //     price:1498
            //     _id:"58f0c56ae1e039036e4193e5"
            //     productidinfo:{}

            // }
    // isdeleted:false
    // paystatus:"未支付"
    componentWillMount = ()=> {
        this.orderinfo = this.props.myOrderList[this.props.match.params.id];
    };

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    

    render() {
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
                    <div className="orderaddress">
                        <img src="img/shopping/mark.png" />
                        <div className="addressinfo">
                            <div className="userinfo">
                                <span>收货人:小胖</span>
                                <span>18088888888</span>
                            </div>
                            <div>
                                收货地址: 江苏省 南京市 建邺区 沙洲街道9号
                            </div>
                        </div>
                    </div>
                    <div className="proinfo">
                        {_.map(this.orderinfo.productsdetail,(proinfo,index)=>{
                            return (
                                <div className="li" key={index}>
                                    <img src={proinfo.productidinfo.picurl} />
                                    <div>
                                        <span>{proinfo.productidinfo.name}</span>
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
                            <span>¥{this.orderinfo.orderexpress}</span>
                        </div>
                        <div className="li">
                            <span>使用积分</span>
                            <span>- ¥20.00</span>
                        </div>
                        <div className="li">
                            <span>使用优惠券</span>
                            <span>- ¥4.00</span>
                        </div>
                    </div>

                    <div className="paytype">
                        <div className="li">
                            <img src="img/shopping/15.png" />
                            <div className="txt">
                                <span>微信</span>
                                <span>推荐微信用户使用</span>
                            </div>
                            <Checkbox name="paycheck" />
                        </div>
                        <div className="li">
                            <img src="img/shopping/16.png" />
                            <div className="txt">
                                <span>支付宝</span>
                                <span>推荐支付宝用户使用</span>
                            </div>
                            <Checkbox name="paycheck" />
                        </div>
                    </div>
                </div>

                <div className="subBtn">
                    <div className="i">
                        实付金额: <span>¥400.00</span>
                    </div>
                    <div className="b">
                        <span>提交订单</span>
                    </div>

                </div>

            </div>
        );
    }
}

let mapStateToProps = ({shop,app}) => {
    return {...shop,...app};
}

Page = connect(mapStateToProps)(Page);
export default Page;

