import React, { Component } from 'react';
import NavBar from './nav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, List, Radio, Button, Icon, Image, Checkbox} from 'semantic-ui-react';
// import {createdevice} from '../actions/sagacallback.js';
import PicturesWall  from './controls/pictureswall.js';
import {updatedevice_request, resetdevicecmd_request} from '../actions/index.js';
import { Switch } from 'antd';
import _ from 'lodash';

//{"5微米PP滤芯":180,"颗粒活性炭":180,"1微米PP滤芯":180,"反渗透RO膜":730,"后置活性炭":360}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
  })
}


let renderform1 = (fields)=>{
    return (
        <div className="newdeviceinput">
            <span>设备名称</span><Input placeholder='输入设备名' {...fields.input} type="text"/>
        </div>
    )
}
let renderform2 = (fields)=>{
    return (
        <div className="newdeviceinput">
            <span>设备品牌</span><Input placeholder='输入设备品牌' {...fields.input} type="text"/>
        </div>
    )
}
let renderform3 = (fields)=>{
    return (
        <div className="newdeviceinput">
            <span>型号</span><Input placeholder='输入型号' {...fields.input} type="text"/>
        </div>
    )
}




let EditdeviceFormXX = (props)=>{
    let {handleSubmit,onClickEditDevice, curdevice, dispatch, detaildaylist, curdeviceid} = props;

    let setdeviceshow = (v, id, name)=>{
        // console.log(v);
        // console.log(id);
        // console.log(name);
        let payload = {
            deviceid : id,
            cmd : "setvisible",
            indexname : name,
            value : v,
            type : "day"
        }
        dispatch(resetdevicecmd_request(payload));
    }

    //'devicebrand','devicemodel']

    return (
        <Form onSubmit={handleSubmit(onClickEditDevice)}>
            <div className="loginPageTop">
                <div className="editdevicePageWamp">
                    <div className='newdevice editdevicePage'>

                        <Field
                            name='devicename'
                            component={renderform1}
                            />
                        <Field
                            name='devicebrand'
                            component={renderform2}
                            />
                        <Field
                            name='devicemodel'
                            component={renderform3}
                            />

                    </div>
                </div>
                { detaildaylist.length>0 &&
                    <div className='newdevice2'>
                        {_.map(detaildaylist, (data,i)=>{
                            return (
                                <div className="newdeviceinput" key={`dd${i}`}>
                                    <span>{data.name}</span>
                                    <Switch
                                        checkedChildren="开"
                                        unCheckedChildren="关"
                                        defaultChecked= {detaildaylist[i].isvisiable}
                                        onChange={(v)=>{setdeviceshow(v, curdeviceid, data.name)}}
                                        />
                                </div>
                            )
                        })}
                    </div>
                }

                <div className="loginBotton">
                    <Button primary>确定</Button>
                </div>

            </div>
        </Form>
    );
};

EditdeviceFormXX = reduxForm({
    form: 'editdevice',
    asyncValidate,
    asyncBlurFields: ['devicename']
})(EditdeviceFormXX);

EditdeviceFormXX = connect(
  ({device:{devices}},props)=>{
      const curdevice = devices[props.deviceid];
      return {
        initialValues:{
            devicename:curdevice.devicename,
            devicebrand:curdevice.devicebrand,
            devicemodel:curdevice.devicemodel,
        },
      }
  }
)(EditdeviceFormXX);



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
    const {curdevice, detaildaylist, curdeviceid,deviceid} = this.props;
    return ( <div>
            <NavBar lefttitle="返回" title={curdevice.devicename} onClickLeft={this.onClickReturn}/>
            <EditdeviceFormXX
                onClickEditDevice={this.onClickEditDevice}
                dispatch={this.props.dispatch}
                detaildaylist={detaildaylist}
                curdeviceid={curdeviceid}
                deviceid={deviceid}
                />


          </div>);
  }
}


const mapStateToProps = ({device:{mydevicelist,devices}},props) => {

    let deviceid = props.match.params.deviceid;
    let curdevice = devices[deviceid];
    let curdeviceid = curdevice.deviceid;
    let curdetaildaylist = curdevice.detaildaylist;


    return {curdevice, detaildaylist: curdetaildaylist, curdeviceid: curdeviceid,deviceid};
}

Page = connect(mapStateToProps)(Page);
export default Page;
