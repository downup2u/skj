import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon, Input, List, Radio} from 'semantic-ui-react'
import '../../public/css/home.css';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../node_modules/react-dynamic-swiper/lib/styles.css';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {ui_setcurrentdeviceid} from '../actions/index.js';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

let Page = (props)=> {

    let list = {
        listStyle: "none",
        padding: "15px",
        margin: "0"
    };
    let linestyle = (startColor, endColor, widthStyle)=> ({
        backgroundImage: "linear-gradient(135deg, " + startColor + ", " + endColor + ")",
        height: "12px",
        borderRadius: "12px",
        width: widthStyle
    });
    let listLi = {
        marginBottom: "10px"
    };
    let listinfo = {
        color: "#CCC",
        fontSize: "14px",
        marginLeft: "15px"
    };
    let listname = {
        fontSize: "14px"
    };
    let lineBg = {
        borderRadius: "12px",
        backgroundColor: "#EEE"
    };
    let percentage = {
        color: "#5694dd",
        fontSize: "11px"
    };
    let listhead = {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2px",
        position: "relative"
    };
    let headImg = {
        width: "60%"
    };

    let onChangeDevice =(deviceid)=>{
        //改变设备时
        props.dispatch(ui_setcurrentdeviceid(deviceid));
    }

    let onClickNewDevice = ()=> {
        props.history.push('/addnewdevice');
    }
    let onClickDevicelist = ()=> {
        props.history.push('/devicelist');
    };
    const {curdeviceid,mydevicelist,devices} = props;
    if(mydevicelist.length === 0){
      return (<div>当前没有设备,请新建</div>);
    }

    let curdevice = devices[curdeviceid];
    if(!curdevice){
      return (<div>当前设备不可用</div>);
    }

    let curdevicedata = curdevice.realtimedata;
    if(!curdevicedata){
      return (<div>当前设备无数据</div>);
    }

    let {detaillist,leftmodel,rightmodel} = curdevicedata;
    let getdata = _.get(curdevicedata,'getdata',false);
    if(!getdata){
      return (<div>当前设备未获取到数据</div>);
    }
    //getdata = true;//是否获取到数据
    let detaillistco = [];
    if(getdata){//是否获取到数据
      _.map(detaillist,(detail)=> {
          let linestyleresult = linestyle("#52a3da", "#C00", `${detail.leftpecent}%`);
          detaillistco.push(
              <li style={listLi} key={detail.name}>
                  <div style={listhead}>
                        <div style={{display:"inline-block",flexGrow:1}}>
                            <span style={listname}>{detail.name}</span>
                            <span style={listinfo}>剩余{detail.leftday}天</span>
                        </div>
                        <div style={{position:"absolute",right: 0, top:0}}>
                            <span style={percentage}>{detail.leftpecent}%</span>
                            <span>复位</span>
                        </div>
                  </div>
                  <div style={lineBg}>
                      <div style={linestyleresult}></div>
                  </div>
              </li>
          );
      });
    }


    return (
        <div className="homePageWamp">
            <div className="homePage">

                <div className="toolBar">
                    <div className='left' onClick={onClickNewDevice}>
                        +
                    </div>
                    <div className='center' style={{color:"#FFF",fontSize:"18px"}}>水质监测</div>
                    <div className='right' onClick={onClickDevicelist}>
                        <img src="img/head/1.png" />
                    </div>
                </div>
                <Swiper
                    swiperOptions={{slidesPerView: 'auto'}}
                    {...swiperOptions}
                    onSlideChangeEnd={(swiper, event) => {
                        console.log(swiper.index);
                        let curdeviceid = detaillist[swiper.index];
                        onChangeDevice(curdeviceid);
                    }}
                    >
                    {
                      _.map(mydevicelist,(deviceid)=>{
                          let tmpdevice = devices[deviceid];
                          let {name,total,modeltype,detaillist} = tmpdevice.realtimedata;
                          let getdata = _.get(tmpdevice,'realtimedata.getdata',false);
                          if(!getdata){
                            return (<div key={deviceid}>未获取到数据</div>);
                          }
                          return (
                          <Slide
                              className="Demo-swiper__slide"
                              key={deviceid}
                              >
                              <div className="headContent">
                                  <img src="img/1.png"/>
                                  <div className="headContentInfo">
                                      <span className="i1">{modeltype}</span>
                                      <span className="i2">{name}</span>
                                      <span className="i3"><span>可直饮</span></span>
                                      <span className="i4">共净化{total}L</span>
                                  </div>
                              </div>
                          </Slide>);
                      })
                    }

                </Swiper>

                <div className="headInfo">
                    <span>{curdevicedata.leftmodel.name} {curdevicedata.leftmodel.resultstring}</span>
                    <span className="headInfoborder"></span>
                    <span>{curdevicedata.rightmodel.name} {curdevicedata.rightmodel.resultstring}</span>
                </div>

            </div>

            <div className="HomeList">
                <div className="ListTitle">
                    <div>滤芯状态</div>
                    <div>断水更换<Radio toggle/></div>
                </div>
                <ul style={list}>
                    {detaillistco}
                </ul>
            </div>
        </div>
    );
}


const mapStateToProps = ({device}) => {
    return {...device};
};

Page = connect(mapStateToProps)(Page);
Page = withRouter(Page);
export default Page;
