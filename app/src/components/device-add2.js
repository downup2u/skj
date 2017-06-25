import React, { Component } from 'react';
import NavBar from './newnav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';
import _ from 'lodash';
import {createdevice_request} from '../actions';

let Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    }
    let onClickNext =(device)=>{
      props.dispatch(createdevice_request(device));
        //props.history.push('/addnewdevice3');
    }
    const {devicelist} = props;
    return (
    <div className="addnewdevice">
        <NavBar back={true} title="设备匹配" />

        <div className="tt">
            <img src="img/9.png"/>
        </div>
        <div className="fm">
            <div className="device2_text">
            {
                _.map(devicelist,(device)=>{
                  console.log('device:' + JSON.stringify(device));
                   return (
                    <div key={device.mac} onClick={()=>{
                       onClickNext(device);
                    }}>
                      <div>{device.name}</div>
                      <div>{device.mac}</div>
                      <div>{device.ip}</div>
                    </div>
                  );
              })
            }
            </div>
          </div>
    </div>
  );
}

const mapStateToProps = ({wifi,device:{mydevicelist,devices}}) => {
  //mydevicelist,devices <--可以获取设备id的数组
  let devicemaclist = [];
  _.map(mydevicelist,(id)=>{
    let devobj = devices[id];
    devicemaclist.push(devobj.deviceid);
  });

  _.map(wifi.devicelist,(devobj)=>{
    let mac = devobj.mac;
    //
    let id = mac;
    //判断id是否在devicemaclist，在就表示灰色，不能被添加
    devobj.hasexits = true;
  });
  //devicelist<---mac
  //Mac地址冒号去，并转为大写
    return {...wifi};
}
Page = connect(mapStateToProps)(Page);
export default Page;
