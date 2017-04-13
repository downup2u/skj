import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/mycoupon.css';
import { mycoupongetall } from '../../actions/sagacallback.js';
import { setulcoupontype } from '../../actions';
import { connect } from 'react-redux';
import InfinitePage from '../controls/infinitecontrol';

export class Page extends Component {

    handleItemClick =(type)=>{
        this.props.dispatch(setulcoupontype(type));
    }

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    updateContent = (item)=> {
        return  (
            <div 
                className="item" 
                key = {item._id} 
                >
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
        );
    }

    render() {
        return (
            <div className="myCouponPage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="优惠券" onClickLeft={this.onClickReturn} />
                <Menu pointing secondary>
                    <Menu.Item name='未使用' 
                        active={this.props.ulcoupontype === 0} 
                        onClick={()=>{this.handleItemClick(0)}}/>
                    <Menu.Item name='已使用' 
                        active={this.props.ulcoupontype === 1} 
                        onClick={()=>{this.handleItemClick(1)}}/>
                    <Menu.Item name='已过期' 
                        active={this.props.ulcoupontype === 2} 
                        onClick={()=>{this.handleItemClick(2)}}/>
                </Menu>
                <div className="myCouponList" style={{height:window.innerHeight-88}}>
                    <InfinitePage
                        pagenumber = { 20 }
                        updateContent= { this.updateContent }
                        queryfun= {mycoupongetall}
                        listheight= {window.innerHeight-88}
                        sort = {{created_at : -1 }}
                        query = {{usestatus : this.props.ulcoupontype}}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({shop, app}) => {
    return {...shop, ...app};
}
Page = connect(mapStateToProps)(Page);
export default Page;

