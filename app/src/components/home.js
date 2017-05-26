import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon, Input, List, Radio} from 'semantic-ui-react'
import '../../public/css/home.css';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../node_modules/react-dynamic-swiper/lib/styles.css';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';

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
        marginBottom: "2px"
    };
    let headImg = {
        width: "60%"
    };

    let onClickNewDevice = ()=> {
        props.history.push('/addnewdevice');
    }
    let onClickDevicelist = ()=> {
        props.history.push('/devicelist');
    };
    const {curdevicedata} = props;
    let {name,total,modeltype,leftmodel,rightmodel,detaillist,getdata} = curdevicedata;
    getdata = true;//是否获取到数据
    let detaillistco = [];
    if(getdata){//是否获取到数据
      _.map(detaillist,(detail)=> {
          let linestyleresult = linestyle("#52a3da", "#C00", `${detail.leftpecent}%`);
          detaillistco.push(
              <li style={listLi} key={detail.name}>
                  <div style={listhead}>
                      <div>
                          <span style={listname}>{detail.name}</span>
                          <span style={listinfo}>剩余{detail.leftday}天</span>
                      </div>
                      <div>
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

    // let devicedata =
    // {
    //     name:getgrade(total,deviceconfig.gradetotal),
    //     total:`${total}`,
    //     modeltype:'TDS002',
    //     leftmodel:{
    //         name:`原水TDS-${data01}`,
    //         resultstring:getgrade(data01,deviceconfig.gradeleft),
    //     },
    //     rightmodel:{
    //         name:`净水TDS-${data23}`,
    //         resultstring:getgrade(data23,deviceconfig.graderight),
    //     },
    //     detaillist:
    //         [
    //             {
    //                 name:'5微米PP滤芯',
    //                 leftday:`${left89}`,
    //                 leftpecent:`${leftpecent89}`,
    //             },
    //             {
    //                 name:'颗粒活性炭',
    //                 leftday:`${left1011}`,
    //                 leftpecent:`${leftpecent1011}`,
    //             },
    //             {
    //                 name:'1微米PP滤芯',
    //                 leftday:`${left1011}`,
    //                 leftpecent:`${leftpecent1011}`,
    //               },
    //             {
    //                 name:'反渗透RO膜',
    //                 leftday:`${left1415}`,
    //                 leftpecent:`${leftpecent1415}`,
    //               },
    //             {
    //                 name:'后置活性炭',
    //                 leftday:`${left1617}`,
    //                 leftpecent:`${leftpecent1617}`,
    //               },
    //
    //         ],
    // };

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
                        console.log("change swiper");
                    }}
                    >

                    <Slide
                        className="Demo-swiper__slide"
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
                    </Slide>

                    <Slide
                        className="Demo-swiper__slide"
                        >
                        <div className="headContent">
                            <img src="img/1.png"/>
                            <div className="headContentInfo">
                                <span className="i1">TDS002</span>
                                <span className="i2">优</span>
                                <span className="i3"><span>可直饮</span></span>
                                <span className="i4">共净化2800L</span>
                            </div>
                        </div>
                    </Slide>

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


const mapStateToProps = ({devicedata}) => {
    return devicedata;
};

Page = connect(mapStateToProps)(Page);
Page = withRouter(Page);
export default Page;
