import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import {  Button, Icon,Input, List, Radio} from 'semantic-ui-react'
import { connect } from 'react-redux';
import NavBar from './nav.js';
import AddressForm from './address_form.js';
import {editaddress_request} from '../actions/index.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import {editaddress} from '../actions/sagacallback.js';

class Page extends React.Component {
  componentWillMount () {

  }
  onClickReturn =()=>{
    this.props.history.goBack();
  }
  onClicEditAddress =(values)=>{
    let payload = {
        _id:this.props.match.params.addressid,
        truename:values.truename,
        phonenumber:values.phonenumber,
        seladdr:values.seladdr,
        addressname:values.addressname,
    }
    //this.props.dispatch(editaddress_request(payload));
    this.props.dispatch(editaddress(payload)).then((result)=>{
      console.log("编辑地址成功:" + JSON.stringify(result));
      this.props.history.goBack();
    }).catch((error)=>{
      //弹出错误框
      console.log("编辑地址成功:" + JSON.stringify(error));
    });
  }
  shouldComponentUpdate(nextProps, nextState){
    return false;//禁止刷新!
  }
  render() {
    return (
        <div>
          <NavBar lefttitle="返回" title="编辑地址" onClickLeft={this.onClickReturn} />
          <AddressForm onClickOK={this.onClicEditAddress}
          formname='editddress'
          formvalues={{
            truename:this.props.truename,
            phonenumber:this.props.phonenumber,
            seladdr:this.props.seladdr,
            addressname:this.props.addressname,
            }}/>
        </div>);
  }
}
const mapStateToProps = ({address},props) => {
  let addressid = props.match.params.addressid;
  let curaddressitem = {};
  for(let addressitem of address.addresslist){
    if(addressitem._id === addressid){
      curaddressitem = addressitem;
    }
  }
  return curaddressitem;
}

Page = connect(mapStateToProps)(Page);
export default Page;
