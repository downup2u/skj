import React, { Component } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/distribution.css';
import _ from 'lodash';
import {
    getdistsalesorderdetails,
} from '../../actions/sagacallback.js';
import { connect } from 'react-redux';
import moment from 'moment';

export class Page extends Component {

    componentWillMount () {
        this.getorderlist();
    }

    //获取该用户的订单数据
    getorderlist =()=>{
        let payload = {
            query: {
                srctype : "order",
                fromuser : this.props.match.params.id
            },
            options: {
                page: 1,
                limit: 10000,
            }
        }
        this.props.dispatch(getdistsalesorderdetails(payload));
    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        //nextuserorderspage orderlist orderprice feebonus
    // nextuserorderspage : {
    //         orderlist : [],
    //         orderprice : 0,
    //         feebonus : 0
    //     }

    // created_at:"2017-04-18T06:35:12.420Z"
    // creator:"58f078f3c2065a04efdb828d"
    // feebonus:14.9945
    // feenew:14.99
    // feeold:0
    // fromorder:"58f5b39d65382846474dcb83"
    // fromuser:"58f07ba0c2065a04efdb8293"
    // levelflag:2
    // orderprice:299.89
    // srctype:"order"
    // __v:0
    // _id:"58f5b3a065382846474dcb86"
        return (
            <div className="distributionInfoPage"
                 style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll"
                 }}
                >
                <NavBar lefttitle="返回" title="分销单详情" onClickLeft={this.onClickReturn}/>

                <div className="list">
                    <div className="li">
                        <span>消费总金额</span>
                        <span>¥{this.props.nextuserorderspage.orderprice}</span>
                    </div>
                    <div className="li">
                        <span>收益总金额</span>
                        <span className="price">＋ ¥{this.props.nextuserorderspage.feebonus}</span>
                    </div>
                </div>

                <div className="proinfo">

                    {_.map(this.props.nextuserorderspage.orderlist, (order, index)=>{
                        return (
                            // orderprice feebonus
                            <div className="li">
                                <div>
                                    <span>订单编号: {order.fromorder}</span>
                                    <div>
                                         <span className="time">
                                            <span>¥{order.orderprice}</span>
                                            <span>{moment(order.created_at).format("MM月DD日 HH时mm分")}</span>
                                        </span>
                                        <span className="price">
                                            <span>＋ ¥{order.feebonus}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>
        );
    }
}


const mapStateToProps =  ({userlogin,nextusers}) =>{
    return {...userlogin, ...nextusers};
};

export default connect(
    mapStateToProps
)(Page);

