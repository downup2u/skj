/*
 * 选择收货地址
 * */
import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { connect } from 'react-redux';
import {
    getaddresslist_request,
    set_orderSurePage,
    updata_orderinfo
} from '../../actions/index.js';
import _ from 'lodash';
import '../../../public/css/seladdress.css';

export class Page extends React.Component {

    componentWillMount() {
        let payload = {
            query: {},
            options: {
                page: 1,
                limit: 1000,
            }
        };
        this.props.dispatch(getaddresslist_request(payload));
    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    }

    onClickItem =(address)=>{
        let orderinfo = this.props.orderinfo;
        orderinfo.orderaddress = address;
        this.props.dispatch(updata_orderinfo(orderinfo));
        this.props.history.goBack();
    }

    render() {
        const {addresslist} = this.props
        return (
            <div className="seladdressPage" style={{height:window.innerHeight+"px"}}>
                <NavBar lefttitle="返回" title="选择收获地址" onClickLeft={this.onClickReturn}/>
                <div className="listcont">
                    {_.map(addresslist, (address, index)=>{
                        return (
                            <div className="li" key={index} onClick={()=>{this.onClickItem(address)}}>
                                <div className="tit">
                                    <span>{address.truename}</span>
                                    <span>{address.phonenumber}</span>
                                </div>
                                <div className="address">
                                    <span>{address.seladdr.selprovice.value}</span>
                                    <span>{address.seladdr.selcity.value}</span>
                                    <span>{address.seladdr.seldistict.value}</span>
                                    <span>{address.addressname}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

};
const mapStateToProps = ({address,order,shoporder},props) => {
    let data = {
        //我的收货地址列表
        addresslist : address.addresslist,
    }
    //获取订单数据
    let orderinfo = shoporder.orders[props.match.params.id];

    return { ...data, order, orderinfo};
};
Page = connect(mapStateToProps)(Page);
export default Page;


