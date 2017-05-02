import React, { Component, PropTypes } from 'react';
import NavBar from '../newnav.js';
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
    uiinfinitepage_updateitem,
    updata_logisticsinfo_logisticsinfo,
    set_weui,
    evaluation_data
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

    //取消订单
    delorder = (e, _id)=>{
        this.stopDefault(e);
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
    };

    //取消冒泡事件
    stopDefault =(e)=>{
        e.stopPropagation();
    };

    //点击查看物流详情
    getLogisticsinfo =(e, order)=>{
        this.stopDefault(e);
        this.props.dispatch(updata_logisticsinfo_logisticsinfo({order}));
        this.props.history.push('/logisticsinfo');
    };

    //添加评论
    addEvaluation=(e, orderid, productid)=>{
        this.stopDefault(e);
        let data = {
            orderid : orderid,
            productid : productid
        }
        this.props.dispatch(evaluation_data(data));
        this.props.history.push('/orderevaluation');
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
                                            {
                                                pro.hasOwnProperty("isevaluation")&&!pro.isevaluation?(
                                                    <span 
                                                        className="evaluationLnk"
                                                        onClick={(e)=>{this.addEvaluation(e, items._id, pro.productid)}}
                                                        >
                                                        立刻评价
                                                    </span>
                                                ):""
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="lnk" onClick={()=>{this.payorder(items)}}>
                    <div className='txt'>
                        合计：￥{items.orderprice} (含运费)
                    </div>
                    {items.orderstatus=="未支付"?(
                        <div className='hotlnk'>
                            <span className="btn del" onClick={(e)=>{this.delorder(e, items._id)}}>取消订单</span>
                            <span className="btn pay">立刻支付</span>
                        </div>
                    ):""}
                    {items.orderstatus=="待发货"?(
                        <div className='hotlnk'>
                            <span>订单已支付, 等待商家发货</span>
                        </div>
                    ):""}
                    {items.orderstatus=="待收货"?(
                        <div className='hotlnk'>
                            <span>商家已发货,</span>
                            <span className="btn success" onClick={(e)=>{this.endOrder(e, items)}}>确认收货</span>
                            <span className="btn" onClick={(e)=>{this.getLogisticsinfo(e, items)}}>查看物流</span>
                        </div>
                    ):""}
                    {items.orderstatus=="已完成"?(
                        <div className='hotlnk'>
                            <span>订单已完成, 查看详情</span>
                        </div>
                    ):""}
                </div>
            </div>
        );
    };

    

    //确认收货
    endOrder =(e, order)=>{
        let _id = order._id;
        this.stopDefault(e);
        this.props.dispatch(
            set_weui({
                confirm:{
                    show : true,
                    title : "确认收货",
                    text : "请仔细核对收货情况后再确定",
                    //
                    buttonsClose : ()=>{},
                    //确认收货
                    buttonsClick : ()=>{
                        //修改订单下的产品评论情况
                        let newproductsdetail = [];
                        _.map(order.productsdetail, (product, index)=>{
                            let newproduct = product;
                            newproduct["isevaluation"] = false;
                            newproductsdetail.push(newproduct);
                        })
                        let payload = {
                            _id: _id,
                            data:{
                                orderstatus : '已完成',
                                productsdetail : newproductsdetail
                            }
                        };
                        this.props.dispatch(myorderupdateone(payload)).then(({updateditem})=>{
                            this.props.dispatch(uiinfinitepage_updateitem(updateditem));
                            this.handleItemClick(updateditem.orderstatus);
                        });
                    }
                }}
            )
        )
        
    };

    //点击支付订单
    payorder =(order)=>{
        let payload = {};
        payload[order._id] = order;
        this.props.dispatch(myorderlist_addreducers(payload));
        this.props.history.push(`/payend/${order._id}`);
    };

    render() {
        let filler = {};
        if(this.props.myOrderListFiller!="全部"){
            filler.orderstatus = this.props.myOrderListFiller
        }

        return (
            <div className="myOrder" style={{height:(window.innerHeight)+"px"}}>
                <NavBar back={true} title="我的订单" />
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
                        listheight= { window.innerHeight-108 }
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




