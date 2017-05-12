import React, { Component } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/ordertotal.css';
import { connect } from 'react-redux';

export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
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
                            <span className="li">
                                <span>订单总额</span>
                                <span>{this.props.nextnumbers.level1_totalorderprices+this.props.nextnumbers.level2_totalorderprices}</span>
                            </span>
                            <span className="li"><span>累计收益</span><span>¥ {this.props.nextnumbers.level1_totalfeebonus+this.props.nextnumbers.level2_totalfeebonus}元</span></span>
                        </div>
                    </div>
                </div>
                <div className="orderTotalPageContent">
                    <div className="item">
                        <span className="tit">一级分销</span>
                        <div className="cont">
                            <span className="li"><span>订单总额</span><span>{this.props.nextnumbers.level1_totalorderprices}</span></span>
                            <span className="li"><span>累计收益</span><span>¥ {this.props.nextnumbers.level1_totalfeebonus}元</span></span>
                        </div>
                    </div>
                </div>
                <div className="orderTotalPageContent">
                    <div className="item">
                        <span className="tit">二级分销</span>
                        <div className="cont">
                            <span className="li"><span>订单总额</span><span>{this.props.nextnumbers.level2_totalorderprices}</span></span>
                            <span className="li"><span>累计收益</span><span>¥ {this.props.nextnumbers.level2_totalfeebonus}元</span></span>
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


