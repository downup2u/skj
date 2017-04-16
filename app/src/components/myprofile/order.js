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
        this.actionItem = ["全部","未支付","待发货","待收货","已完成","我的退货"];
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

//  列表数据模版
//     {
//     "_id": "58f0cec4e1e039036e4193f4",
//     "payway": "alipay",
//     "realprice": 1498,
//     "orderprice": 1498,
//     "orderstatus": "未支付",
//     "provincename": "江苏省",
//     "cityname": "常州市",
//     "distinctname": "武进区",
//     "address": "天润大厦",
//     "couponprice": 0,
//     "productprice": 1498,
//     "creator": "58e455e7f6de2471258b292d",
//     "created_at": "2017-04-14T13:29:40.601Z",
//     "__v": 0,
//     "productsdetail": [
//         {
//             "productid": "58f075a5c2065a04efdb828b",
//             "number": 1,
//             "price": 1498,
//             "_id": "58f0cec4e1e039036e4193f5"
//         }
//     ],
//     "isdeleted": false,
//     "paystatus": "未支付"
// }
    updateContent = (items)=> {
        return  (
            <div className="items" key={items._id}>
                <div className="tt">
                    <span>订单号:{items._id}</span>
                    <span>{items.orderstatus}</span>
                </div>
                <div className="cont">
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
                        合计：￥{items.realprice} (含运费)
                    </div>
                    <div className='hotlnk'>
                        <span className="btn del" onClick={()=>{this.delorder(items._id)}}>取消订单</span>
                        <span className="btn pay" onClick={()=>{this.payorder(items)}}>立刻支付</span>
                    </div>
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




