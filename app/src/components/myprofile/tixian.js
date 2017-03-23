import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/tixian.css';


export default class Page extends Component {
    state = {activeItem: '全部'};

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn =()=>{
        this.props.history.goBack();
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div className="tixianPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll",
                backgroundColor:"#F5F5F5"
             }}>
                <NavBar lefttitle="返回" title="提现" onClickLeft={this.onClickReturn} />
                <div className="headCont">
                    <div className="info">
                        <span className="profittit">提现金额</span>
                        <div className="priceinput">
                            <span className="number">¥</span>
                            <input />
                            <span className="txt">可提现金额 ¥980.00</span>
                        </div>
                    </div>
                </div>
                <div className="buttoncon">
                    <Button primary>下一步</Button>
                </div>
            </div>
        );
    }
}