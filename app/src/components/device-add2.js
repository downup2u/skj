import React, { Component } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';


const Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    }
    let onClickNext =()=>{
        props.history.push('/addnewdevice3');
    }
    return (
    <div className="addnewdevice">
        <NavBar lefttitle="返回" title="设备匹配" onClickLeft={onClickReturn}/>

        <div className="tt">
            <img src="img/9.png"/>
        </div>
        <div className="fm">
            <div className="device2_text">
                设备正在尝试和云端进行连接
            </div>
            <div className="loginBotton">
                <Button onClick={onClickNext}  primary>下一步</Button>
            </div>
        </div>
    </div>
);
}


export default Page
