/*
    积分明细
*/
import React, { Component } from 'react';
import NavBar from '../newnav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/myprofit.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {
    integral_set_listtype
} from '../../actions';
import {
    getuserpointdetails
} from '../../actions/sagacallback.js';


export class Page extends Component {

    componentWillMount () {
        //order'来自订单,'withdrawcash'来自提现
        this.menu = {0:"全部",1:"获得明细",2:"消费明细"};
        this.query = {
            0: {},
            1: {pointbonus:{ $gt: 0 }},
            2: {pointbonus:{ $lt: 0 }},
        }
        //获取收益列表
        let listQuery = this.query[this.props.type];
        this.getIntegralList(listQuery);
    };

    getIntegralList =(query)=>{
        let payload = {
            query: query,
            options:{
                page: 1,
                limit: 10000,
            }
        };
        this.props.dispatch(getuserpointdetails(payload))
    };

    handleItemClick = (index) => { 
        this.props.dispatch(integral_set_listtype(index));
        this.getIntegralList(this.query[index])
    };

    onClickReturn =()=>{
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        return (
            <div className="myProfitPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll"
             }}>
                <NavBar back={true} title="积分明细" />
                <div className="headCont">
                    <div className="info integralInfo">
                        <span className="profittit">总积分</span>
                        <span className="number integralNumber">{this.props.point}</span>
                        <img src="img/myprofile/18.png" className="integralNumberBg" />
                    </div>
                </div>
                <Menu pointing secondary>
                    {_.map(this.menu,(menu,index)=>{
                        return (
                            <div key={index}>
                                <Menu.Item name={menu} active={this.props.type==index} onClick={()=>{this.handleItemClick(index)}}/>
                            </div>
                        )
                    })}
                </Menu>
                <div className="cont">
                    <div className={this.props.list.length>0?"tt":"tt hide"}>
                        <span>日期</span><span>积分</span>
                    </div>
                    <div className={this.props.list.length>0?"t2 hide":"t2"}>
                        - 暂无数据 -
                    </div>
                    <div className='ll'>
                        
                        {_.map(this.props.list, (integral, index)=>{
                            return (
                                <div className="l" key={index}>
                                    <div className="i">
                                        <span className="code">
                                            {integral.reason}
                                        </span>
                                        <span className="date"><span>{moment(integral.created_at).format("MM月DD日 HH时mm分")}</span></span>
                                    </div>
                                    <div className="p">
                                        <span>{integral.pointbonus>0?("+"+integral.pointbonus):("-"+integral.pointbonus*-1)}</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps =  ({userlogin,integral}) =>{
    return {...userlogin, ...integral};
};
export default connect(mapStateToProps)(Page);
