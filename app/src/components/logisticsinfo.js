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
import { updata_logisticsinfo_logisticsinfo } from '../actions';

export class Page extends Component {

    componentWillMount() {
        //获取物流信息
        //requestUrlGet
        let apihost = this.props.expressapiurl;
        let customer = this.props.expressapicustomer;
        let key = this.props.expressapikey;
        let nu = "70328806203816";
        let com = "huitongkuaidi";
        let url = `${apihost}?id=${key}&com=${com}&nu=${nu}&valicode=&show=0&muti=&order=desc`;
        //

        let info = {
            "message":"ok",
            "status":"1",
            "state":"3",
            "data":[
                {"time":"2012-07-07 13:35:14","context":"客户已签收"},
                {"time":"2012-07-07 09:10:10","context":"离开[北京石景山营业厅]派送中，递送员[温]，电话[]"},
                {"time":"2012-07-06 19:46:38","context":"到达[北京石景山营业厅]"},
                {"time":"2012-07-06 15:22:32","context":"离开[北京石景山营业厅]派送中，递送员[温]，电话[]"},
                {"time":"2012-07-06 15:05:00","context":"到达[北京石景山营业厅]"},
                {"time":"2012-07-06 13:37:52","context":"离开[北京_同城中转站]发往[北京石景山营业厅]"},
                {"time":"2012-07-06 12:54:41","context":"到达[北京_同城中转站]"},
                {"time":"2012-07-06 11:11:03","context":"离开[北京运转中心驻站班组] 发往[北京_同城中转站]"},
                {"time":"2012-07-06 10:43:21","context":"到达[北京运转中心驻站班组]"},
                {"time":"2012-07-05 21:18:53","context":"离开[福建_厦门支公司] 发往 [北京运转中心_航空]"},
                {"time":"2012-07-05 20:07:27","context":"已取件，到达 [福建_厦门支公司]"}
            ]
        }
        this.props.dispatch(updata_logisticsinfo_logisticsinfo({info}));
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
                                <span>物流名称: 百世汇通</span>
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
                                    <div className={style}>
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
