import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';

let countryOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'}]

const Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    }
    let onClickNext =()=>{
        props.history.replace('/');
    }
    return (
    <div className="addnewdevice">
        <NavBar lefttitle="返回" title="匹配成功" onClickLeft={onClickReturn}/>
        <div className="fm">
            <div className="device2_text">
                设备连接成功！
            </div>
            <div className="loginBotton">
                <Button onClick={onClickNext} primary>完成</Button>
                <Button onClick={onClickNext} default>查看数据</Button>
            </div>
        </div>
    </div>
);
}

export default Page