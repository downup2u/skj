import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu } from 'semantic-ui-react';
import '../../../public/css/tixian.css';
import { connect } from 'react-redux';
import {
    profit_set_tixianform,
    showpopmessage
} from '../../actions';

export class Page extends Component {

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    setTixianprice =(e)=>{
        let val = e.target.value;
        if(val>this.props.balance){
            e.target.value = this.props.balance;
        }
        let payload = {
            cashmoney: parseInt(val),//提现金额
        }
        this.props.dispatch(profit_set_tixianform(payload));
    }

    onClickNext = (name)=> {
        if(this.props.profitform.cashmoney<=0){
            this.props.dispatch((showpopmessage({
                title: '',
                msg: '提现金额不能为0！',
                type: 'error'
            })))
        }else{
            this.props.history.replace(name);
        }
    };

    render() {
        return (
            <div className="tixianPage"
                style={{
                    height:(window.innerHeight)+"px",
                    overflow:"scroll",
                    backgroundColor:"#F5F5F5"
                }}
                >
                <NavBar lefttitle="返回" title="提现" onClickLeft={this.onClickReturn} />
                <div className="headCont">
                    <div className="info">
                        <span className="profittit">提现金额</span>
                        <div className="priceinput">
                            <span className="number">¥</span>
                            <input onChange={(e)=>{this.setTixianprice(e)}}/>
                            <span className="txt">可提现金额 ¥{this.props.balance}</span>
                        </div>
                    </div>
                </div>
                <div className="buttoncon">
                    <Button primary onClick={()=>{this.onClickNext("/tixian2")}}>下一步</Button>
                </div>
            </div>
        );
    }
}
const mapStateToProps =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(mapStateToProps)(Page);


