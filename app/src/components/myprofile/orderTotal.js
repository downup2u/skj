import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/ordertotal.css';
import { connect } from 'react-redux';
import {
    getdistsalesorderstat_request
} from '../../actions';

export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    componentWillMount () {
        //获取下线代理数
        this.getnextuserstotal();
    };

    //获取我的分销统计
    getnextuserstotal =()=>{
        this.props.dispatch(getdistsalesorderstat_request({}));
    };

    render() {
        return (
            <div className="orderTotalPage"
                style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll",
                    backgroundColor:"#EEE"
                }}>
                <NavBar lefttitle="返回" title="订单统计" onClickLeft={this.onClickReturn} />
                <div className="orderTotalPageContent">
                    <div className="item">
                        <span className="tit">我的订单</span>
                        <div className="cont">
                            <span className="li"><span>订单数量</span><span>122</span></span>
                            <span className="li"><span>累计收益</span><span>¥ 47394.0元</span></span>
                        </div>
                    </div>
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


