import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/myorder.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import InfinitePage from '../controls/infinitecontrol';
import { 
    myordergetall
} from '../../actions/sagacallback.js';
import {
    myOrderList_filler_set
} from '../../actions';


export class Page extends React.Component {

    constructor(props, context) {
        super(props, context);
        //筛选列表
        this.actionItem = ["全部","待付款","待发货","待收货","已完成","我的退货"];
    }

    //设置列表筛选条件
    handleItemClick = (status) => {
        this.props.dispatch(myOrderList_filler_set(status));
    };

    //返回
    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    //列表数据模版
    updateContent = (items)=> {
        return  (
            <div className="items" key = {items._id}>
                <div className="tt">
                    <span>订单号:{items._id}</span>
                    <span>待付款</span>
                </div>
                <div className="cont">
                    <img src="img/myprofile/16.png" />
                    <div className="proinfo">
                        <div className="proname">这里是产品标题这里是产品标题这里是产品标题这里是产品标题这里是产品标题这里是产品标题</div>
                        <div className="proother">
                            <span className="price">￥199.00</span>
                            <span className="num">X1</span>
                        </div>
                    </div>
                </div>
                <div className="lnk">
                    <div className='txt'>
                        合计：￥199.00 (含运费8.00元)
                    </div>
                    <div className='hotlnk'>
                        <span className="btn del">取消订单</span>
                        <span className="btn pay">立刻支付</span>
                    </div>
                </div>
            </div>
        );
    };

    //获取redux过滤条件
    orderlistfiller = ()=>{
        let filler = {};
        if(this.props.myOrderListFiller!="全部"){
            filler.orderstatus = this.props.myOrderListFiller
        }
        return filler;
    }

    render() {
        let filler = {};
        if(this.props.myOrderListFiller!="全部"){
            filler.orderstatus = this.props.myOrderListFiller
        }

        return (
            <div className="myOrder" style={{height:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="我的订单" onClickLeft={this.onClickReturn}/>
                <div className="actionItem">
                    {_.map(this.actionItem, (status,index)=>{
                        return (
                            <span 
                                key={index}
                                onClick={()=>{this.handleItemClick(status)}} 
                                className={this.props.myOrderListFiller==status?"sel":""}
                                >
                                {status}
                            </span>
                        )
                    })}
                </div>
                <div className="orderList">
                    <InfinitePage
                        pagenumber = {20}
                        updateContent= {this.updateContent} 
                        queryfun= { myordergetall }
                        listheight= { window.innerHeight-98 }
                        sort = {{created_at: -1}}
                        query = {filler}
                    />
                </div>
            </div>
        )
    }
}

let mapStateToProps = ({order}) => {
    return {...order};
}

export default connect(mapStateToProps)(Page);




