import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/mycoupon.css';
import {
    mycoupongetall
} from '../../actions/sagacallback.js';
import { 
    setulcoupontype,
    updata_orderinfo
} from '../../actions';
import { connect } from 'react-redux';
import InfinitePage from '../controls/infinitecontrol';
import moment from 'moment';

export class Page extends Component {

    onClickReturn =()=>{
        this.props.history.goBack();
    };

    updataOrderCoupon =(usestatus, coupon)=>{
        let orderinfo = this.props.orderinfo;
        if(usestatus){
            orderinfo.couponid = coupon._id;
            orderinfo.couponprice = coupon.pricediscount;
        }
        orderinfo.usecoupon = usestatus;
        this.props.dispatch(updata_orderinfo(orderinfo));
        this.props.history.goBack();
    };

    updateContent = (item)=> {
        const {orderinfo} = this.props;
        let classname = orderinfo.orderprice>=item.pricecondition?"item":"item noitem";
        let sel = orderinfo.couponid==item._id?" sel":"";
        classname += sel; 
        return  (
            <div 
                className={classname}
                key = {item._id}
                onClick={()=>{this.updataOrderCoupon(true, item)}}
                >
                <div className="leftcont">
                    <span><span>{item.pricediscount}</span>元</span>
                    <span>{item.name}</span>
                </div>
                <div className="cont">
                    <div>
                        <span className="tt">{item.pricecondition}</span>
                        <span>
                            有效期
                            {moment(item.created_at).format("YY-MM-DD")}
                            至
                            {moment(item.expdate).format("YY-MM-DD")}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="myCouponPage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="选择优惠券" onClickLeft={this.onClickReturn} />
                <div className="myCouponList" style={{height:window.innerHeight-88}}>
                    <InfinitePage
                        pagenumber = { 100 }
                        updateContent= { this.updateContent }
                        queryfun= {mycoupongetall}
                        listheight= {window.innerHeight-88}
                        sort = {{pricecondition : 1}}
                        query = {{usestatus : "未使用"}}
                    />
                </div>
                <div className="selcouponBtn" onClick={()=>{this.updataOrderCoupon(false)}}>不使用优惠券</div>
            </div>
        )
    }
}
let mapStateToProps = ({shoporder},props) => {
    let orderinfo = shoporder.orders[props.match.params.id];
    return {orderinfo};
}
Page = connect(mapStateToProps)(Page);
export default Page;

