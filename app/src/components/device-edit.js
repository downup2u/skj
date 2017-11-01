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

const required = value => value ? undefined : undefined;

let renderEditdeviceForm = (fields)=>{
    console.log(fields);
    let dispatch = fields.dispatch;
    let detaildaylist = fields.curdevice.detaildaylist;
    let dinputdata = [
        fields.d1.input,
        fields.d2.input,
        fields.d3.input,
        fields.d4.input,
        fields.d5.input
    ];
    let setdeviceshow = (v, id, name)=>{
        console.log(v);
        console.log(id);
        console.log(name);
        let payload = {
            deviceid : id,
            cmd : "setvisible",
            indexname : name,
            value : v,
            type : "day"
        }
        dispatch(resetdevicecmd_request(payload));
    }

    /*

    onChange={(v)=>{setdeviceshow(v, fields.curdevice.deviceid, data.name)}}
    复位操作 payload说明
    deviceid:设备id
    cmd:'resetall'/'resetone'/'setone'/'setvisible'【resetall表示实时水流重置,resetone表示复位1个滤芯,setone表示设置一个滤芯,setvisible表示设置滤芯是否可见】
    indexname:'5微米PP滤芯'/'颗粒活性炭'【表示滤芯名字，当cmd为'resetone'/'setone'/'setvisible'有效】
    value:用户输入的值，仅当cmd为'setone'/'setvisible'有效，其中setone输入数字，setvisible为bool类型
    type:'vol'/'day'【vol表示复位流量,day表示复位天数】
    */
    
    return (
        <div className="editdevicePageWamp">
            <div className='newdevice editdevicePage'>
                <div className="newdeviceinput">
                    <span>设备名称</span><Input placeholder='输入设备名' {...fields.devicename.input} type="text"/>
                </div>
                <div className="newdeviceinput">
                    <span>设备品牌</span><Input placeholder='输入设备品牌' {...fields.devicebrand.input} type="text"/>
                </div>
                <div className="newdeviceinput">
                    <span>型号</span><Input placeholder='输入型号' {...fields.devicemodel.input} type="text"/>
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
                                    defaultChecked= {fields.curdevice.detaildaylist[i].isvisiable}
                                    {...dinputdata[i]} 
                                    onChange={(v)=>{setdeviceshow(v, fields.curdevice.deviceid, data.name)}}
                                    />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
}
renderEditdeviceForm = connect()(renderEditdeviceForm);

let EditdeviceForm = (props)=>{
    let {handleSubmit,onClickEditDevice, curdevice, dispatch} = props;
    return (
        <Form onSubmit={handleSubmit(onClickEditDevice)}>
            <div className="loginPageTop">
                <Fields 
                    names={['devicename','devicebrand','devicemodel',"d1","d2","d3","d4","d5"]} 
                    component={renderEditdeviceForm} 
                    curdevice={curdevice}
                    dispatch={dispatch}
                    validate={[required]}
                    />
                    <div className="loginBotton">
                        <Button primary>确定</Button>
                    </div>
            </div>
        </Form>
    );
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

    console.log(curdevice);
    EditdeviceForm = reduxForm({
      form: 'editdevice',
      initialValues:{
        devicename:curdevice.devicename,
        devicebrand:curdevice.devicebrand,
        devicemodel:curdevice.devicemodel,

        // devicemodel:curdevice.devicemodel,
        // devicemodel:curdevice.devicemodel,
        // devicemodel:curdevice.devicemodel,
        // devicemodel:curdevice.devicemodel,
        // devicemodel:curdevice.devicemodel,
      }
    })(EditdeviceForm);
    return ( <div>
            <NavBar lefttitle="返回" title={curdevice.devicename} onClickLeft={this.onClickReturn}/>
            <EditdeviceForm onClickEditDevice={this.onClickEditDevice} curdevice = {curdevice} dispatch={this.props.dispatch}/>
          </div>);
  }
}


const mapStateToProps = ({device:{mydevicelist,devices}},props) => {

  let deviceid = props.match.params.deviceid;
  let curdevice = devices[deviceid];
  return {curdevice};
}

Page = connect(mapStateToProps)(Page);
export default Page;
