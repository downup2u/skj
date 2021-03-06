import React, { Component } from 'react';
import NavBar from './newnav.js';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button, Select } from 'semantic-ui-react';
import '../../public/css/newdevice.css';
import _ from 'lodash';
import {createdevice_request,leave_finished_device} from '../actions';
import WeUI from 'react-weui';
import 'weui';
import './tools/myweui.css';
const {
    LoadMore
} = WeUI;


class Page extends React.Component {
  componentWillUnount () {
    this.props.dispatch(leave_finished_device({}));
  }


  onClickNext =(device)=>{
      if(!device.hasexits){
          
          this.props.dispatch(createdevice_request(device));
      }
      else{
        this.props.history.replace('/');
      }
      //props.history.push('/addnewdevice3');
  }
  render(){

    const {devicelist} = this.props;
    return (
      <div className="addnewdevice"  style={{height: window.innerHeight+"px"}}>
          <NavBar back={true} title="设备匹配" style={{backgroundImage:"linear-gradient(0deg, #0090d8, #0090d8)"}}/>

          <div className="tt">
              <img src="img/9.png"/>
          </div>
          <div className="fm" style={{paddingTop:0}}>
              <div className="device2_text">
              { devicelist.length===0?(
                  <LoadMore showLine>暂无设备</LoadMore>
                ):
                  _.map(devicelist,(device)=>{
                    //console.log('device:' + JSON.stringify(device));
                      let listyle = device.hasexits?"sel ls":"ls";
                     return (
                      <div
                        key={device.mac}
                        onClick={()=>{
                          this.onClickNext(device);
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
