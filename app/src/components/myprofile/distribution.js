import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/distribution.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import InfinitePage from '../controls/infinitecontrol';
import {
    getnextusers_request,
    getdistsalesorderstat_request,
    set_nextusersfiller
} from '../../actions';
import {
    getdistsalesorderdetails
} from '../../actions/sagacallback.js';

export class Page extends Component {

    componentWillMount () {
        //获取下线代理数
        this.getnextusers();
    };

    handleItemClick =(type)=>{
        this.props.dispatch(set_nextusersfiller(type));
    };

    onClickReturn =()=>{
        this.props.history.goBack();
    };

    onClickPage =(name)=>{
        this.props.history.push(name);
    };

    //获取我的下级分销数{level1:1,level2:0}
    getnextusers =()=>{
        this.props.dispatch(getnextusers_request({}));
    };

    updateContent =(item)=>{
        return  (
            <div className="li" onClick={this.onClickPage.bind(this, "/distributioninfo")} key={item._id}>
                <span className="num">1</span>
                <img src="img/myprofile/1.png" className="avatar" />
                <div>
                    <span>姓名: 王小胖</span>
                    <span>消费金额: <i>¥499.00</i></span>
                </div>
                <span>奖励金额: <i>¥499.00</i></span>
            </div>
        );
    };

    render() {
        return (
            <div className="distributionPage"
                style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll"
                }}>
                <NavBar lefttitle="返回" title="我的分销" onClickLeft={this.onClickReturn} />
                <div className="headCont">
                    <div className="userInfo">
                        <img src="img/myprofile/1.png" className="avatar"/>
                        <span className="username">{this.props.editusername}</span>
                        <span className="usertype">代理人数({this.props.nextnumber}人)</span>
                    </div>
                </div>

                <Menu pointing secondary>
                    <Menu.Item name='一级代理' active={this.props.nextusersfiller.type==1} onClick={()=>this.handleItemClick(1)}/>
                    <Menu.Item name='二级代理' active={this.props.nextusersfiller.type==2} onClick={()=>this.handleItemClick(2)}/>
                </Menu>

                <div className="cont">
                    <InfinitePage
                        pagenumber = {30}
                        updateContent= {this.updateContent.bind(this)}
                        queryfun= {getdistsalesorderdetails}
                        listheight= {window.innerHeight-92}
                        query = {this.props.nextusersfiller}
                        sort = {{}}
                    />
                </div>
                <div className="bottomBttn" onClick={()=>{this.onClickPage("/ordertotal")}}><span>订单统计</span></div>
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

