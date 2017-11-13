import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon, Input, List, Radio} from 'semantic-ui-react'
import '../../public/css/home.css';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../node_modules/react-dynamic-swiper/lib/styles.css';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {ui_setcurrentdeviceid,senddevicecmd_request, set_weui, resetdevicecmd_request} from '../actions/index.js';
import Waterwave from './waterwave.js';

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

    backgroundImage: `linear-gradient(90deg, ${startColor}, ${endColor})`,
    height: "12px",
    borderRadius: "12px",
    width: widthStyle
});
let listLi = {
    marginBottom: "10px"
};
let listinfo = {
    color: "#666",
    fontSize: "14px",
    marginLeft: "15px"
};
let listname = {
    fontSize: "18px"
};
let lineBg = {
    borderRadius: "12px",
    backgroundColor: "#EEE"
};
let percentage = {
    color: "#00cbc9",
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
            <img src="img/h2.png" />
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

export class DeviceDataList extends Component {

    constructor(props) {  
        super(props);  
        this.state = {setoneinput: ''};
    } 

    // resetdevicecmd_request
    // deviceid:设备id
    // cmd:'resetall'/'resetone'/'setone'/'setvisible'【resetall表示实时水流重置,resetone表示复位1个滤芯,setone表示设置一个滤芯,setvisible表示设置滤芯是否可见】
    // indexname:'5微米PP滤芯'/'颗粒活性炭'【表示滤芯名字，当cmd为'resetone'/'setone'/'setvisible'有效】
    // value:用户输入的值，仅当cmd为'setone'/'setvisible'有效，其中setone输入数字，setvisible为bool类型
    // type:'vol'/'day'【vol表示复位流量,day表示复位天数】
    resetdevicecmd =(name, datatp, tp)=>{
        let text = '';
        let comformtitle = "确认";
        if(tp==="resetone"){
            text = `您确定要复位${name}的`;
            if(datatp=="vol"){ text = `${text}流量?`; }
            if(datatp=="day"){ text = `${text}天数?`; }
        }
        if(tp ==="setone"){
            if(datatp=="vol"){ comformtitle = "请输入流量"; }
            if(datatp=="day"){ comformtitle = "请输入天数"; }
            text = <div className="setoneform"><input type="number" style={{border: "1px solid #EEE", width: "100%", height: "40px", borderRadius: "6px",textAlign: "center"}} onChange={(e)=>{ this.setState({setoneinput: e.target.value})}} /></div>
        }
        this.props.dispatch(
            set_weui({
                confirm:{
                    show : true,
                    title : comformtitle,
                    text : text,
                    //
                    buttonsClose : ()=>{},
                    //确认收货
                    buttonsClick : ()=>{
                        // props.dispatch(senddevicecmd_request({deviceid,cmd: 1,value:detailindex}));
                        let payload = {
                            deviceid : this.props.curdeviceid,
                            cmd : tp,
                            indexname : name,
                            value : parseInt(this.state.setoneinput),
                            warningpercentvalue:0.95,//这里可以设置报警的值,默认0.95,从输入框输入,输入框显示1～100，转成float类型
                            type : datatp
                        }
                        this.props.dispatch(resetdevicecmd_request(payload));
                    }
                }}
            )
        )
    }

    render(){
        const {detaillist, maxleftpecent,onClickReset, showbackbtn, detaildaylist, detailvollist } = this.props;
        return (
            <ul style={list} className="homePageList">
                {_.map(detaillist,(detail,detailindex)=> {

                    if(detail.isvisiable){
                        // let color1 = detail.leftpecent>maxleftpecent?"#C00":"#4bcef5";
                        // let color2 = detail.leftpecent>maxleftpecent?"#C00":"#4bf3ee";

                        // color1 = detail.leftpecent>=100?"#CCC":color1;
                        // color2 = detail.leftpecent>=100?"#CCC":color2;
                        //#FF9224 橙色
                        //#EA0000 红色
                        //#00BB00 绿色

                        //百分比
                        let percent1 = (detail.v / detail.t).toFixed(2);
                        let color1 = null;
                        if(percent1<0.95){
                            color1 = "#00BB00";
                        }
                        if(percent1>=0.95 && percent1 < 1){
                            color1 = "#FF9224";
                        }
                        if(percent1 >= 1){
                            color1 = "#EA0000";
                            percent1 = 1;
                        }
                        let percent2 = (detail.detailvollist.v / detail.detailvollist.t).toFixed(2);
                        let color2 = null;
                        if(percent2<0.95){
                            color2 = "#00BB00";
                        }
                        if(percent2>=0.95 && percent2 < 1){
                            color2 = "#FF9224";
                        }
                        if(percent2 >= 1){
                            color2 = "#EA0000";
                            percent2 = 1;
                        }

                        let linestyleresult1 = linestyle(color1, color1, `${percent1*100}%`);
                        let linestyleresult2 = linestyle(color2, color2, `${percent2*100}%`);


                        return (
                            <li className="devicedatalistli" key={detail.name}>
                                <span className="listname">{detail.name}</span>
                                <div className="datadata">
                                    <span className="title">天数</span>
                                    <div className="listprocess">
                                        <div style={lineBg}>
                                            <div style={linestyleresult1}></div>
                                        </div>
                                    </div>
                                    <span className="datanumber">{parseInt(percent1*100)}%</span>
                                    { showbackbtn && <span className="backdatabtn" onClick={this.resetdevicecmd.bind(this, detail.name, 'day', "resetone")}>复位</span> }
                                    { showbackbtn && <span className="setdatabtn" onClick={this.resetdevicecmd.bind(this, detail.name, 'day', "setone")}>设置</span> }
                                </div>

                                <div className="datadata">
                                    <span className="title">流量</span>
                                    <div className="listprocess">
                                        <div style={lineBg}>
                                            <div style={linestyleresult2}></div>
                                        </div>
                                    </div>
                                    <span className="datanumber">{parseInt(percent2*100)}%</span>

                                    { showbackbtn && <span className="backdatabtn" onClick={this.resetdevicecmd.bind(this, detail.name, 'vol', "resetone")}>复位</span> }
                                    { showbackbtn && <span className="setdatabtn" onClick={this.resetdevicecmd.bind(this, detail.name, 'vol', "setone")}>设置</span> }
                                </div>

                            </li>
                        )
                    }else{
                        return (<li style={{display: "none"}} key={detail.name}></li>)
                    }
                })}
            </ul>
        )
    }
}

DeviceDataList = withRouter(DeviceDataList);


let DeviceSwiper =(props)=>{
    let onChangeDevice =(deviceid)=>{
        //改变设备时
        props.dispatch(ui_setcurrentdeviceid(deviceid));
    }
    const {mydevicelist, devices} = props;
    //let showindex = mydevicelist.indexOf(curdeviceid);
    return (
        <Swiper
            swiperOptions={{
                slidesPerView: 'auto',
                initialSlide : 0,
            }}

            {...swiperOptions}
            onSlideChangeEnd={(swiper, event) => {
                // console.log(swiper.activeIndex);
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
                    let lr = tmpdevice.lr || 0;
                    return (
                        <Slide
                            className="Demo-swiper__slide"
                            key={deviceid}
                            >
                            <div className="headContent">

                                <div className="waterwave">
                                    <div><Waterwave id={deviceid}/></div>
                                </div>
                                <img src="img/h1.png" className="bg"/>
                                {getdata?(
                                    <div className="headContentInfo">
                                        <span className="i2">{name}</span>
                                        <span className="i1">{modeltype}</span>
                                        <span className="i3">当前水质</span>
                                        <span className="i4">共净化{lr}L</span>
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

const mapStateToPropsDeviceSwiper = ({device:{devices}}) => {
    return {devices};
};
DeviceSwiper = connect(mapStateToPropsDeviceSwiper)(DeviceSwiper);


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


export class Page extends Component {

    constructor(props) {  
        super(props);  
        this.state = {showbackbtn: false};
    } 

    //复位操作按钮隐藏显示
    toggleShowbackBtn =()=>{
        this.setState({showbackbtn : !this.state.showbackbtn});
    }

    componentWillMount(){
        const {mydevicelist} = this.props;
        if(!!mydevicelist){
            if(mydevicelist.length>0){
                this.props.dispatch(ui_setcurrentdeviceid(mydevicelist[0]));
            }
        }
    }

    render(){

        const {props} = this;
        const {curdeviceid, mydevicelist, devices, maxleftpecent} = props;
        //detaildaylist, detailvollist

        let onClickNewDevice = ()=> {
            props.history.push('/addnewdevice');
        }

        let onClickDevicelist = ()=> {
            props.history.push('/devicelist');
        };

        // console.log(props);

        let curdevice = null;
        let curdevicedata = null;
        let detaillist = [];
        let iswatercut = false;
        let deviceid = ""

        if(!!curdeviceid){
            curdevice = devices[curdeviceid];
            deviceid = devices[curdeviceid].deviceid;
            curdevicedata = _.get(curdevice,'realtimedata',false);

            // console.log(curdevice);

            // console.log(curdevice);
            let d1 = curdevice.detaildaylist || [];
            let d2 = curdevice.detailvollist || [];

            let detaildatamap = {};
            _.map(d1, (daylist,i)=>{
                detaildatamap[daylist.name] = daylist;
            })
            _.map(d2, (vollist,i)=>{
                detaildatamap[vollist.name] = detaildatamap[vollist.name] || {};
                detaildatamap[vollist.name]["detailvollist"] = vollist;
            })
            if(!!detaildatamap["5微米PP滤芯"]){ detaillist.push(detaildatamap["5微米PP滤芯"]) }
            if(!!detaildatamap["颗粒活性炭"]){ detaillist.push(detaildatamap["颗粒活性炭"]) }
            if(!!detaildatamap["1微米PP滤芯"]){ detaillist.push(detaildatamap["1微米PP滤芯"]) }
            if(!!detaildatamap["反渗透RO膜"]){ detaillist.push(detaildatamap["反渗透RO膜"]) }
            if(!!detaildatamap["后置活性炭"]){ detaillist.push(detaildatamap["后置活性炭"]) }
            // console.log(detaillist);

            iswatercut = curdevicedata.iswatercut;

        }
        let onClickReset = (detailindex)=>{
          let text = "你确认需要复位吗？";
          props.dispatch(
              set_weui({
                  confirm:{
                      show : true,
                      title : "确认",
                      text : text,
                      //
                      buttonsClose : ()=>{},
                      //确认收货
                      buttonsClick : ()=>{
                          props.dispatch(senddevicecmd_request({deviceid,cmd: 1,value:detailindex}));
                      }
                  }}
              )
          );
        }

        let resetdevicecmdall =()=>{
            props.dispatch(
                set_weui({
                    confirm:{
                        show : true,
                        title : "确认",
                        text : "您确定要复位该设备所有的数据吗？",
                        //
                        buttonsClose : ()=>{},
                        //确认收货
                        buttonsClick : ()=>{
                            // props.dispatch(senddevicecmd_request({deviceid,cmd: 1,value:detailindex}));
                            let payload = {
                                deviceid : deviceid,
                                cmd : 'resetall',
                                indexname : '',
                                value : '',
                                type : 'vol'
                            }
                            props.dispatch(resetdevicecmd_request(payload));
                        }
                    }}
                )
            )

        }
        //切断和开通水成功后的提示
        // let ClickDuanshuiSuccess = ()=> {
        //     props.dispatch(
        //         set_weui({
        //           toast:{
        //             show:true,
        //             text:`滤芯正在保护中...`,
        //             type:'success'
        //           }
        //         })
        //     )
        // }
        let ClickDuanshui = (iswatercut)=> {

            let text = <div>
                            <input
                              style={{
                                width: "100%",
                                border: "1px solid #EEE",
                                height: "50px",
                                borderRadius : "6px",
                                textIndent: "15px"
                              }}
                              id="inutpwdwatercutuserpassword"
                              placeholder={"请输入帐号密码"} /></div>;
            props.dispatch(
                set_weui({
                    confirm:{
                        show : true,
                        title : "输入密码",
                        text : text,
                        buttonsClose : ()=>{},
                        buttonsClick : ()=>{
                            // console.log(this.refs.myInput.value);
                            const inputid = document.getElementById('inutpwdwatercutuserpassword');
                            // console.log(`inputid==>${inputid.value}`);
                            props.dispatch(senddevicecmd_request({deviceid,cmd: 0,value:!iswatercut,password:inputid.value}));
                            // ClickDuanshuiSuccess();
                        }
                    }}
                )
            )
        }
        let ClickRadio = (iswatercut)=> {

            let text = !iswatercut?"你确认需要断水吗？":"你确认要开通水源吗？";
            props.dispatch(
                set_weui({
                    confirm:{
                        show : true,
                        title : "确认",
                        text : text,
                        buttonsClose : ()=>{},
                        buttonsClick : ()=>{
                            // let deviceid = devices[curdeviceid].deviceid;
                            // props.dispatch(senddevicecmd_request({deviceid,cmd: 0,value:!iswatercut}));
                            ClickDuanshui(iswatercut);
                        }
                    }}
                )
            )
        }


        console.log(`是否断水:${iswatercut}`);
        return (
            <div className="homePageWamp">

                <div
                    className="homePage"
                    style={{flexGrow:!!detaillist && detaillist.length>0?0:1}}
                    >
                    <div className="toolBar">
                        <div className='left' onClick={onClickNewDevice}>
                            <img src="img/shuikj_1.png" />
                        </div>
                        <div className='center'>水质监测</div>
                        <div className='right' onClick={onClickDevicelist}>
                            <img src="img/shuikj_2.png" />
                        </div>
                    </div>

                    { mydevicelist.length === 0 &&  <Nodevice />}
                    { mydevicelist.length > 0 &&  <DeviceSwiper mydevicelist={mydevicelist} />}

                    { !!curdevicedata && (curdevicedata.hasOwnProperty("leftmodel") || curdevicedata.hasOwnProperty("rightmodel"))  &&
                        <HeadInfo curdevicedata={curdevicedata}/>
                    }

                </div>

                { detaillist.length>0 &&
                    <div className="HomeList">
                        <img src="img/head/3.png" />
                        <div className="ListTitle">
                            <div className="tit">滤芯状态</div>
                            <div className="setbackliuliang" onClick={resetdevicecmdall}>流量重置</div>
                            <div className="ListTitleRadio"><Radio toggle checked={iswatercut} onClick={()=>{ClickRadio(iswatercut)}}/>断水更换</div>
                            <div className={this.state.showbackbtn ? "showbackbtn sel": "showbackbtn"} onClick={this.toggleShowbackBtn}>{this.state.showbackbtn ? "取消复位": "复位操作"}</div>
                        </div>
                    </div>
                }

                { detaillist.length>0 ?(
                    <DeviceDataList detaillist={detaillist} maxleftpecent={maxleftpecent} dispatch={props.dispatch} curdeviceid = {deviceid} onClickReset={onClickReset} showbackbtn={this.state.showbackbtn}/>
                ):null }


            </div>
        );
    }
}


const mapStateToProps = ({device, app:{maxleftpecent}}) => {
    return {...device, maxleftpecent};
};

Page = connect(mapStateToProps)(Page);
Page = withRouter(Page);
export default Page;
