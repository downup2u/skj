import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon, Input, List, Radio} from 'semantic-ui-react'
import '../../public/css/home.css';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../node_modules/react-dynamic-swiper/lib/styles.css';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {ui_setcurrentdeviceid,senddevicecmd_request} from '../actions/index.js';

let swiperOptions = {
    navigation: false,
    pagination: true,
    scrollBar: false
};

let list = {
    listStyle: "none",
    padding: "15px",
    margin: "0",
    flexGrow: 1,
    
    flexShrink: 0
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

let Nodevice =(props)=>{
    return (
        <div className="nodevice">
            <img src="img/12.png" />
            <div className="desc">当前没有设备</div>
            <div className="btn" onClick={()=>{props.history.push('/addnewdevice');}}>新建设备</div>
        </div>
    )
}
Nodevice = withRouter(Nodevice);

let Baddevice =(props)=>{
    return (
        <div className="baddevice">
            <img src="img/12.png" />
            <div className="desc">当前设备不可用</div>
        </div>
    )
}

let DeviceDataList =(props)=>{
    const {detaillist} = props;
    return (
        <ul style={list} className="homePageList">
            {_.map(detaillist,(detail)=> {
                let linestyleresult = linestyle("#52a3da", "#C00", `${detail.leftpecent}%`);
                return (
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
            })}
        </ul>
    )
}


let DeviceSwiper =(props)=>{
    let onChangeDevice =(deviceid)=>{
        //改变设备时
        props.dispatch(ui_setcurrentdeviceid(deviceid));
    }
    const {mydevicelist, devices} = props;
    return (
        <Swiper
            swiperOptions={{slidesPerView: 'auto'}}
            {...swiperOptions}
            onSlideChangeEnd={(swiper, event) => {
                console.log(swiper.activeIndex);
                let curdeviceid = mydevicelist[swiper.activeIndex];
                onChangeDevice(curdeviceid);
            }}
            >
            {
              _.map(mydevicelist,(deviceid)=>{

                  //判断当前设备是否有数据
                  let tmpdevice = devices[deviceid];
                  let {name,total,modeltype} = tmpdevice.realtimedata;
                  let getdata = _.get(tmpdevice,'realtimedata.getdata',false);

                  return (
                      <Slide
                          className="Demo-swiper__slide"
                          key={deviceid}
                          >
                          <div className="headContent">
                              <img src="img/1.png"/>
                              {getdata?(
                                  <div className="headContentInfo">
                                      <span className="i1">{modeltype}</span>
                                      <span className="i2">{name}</span>
                                      <span className="i3"><span>可直饮</span></span>
                                      <span className="i4">共净化{total}L</span>
                                  </div>):(
                                  <div className="headContentInfo">
                                        <div className="nodata">暂无数据</div>
                                  </div>
                                  )}
                          </div>
                      </Slide>
                  );
                })
            }
        </Swiper>
    )
}
DeviceSwiper = connect()(DeviceSwiper);


let HeadInfo =(props)=>{
    const {curdevicedata} = props;
    const {leftmodel,rightmodel} = curdevicedata;
    return (
        <div className="headInfo">
            {!!leftmodel && <span>{leftmodel.name} {leftmodel.resultstring}</span>}
            <span className="headInfoborder"></span>
            {!!rightmodel && <span>{rightmodel.name} {rightmodel.resultstring}</span>}
        </div>
    )
}



let Page = (props)=> {

    let onClickNewDevice = ()=> {
        props.history.push('/addnewdevice');
    }
    let onClickDevicelist = ()=> {
        props.history.push('/devicelist');
    };

    //curdeviceid当前设备
    //mydevicelist我的设备列表
    //数据库设备列表
    const {curdeviceid,mydevicelist,devices} = props;

    //判断是否有设备
    // if(mydevicelist.length === 0){
    //     return (<Nodevice />);
    // }

    //判断设备是否可用
    // let curdevice = devices[curdeviceid];
    // if(!curdevice){
    //   return (<Baddevice />);
    // }
    //判断设备是否有数据
    // let curdevicedata = curdevice.realtimedata;
    // if(!curdevicedata){
    //   return (<Baddevice />);
    // }

    // let {detaillist,leftmodel,rightmodel} = curdevicedata;
    // let getdata = _.get(curdevicedata,'getdata',false);
    // if(!getdata){
    //   return (<Baddevice />);
    // }
    //getdata = true;//是否获取到数据
    let curdevice = null;
    let curdevicedata = null;
    let detaillist = false;
    let iswatercut = false;
    if(!!curdeviceid){
        curdevice = devices[curdeviceid];
        curdevicedata = _.get(curdevice,'realtimedata',false);
        detaillist = _.get(curdevice,'realtimedata.detaillist',false);
        iswatercut  = _.get(curdevice,'realtimedata.iswatercut',false);
        //curdevicedata = !!curdevice && curdevice.hasOwnProperty("realtimedata")?curdevice.realtimedata:null;
        //detaillist = !!curdevicedata && curdevicedata.hasOwnProperty("detaillist")?curdevicedata.detaillist:false;
    }

    let ClickRadio = (iswatercut)=> {
        let deviceid = devices[curdeviceid].deviceid;
        props.dispatch(senddevicecmd_request({deviceid,cmd: 0,value:!iswatercut}));
    }

    return (
        <div className="homePageWamp">
            <div className="homePage">

                <div className="toolBar">
                    <div className='left' onClick={onClickNewDevice}>
                        +
                    </div>
                    <div className='center'>水质监测</div>
                    <div className='right' onClick={onClickDevicelist}>
                        <img src="img/head/1.png" />
                    </div>
                </div>

                { mydevicelist.length === 0 &&  <Nodevice />}
                { mydevicelist.length > 0 &&  <DeviceSwiper mydevicelist={mydevicelist} devices={devices} />}

                { !!curdevicedata && (curdevicedata.hasOwnProperty("leftmodel") || curdevicedata.hasOwnProperty("rightmodel"))  &&
                    <HeadInfo curdevicedata={curdevicedata}/>
                }

            </div>

            { !!detaillist && detaillist.length>0 &&
                <div className="HomeList">
                    <div className="ListTitle">
                        <div>滤芯状态</div>
                        <div>断水更换<Radio toggle checked={iswatercut} onClick={()=>{ClickRadio(iswatercut)}}/></div>
                    </div>
                </div>
            }

            { !!detaillist && detaillist.length>0?(
                <DeviceDataList detaillist={detaillist}/>
            ):(
                <div className="homePageList">
                </div>
            ) }


        </div>
    );
}


const mapStateToProps = ({device}) => {
    return {...device};
};

Page = connect(mapStateToProps)(Page);
Page = withRouter(Page);
export default Page;
