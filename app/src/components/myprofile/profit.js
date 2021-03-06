/*
    我的收益
*/
import React, { Component } from 'react';
import NavBar from '../newnav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/myprofit.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {
    profit_set_listtype,
    queryuserbalance_request
} from '../../actions';
import {
    getdistsalesorderdetails
} from '../../actions/sagacallback.js';


export class Page extends Component {

    componentWillMount () {
        this.props.dispatch(queryuserbalance_request({}));
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
                sort:{created_at:-1},
            }
        };
        this.props.dispatch(getdistsalesorderdetails(payload))
    };

    handleItemClick = (index) => {
        this.props.dispatch(profit_set_listtype(index));
        let query = {};
        if(index!=''){
            query = { srctype : index };
            if(index==="withdrawcash"){
                query = {
                    srctype : {"$in":['withdrawcash_ing','withdrawcash_ed','withdrawcash_denied','withdrawcash','paywithleftbalance']}
                };
            }
        }
        this.getprofitlist(query)
    };

    onClickReturn =()=>{
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {

        let getsrctypename =(profitinfo)=>{
          let srctypename;
          if(profitinfo.srctype === 'order'){
            srctypename = '订单获得';
          }
          else if(profitinfo.srctype === 'paywithleftbalance'){
            srctypename = '余额支付';
          }
          else{
            if(_.startsWith(profitinfo.srctype,'withdrawcash')){
              srctypename = '提现申请';
              let typemap = {
                'withdrawcash':'提现申请',
                'withdrawcash_ing':'提现中',
                'withdrawcash_ed':'提现成功',
                'withdrawcash_denied':'提现失败',
              };
              if(!!typemap[profitinfo.srctype]){
                srctypename = typemap[profitinfo.srctype];
              }
            }
          }
          return srctypename;
        }

        return (
            <div className="myProfitPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll"
             }}>
                <NavBar back={true} title="我的收益" />
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
                            let show = profitinfo.feebonus==0?{display:"none"}:{};
                            //判断时会否为浮点数
                            let r = /^(-?\d+)(\.\d+)?$/;
                            if(r.test(profitinfo.feebonus)){
                                profitinfo.feebonus = parseFloat(profitinfo.feebonus.toFixed(2));
                            }
                            return (
                                <div
                                    className="l"
                                    key={index}
                                    style={show}
                                    >
                                    <div className="i">
                                        <span className="code">
                                            {getsrctypename(profitinfo)}
                                        </span>
                                        <span className="date"><span>{moment(profitinfo.created_at).format("MM月DD日 HH时mm分")}</span></span>
                                    </div>
                                    <div className="p">
                                        <span>{profitinfo.feebonus>0?("+"+profitinfo.feebonus):""}</span>
                                        <span>{profitinfo.feebonus<0?("-"+profitinfo.feebonus*-1):""}</span>
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

const mapStateToProps =  ({userlogin,profit}) =>{
    profit.profitlist = _.sortBy(profit.profitlist, [function(o) { 
        var t = new Date(o.created_at);
        return -t.getTime(); 
    }]);
    return {...userlogin, ...profit}
};
export default connect(mapStateToProps)(Page);
