import React, { Component } from 'react';
import '../../public/css/user.css';
import {  Button, Icon,Input, List, Radio} from 'semantic-ui-react'
import { connect } from 'react-redux';
import NavBar from './nav.js';
import AddressForm from './address_form.js';
import {createaddress_request} from '../actions/index.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import {createaddress} from '../actions/sagacallback.js';
import {defaultaddrselvalue,setdefaultaddrselvalue} from '../areaData_v2.js';

class Page extends React.Component {
    componentWillMount() {

    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    }
    onClickNewAddress = (values)=> {
        let payload = {
            truename: values.truename,
            phonenumber: values.phonenumber,
            seladdr:values.seladdr,
            addressname: values.addressname,
            isdefaultaddress:values.isdefaultaddress
        };

        this.props.dispatch(createaddress(payload)).then((result)=> {
            console.log("新建地址成功:" + JSON.stringify(result));
            setdefaultaddrselvalue(values.seladdr);
            this.props.history.goBack();
        }).catch((error)=> {
            //弹出错误框
            console.log("新建地址失败:" + JSON.stringify(error));
        });
        //this.props.dispatch(createaddress_request(payload));
    }

    render() {
        return (
            <div className="addAddressPage">
                <NavBar lefttitle="返回" title="新增地址" onClickLeft={this.onClickReturn}/>
                <AddressForm onClickOK={this.onClickNewAddress} formname='newaddress'
                             formvalues={{
              truename:'',
              phonenumber:'',
              seladdr:defaultaddrselvalue,
              addressname:'',
              isdefaultaddress:false
            }}/>
            </div>);
    }
}


Page = connect()(Page);
export default Page;
