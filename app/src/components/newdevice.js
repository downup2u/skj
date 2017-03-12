import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, List, Radio, Button, Icon, Image, Checkbox} from 'semantic-ui-react';
import {createdevice} from '../actions/sagacallback.js';
let renderNewdeviceForm = (fields)=>{
  console.dir(fields);
  return (<div className='registerform'>
            <div className="username logininput">
                <Input placeholder='输入设备名' {...fields.devicename.input} type="text"/>
                <Icon name="mobile" className='lefticon'/>
            </div>
            <div className="username logininput">
                <Input placeholder='输入设备品牌' {...fields.devicebrand.input} type="text"/>
                <Icon name="mobile" className='lefticon'/>
            </div>
            <div className="username logininput">
                <Input placeholder='输入型号' {...fields.devicemodel.input} type="text"/>
                <Icon name="mobile" className='lefticon'/>
            </div>
          </div>);
}
renderNewdeviceForm = connect()(renderNewdeviceForm);

let NewdeviceForm = (props)=>{
  let {handleSubmit,onClickNewDevice} = props;
  return (<Form onSubmit={handleSubmit(onClickNewDevice)}>
    <div className="loginPageTop">
        <Fields names={['devicename','devicebrand','devicemodel']} component={renderNewdeviceForm}/>
        <div className="loginBotton">
            <Button primary>确定</Button>
        </div>
    </div>
  </Form>);
};

NewdeviceForm = reduxForm({
  form: 'newdevice',
  initialValues:{
    devicename:'',
    devicebrand:'',
    devicemodel:''
  }
})(NewdeviceForm);

import {createdevice_request} from '../actions/index.js';
export class Page extends React.Component {

  componentWillMount () {

  }
  onClickReturn =()=>{
    this.props.history.goBack();
  }
  onClickNewDevice = (values)=>{
    console.dir(values);

    let payload = {
      devicename:values.devicename,
      devicebrand:values.devicebrand,
      devicemodel:values.devicemodel,
    }
    this.props.dispatch(createdevice(payload)).then((result)=>{
      console.log("新建设备成功:" + JSON.stringify(result));
      this.props.history.goBack();
    }).catch((error)=>{
      //弹出错误框
      console.log("新建设备失败:" + JSON.stringify(error));
    });
  //  this.props.dispatch(createdevice_request(payload));
  }
  render() {
    return ( <div>
            <NavBar lefttitle="返回" title="设备列表" onClickLeft={this.onClickReturn}/>
            <NewdeviceForm onClickNewDevice={this.onClickNewDevice}/>
          </div>);
  }
}


Page = connect()(Page);
export default Page;
