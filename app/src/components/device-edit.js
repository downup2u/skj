import React, { Component } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, List, Radio, Button, Icon, Image, Checkbox} from 'semantic-ui-react';
// import {createdevice} from '../actions/sagacallback.js';
import PicturesWall  from './controls/pictureswall.js';
import {updatedevice_request} from '../actions/index.js';

let renderEditdeviceForm = (fields)=>{
  console.dir(fields);
  return (<div className='newdevice'>
            <div className="newdeviceinput">
                <Input placeholder='输入设备名' {...fields.devicename.input} type="text"/>
            </div>
            <div className="newdeviceinput">
                <Input placeholder='输入设备品牌' {...fields.devicebrand.input} type="text"/>
            </div>
            <div className="newdeviceinput">
                <Input placeholder='输入型号' {...fields.devicemodel.input} type="text"/>
            </div>
          </div>);
}
renderEditdeviceForm = connect()(renderEditdeviceForm);

let EditdeviceForm = (props)=>{
  let {handleSubmit,onClickEditDevice} = props;
  return (<Form onSubmit={handleSubmit(onClickEditDevice)}>
    <div className="loginPageTop">
        <Fields names={['devicename','devicebrand','devicemodel']} component={renderEditdeviceForm}/>
        <div className="loginBotton">
            <Button primary>确定</Button>
        </div>
    </div>
  </Form>);
};


class Page extends React.Component {

  componentWillMount () {

  }
  onClickReturn =()=>{
    this.props.history.goBack();
  }
  onClickEditDevice = (values)=>{
    console.dir(values);
    const {curdevice,dispatch} = this.props;
    dispatch(updatedevice_request({
      query:{_id:curdevice._id},
      data:values
    }));
  }
  render() {
    const {curdevice} = this.props;
    EditdeviceForm = reduxForm({
      form: 'editdevice',
      initialValues:{
        devicename:curdevice.devicename,
        devicebrand:curdevice.devicebrand,
        devicemodel:curdevice.devicemodel,
      }
    })(EditdeviceForm);
    return ( <div>
            <NavBar lefttitle="返回" title="设备列表" onClickLeft={this.onClickReturn}/>
            <EditdeviceForm onClickEditDevice={this.onClickEditDevice}/>
          </div>);
  }
}


const mapStateToProps = ({device:{curdevice}},props) => {
  let deviceid = props.match.params.deviceid;
  if(curdevice._id !== deviceid){

  }
  return {curdevice};
}

Page = connect(mapStateToProps)(Page);
export default Page;
