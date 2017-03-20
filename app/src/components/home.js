import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {  Button, Icon, Input, List, Radio} from 'semantic-ui-react'
import '../../public/css/home.css';

let Page =(props)=>{

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
    let onClickDevicelist =()=>{
        props.history.push('/devicelist');
    };
    const {curdevicedata} = props;
    let detaillistco = [];
    for (let detail of curdevicedata.detaillist){
        let linestyleresult = linestyle("#52a3da","#C00", `${detail.leftpecent}%`);
        detaillistco.push( <ul style={list} key={detail.name}>
            <li style={listLi}>
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
        </ul>);
    }


    return (
        <div>
            <div className="homePage">

                <div className="toolBar">
                    <div className='left' onClick={onClickNewDevice}>
                        +
                    </div>
                    <div className='center' style={{color:"#FFF",fontSize:"18px"}}>水质监测</div>
                    <div className='right' onClick={onClickDevicelist}>
                        ...
                    </div>
                </div>
                <div className="headContent">
                    <img src="1.png"/>
                </div>
                <div className="headInfo">
                    <span>{curdevicedata.leftmodel.name} {curdevicedata.leftmodel.resultstring}</span>
                    <span className="headInfoborder"></span>
                    <span>{curdevicedata.rightmodel.name} {curdevicedata.rightmodel.resultstring}</span>
                </div>

            </div>

            <div className="HomeList">

                <div className="ListTitle">
                    <div>滤芯状态</div>
                    <div>断水更换<Radio toggle /></div>
                </div>
                    {detaillistco}

            </div>

        </div>
    );
}


const mapStateToProps = ({devicedata}) => {
    return devicedata;
};

Page = connect(mapStateToProps)(Page);
export default Page;

