import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';

let countryOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'}]

const Page = () => (
    <div className="addnewdevice">
        <NavBar lefttitle="返回" title="设备连接"/>

        <div className="tt">
            <img src="/img/6.png"/>
        </div>
        <div className="fm">
            <div className="input">
                <Select options={countryOptions}/>
                <img src="/img/8.png" />
            </div>
            <div className="input">
                <Input placeholder='请输入网络密码'/>
                <img src="/img/7.png" />
            </div>
            <div className="loginBotton">
                <Button primary>下一步</Button>
            </div>
        </div>
    </div>
)

export default Page
