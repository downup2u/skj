import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/myprofit.css';


export default class Page extends Component {
    state = {activeItem: '全部'};

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn =()=>{
        this.props.history.goBack();
    };
    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        const { activeItem } = this.state;
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
                        <span className="number">¥ 47394.0元</span>
                    </div>
                    <div className="tixian"><span onClick={()=>{this.onClickPage('/tixian')}}>提现</span></div>
                </div>
                <Menu pointing secondary>
                    <Menu.Item name='全部' active={activeItem === '全部'} onClick={this.handleItemClick}/>
                    <Menu.Item name='获得明细' active={activeItem === '获得明细'} onClick={this.handleItemClick}/>
                    <Menu.Item name='提现明细' active={activeItem === '提现明细'} onClick={this.handleItemClick}/>
                </Menu>

                <div className="cont">
                    <div className='tt'>
                        <span>日期</span><span>金额</span>
                    </div>
                    <div className='ll'>


                        <div className="l">
                            <div className="i">
                                <span className="code">订单:345354获得</span>
                                <span className="date">2017-08-09</span>
                            </div>
                            <div className="p">
                                <span>+4000</span>
                            </div>
                        </div>
                        <div className="l">
                            <div className="i">
                                <span className="code">订单:345354获得</span>
                                <span className="date">2017-08-09</span>
                            </div>
                            <div className="p">
                                <span>+4000</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}