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
        if(!device.hasexits){
            props.dispatch(createdevice_request(device));
        }
        //props.history.push('/addnewdevice3');
    }
    const {devicelist} = props;
    return (
    <div className="addnewdevice">
        <NavBar back={true} title="设备匹配" />

        <div className="tt">
            <img src="img/9.png"/>
        </div>
        <div className="fm" style={{paddingTop:0}}>
            <div className="device2_text">
            {
                _.map(devicelist,(device)=>{
                  //console.log('device:' + JSON.stringify(device));
                    let listyle = device.hasexits?"sel":"";
                   return (
                    <div
                      key={device.mac}
                      onClick={()=>{
                        onClickNext(device);
                      }}
                      className={listyle}
                      >
                      <div className="mac">
                        <span>{device.name}</span>
                        <span>{device.mac}</span>
                      </div>
                      <div className="ip">
                        <span>{device.ip}</span>
                        {device.hasexits && <span className="seltxt">已创建</span>}
                      </div>
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
    let mac = devobj.mac.replace(/:/g,'');
    mac = mac.toUpperCase();
    console.log(devicemaclist);
    let have = devicemaclist.indexOf(mac);
    //判断id是否在devicemaclist，在就表示灰色，不能被添加
    devobj.hasexits = have!==-1;
    return devobj;
  });
  return {...wifi};
}
Page = connect(mapStateToProps)(Page);
export default Page;
