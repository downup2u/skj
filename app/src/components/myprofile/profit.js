import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/myprofit.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {
    profit_set_listtype
} from '../../actions';
import {
    getdistsalesorderdetails
} from '../../actions/sagacallback.js';


export class Page extends Component {

    componentWillMount () {
        //order'来自订单,'withdrawcash'来自提现
        this.menu = {"":"全部","order":"获得明细","withdrawcash":"提现明细"};
        //获取收益列表
        let query = this.props.set_listtype==''?{}:{srctype: this.props.set_listtype};
        this.getprofitlist(query)
    };

    getprofitlist =(query)=>{
        let payload = {
            query: query,
            options:{
                page: 1,
                limit: 10000,
            }
        };
        this.props.dispatch(getdistsalesorderdetails(payload))
    };

    handleItemClick = (index) => { 
        this.props.dispatch(profit_set_listtype(index));
        let query = index==''?{}:{srctype: index};
        this.getprofitlist(query)
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
                <NavBar lefttitle="返回" title="我的收益" onClickLeft={this.onClickReturn} />
                <div className="headCont">
                    <div className="info">
                        <span className="profittit">我的收益(元)</span>
                        <span className="number">¥ {this.props.balance}元</span>
                    </div>
                    <div className="tixian"><span onClick={()=>{this.onClickPage('/tixian')}}>提现</span></div>
                </div>
                <Menu pointing secondary>
                    {_.map(this.menu,(menu,index)=>{
                        return (
                            <div key={index}>
                                <Menu.Item name={menu} active={this.props.set_listtype==index} onClick={()=>{this.handleItemClick(index)}}/>
                            </div>
                        )
                    })}
                </Menu>
                <div className="cont">
                    <div className={this.props.profitlist.length>0?"tt":"tt hide"}>
                        <span>日期</span><span>金额</span>
                    </div>
                    <div className={this.props.profitlist.length>0?"t2 hide":"t2"}>
                        - 暂无数据 -
                    </div>
                    <div className='ll'>
                        
                        {_.map(this.props.profitlist, (profitinfo, index)=>{
                            return (
                                <div className="l" key={index}>
                                    <div className="i">
                                        <span className="code">
                                            {
                                                this.props.set_listtype=="order"
                                                ?
                                                "订单:"+profitinfo.fromorder+"获得"
                                                :
                                                "提现记录:"
                                            }
                                        </span>
                                        <span className="date"><span>{moment(profitinfo.created_at).format("MM月DD日 HH时mm分")}</span></span>
                                    </div>
                                    <div className="p">
                                        <span>{profitinfo.feebonus>0?("+"+profitinfo.feebonus):("-"+profitinfo.feebonus*-1)}</span>
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

const mapStateToProps =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(mapStateToProps)(Page);

