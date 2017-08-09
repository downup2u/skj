/*
 * 选择收货地址
 * */
import React, { Component } from 'react';
import NavBar from '../newnav.js';
import { connect } from 'react-redux';
import {
    getaddresslist_request,
    set_orderSurePage
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

    pagePush = (name)=> {
        this.props.history.push(name);
    }

    onClickItem =(address)=>{
        let orderAddressInfo = {orderAddressInfo : address}
        this.props.dispatch(set_orderSurePage(orderAddressInfo));
        this.props.history.goBack();
    }

    getItems =(address,index)=>{
        return (
            <div className="li" key={index} onClick={()=>{this.onClickItem(address)}}>
                <div className="tit">
                    <span>{address.truename}</span>
                    <span>{address.phonenumber}</span>
                </div>
                {
                  !!address.seladdr && (
                    <div className="address">
                        <span>{address.seladdr.selprovice.value}</span>
                        <span>{address.seladdr.selcity.value}</span>
                        <span>{address.seladdr.seldistict.value}</span>
                        <span>{address.addressname}</span>
                    </div>
                  )
                }

            </div>
        )
    }

    render() {
        const { addresslist, orderAddressId} = this.props
        return (
            <div className="seladdressPage" style={{height:window.innerHeight+"px"}}>
                <NavBar
                    back={true}
                    title="选择收货地址"
                />
                <div className="listcont">
                    {
                        _.map(addresslist, (address, index)=>{
                            return this.getItems(address, index);
                        })
                    }
                </div>
                <div className="addAddressLnk" onClick={()=>{this.pagePush("/newaddress")}}>＋ 添加地址</div>
            </div>
        );
    }

};
const mapStateToProps = ({address,order}) => {
    let addressArray = {...address};
    let addresslist = addressArray.addresslist;
    return { addresslist, order };
};
Page = connect(mapStateToProps)(Page);
export default Page;
