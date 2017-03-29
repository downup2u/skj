import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/myorder.css';

export default class Page extends Component {
    state = {activeItem: '全部'}

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    render() {
        const { activeItem } = this.state
        return (
            <div className="myOrder" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="我的订单" onClickLeft={this.onClickReturn}/>
                <Menu pointing secondary>
                    <Menu.Item name='全部' active={activeItem === '全部'} onClick={this.handleItemClick}/>
                    <Menu.Item name='待付款' active={activeItem === '待付款'} onClick={this.handleItemClick}/>
                    <Menu.Item name='待发货' active={activeItem === '待发货'} onClick={this.handleItemClick}/>
                    <Menu.Item name='待收货' active={activeItem === '待收货'} onClick={this.handleItemClick}/>
                    <Menu.Item name='已完成' active={activeItem === '已完成'} onClick={this.handleItemClick}/>
                    <Menu.Item name='我的退货' active={activeItem === '我的退货'} onClick={this.handleItemClick}/>
                </Menu>

                <div className="orderList">
                    <div className="items">
                        <div className="tt">
                            <span>订单号:229009009</span>
                            <span>待付款</span>
                        </div>
                        <div className="cont">
                            <img src="img/myprofile/16.png"/>

                            <div className="proinfo">
                                <div className="proname">这里是产品标题这里是产品标题这里是产品标题这里是产品标题这里是产品标题这里是产品标题</div>
                                <div className="proother">
                                    <span className="price">￥199.00</span>
                                    <span className="num">X1</span>
                                </div>
                            </div>
                        </div>
                        <div className="lnk">
                            <div className='txt'>
                                合计：￥199.00 (含运费8.00元)
                            </div>
                            <div className='hotlnk'>
                                <span className="btn del">取消订单</span>
                                <span className="btn pay">立刻支付</span>
                            </div>
                        </div>
                    </div>

                    <div className="items">
                        <div className="tt">
                            <span>订单号:229009009</span>
                            <span>待付款</span>
                        </div>
                        <div className="cont">
                            <img src="img/myprofile/16.png"/>

                            <div className="proinfo">
                                <div className="proname">这里是产品标题这里是产品标题这里是产品标题这里是产品标题这里是产品标题这里是产品标题</div>
                                <div className="proother">
                                    <span className="price">￥199.00</span>
                                    <span className="num">X1</span>
                                </div>
                            </div>
                        </div>
                        <div className="lnk">
                            <div className='txt'>
                                合计：￥199.00 (含运费8.00元)
                            </div>
                            <div className='hotlnk'>
                                <span className="btn del">取消订单</span>
                                <span className="btn pay">立刻支付</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}