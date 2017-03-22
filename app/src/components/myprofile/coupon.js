import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/mycoupon.css';

export default class Page extends Component {
    state = {activeItem: '未使用'}

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn =()=>{
        this.props.history.goBack();
    }

    render() {
        const { activeItem } = this.state
        return (
            <div className="myCouponPage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="优惠券" onClickLeft={this.onClickReturn} />
                <Menu pointing secondary>
                    <Menu.Item name='未使用' active={activeItem === '未使用'} onClick={this.handleItemClick}/>
                    <Menu.Item name='已使用' active={activeItem === '已使用'} onClick={this.handleItemClick}/>
                    <Menu.Item name='已过期' active={activeItem === '已过期'} onClick={this.handleItemClick}/>
                </Menu>


                <div className="myCouponList">
                    <div className="item">
                        <div className="leftcont">
                            <span><span>20</span>元</span>
                            <span>优惠券</span>
                        </div>
                        <div className="cont">
                            <div>
                                <span className="tt">满1000抵20元</span>
                                <span>有效期2017-01-01至2017-03-31</span>
                            </div>
                        </div>
                    </div>

                    <div className="item">
                        <div className="leftcont">
                            <span><span>20</span>元</span>
                            <span>优惠券</span>
                        </div>
                        <div className="cont">
                            <div>
                                <span className="tt">满1000抵20元</span>
                                <span>有效期2017-01-01至2017-03-31</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}