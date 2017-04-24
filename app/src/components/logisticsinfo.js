/*
* 订单详情
* */
import React, { Component, PropTypes } from 'react';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import NavBar from './newnav.js';
import '../../public/css/logisticsinfo.css';
import { connect } from 'react-redux';
import { requestUrlGet } from '../util/util';
import _ from 'lodash';
import { expressquery_request } from '../actions';

export class Page extends Component {

    componentWillMount() {
        //获取物流信息
        let option = {
            expresscode: this.props.order.expresscode,
            expressbarid: this.props.order.expressbarid
        }
        this.props.dispatch(expressquery_request(option));
    }

    render() {
        return (
            <div 
                className="logisticsinfoPage"
                style={{height:window.innerHeight+"px"}}
                >
                <NavBar back={true} title="查看物流" />
                <div className="content">
                    <div className="proinfo">
                        <div className="li">
                            <div>
                                <span>物流编号: 70328806203816</span>
                                <span>商品名称: {this.props.order.ordertitle}</span>
                            </div>
                        </div>

                    </div>
                    <div className="listContent">
                        <div className="list">
                            <div className="tit">
                                <span>物流详情</span>
                            </div>
                            {_.map(this.props.info.data, (data, index)=>{
                                let style = index==0?"li nowli":"li";
                                return (
                                    <div 
                                        className={style}
                                        key={index}
                                        >
                                        <span>{data.context}</span>
                                        <span>{data.time}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const data = ({logisticsinfo, app}) => {
    return { ...logisticsinfo, ...app };
}

Page = connect(data)(Page);
export default Page;
