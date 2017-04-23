import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/myorder.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import InfinitePage from '../controls/infinitecontrol';
import { 
    myordergetall,
    myorderupdateone
} from '../../actions/sagacallback.js';
import {
    myOrderList_filler_set,
    myorderlist_addreducers,
    myorderdelone_request,
    uiinfinitepage_updateitem
} from '../../actions';

export class Page extends React.Component {

    constructor(props, context) {
        super(props, context);
        //筛选列表
        this.actionItem = ["全部","未支付","待发货","待收货","已完成"];
    }

    //设置列表筛选条件
    handleItemClick = (status) => {
        this.props.dispatch(myOrderList_filler_set(status));
    };

    //返回
    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    //取消订单
    delorder = (_id)=>{
        if(confirm("去定要删除订单吗?")){
            let payload = {
                _id: _id,
                data:{
                    orderstatus:'已取消'
                }
            };
            this.props.dispatch(myorderupdateone(payload)).then(({updateditem})=>{
                this.props.dispatch(uiinfinitepage_updateitem(updateditem));
            });
        }
    }

    updateContent = (items)=> {
        return  (
            <div className="items" key={items._id}>
                <div className="tt">
                    <span>订单号:{items._id}</span>
                    <span>{items.orderstatus}</span>
                </div>
                <div className="cont" onClick={()=>{this.payorder(items)}}>
                    {
                        _.map(items.productsdetail, (pro,index)=>{
                            let proinfo = this.props.products[pro.productid];
                            return (
                                <div className="li" key={index}>
                                    <img src={proinfo.picurl} />
                                    <div className="proinfo">
                                        <div className="proname">{proinfo.name}</div>
                                        <div className="proother">
                                            <span className="price">￥{pro.price}</span>
                                            <span className="num">X{pro.number}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="lnk">
                    <div className='txt'>
                        合计：￥{items.orderprice} (含运费)
                    </div>
                    {items.orderstatus=="未支付"?(
                        <div className='hotlnk'>
                            <span className="btn del" onClick={()=>{this.delorder(items._id)}}>取消订单</span>
                            <span className="btn pay" onClick={()=>{this.payorder(items)}}>立刻支付</span>
                        </div>
                    ):""}
                    {items.orderstatus=="待发货"?(
                        <div className='hotlnk' onClick={()=>{this.payorder(items)}}>
                            订单已支付, 查看详情
                        </div>
                    ):""}
                    {items.orderstatus=="待收货"?(
                        <div className='hotlnk' onClick={()=>{this.payorder(items)}}>
                            商家已发货, 查看详情
                        </div>
                    ):""}
                    {items.orderstatus=="已完成"?(
                        <div className='hotlnk' onClick={()=>{this.payorder(items)}}>
                            订单已完成, 查看详情
                        </div>
                    ):""}
                </div>
            </div>
        );
    };

    //点击支付订单
    payorder =(order)=>{
        let payload = {};
        payload[order._id] = order;
        this.props.dispatch(myorderlist_addreducers(payload));
        this.props.history.push(`/payend/${order._id}`);
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

let mapStateToProps = ({shop,order}) => {
    return {...order,...shop};
}

export default connect(mapStateToProps)(Page);




