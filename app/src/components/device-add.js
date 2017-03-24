import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';
import {getwifilist_request} from '../actions';

class Page extends React.Component {
    componentWillMount() {
        this.props.dispatch(getwifilist_request());
    }
    onClickReturn = ()=> {
        this.props.history.goBack();
    }
    onClickNext =()=>{
        this.props.history.push('/addnewdevice2');
    }

    render(){
        return (
            <div className="addnewdevice">
            <NavBar lefttitle="返回" title="设备连接" onClickLeft={this.onClickReturn}/>

            <div className="tt">
            <img src="img/6.png"/>
            </div>
            <div className="fm">
            <div className="input">
            <Select options={this.props.countryOptions}/>
            <img src="img/8.png" />
            </div>
            <div className="input">
            <Input placeholder='请输入网络密码'/>
            <img src="img/7.png" />
            </div>
            <div className="loginBotton">
            <Button onClick={this.onClickNext} primary>下一步</Button>
        </div>
        </div>
        </div>
    );

    }

}

const mapStateToProps = ({wifi}) => {
    let countryOptions = [];
    const {wifilist} = wifi;
    wifilist.forEach((wifi,index)=>{
        countryOptions.push({
            key: index,
            value: wifi.ssid,
            flag: 'af', //变成wifi图标？？？
            text: wifi.ssid,
        });
    });
    return {countryOptions};
}
Page = connect(mapStateToProps)(Page);
export default Page
