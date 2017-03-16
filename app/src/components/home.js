import React, { Component, PropTypes } from 'react';
import {  Button, Icon, Input, List, Radio} from 'semantic-ui-react'
import '../../public/css/home.css';

export default function MyPage(props){




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
    let onClickDevicelist =()=>{
        props.history.push('/devicelist');
    };
    return (
        <div>
            <div className="homePage">

                <div className="toolBar">
                    <div className='left'>
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
                    <span>原水TDS-224不健康</span>
                    <span className="headInfoborder"></span>
                    <span>净水TDS-22 可直饮</span>
                </div>

            </div>

            <div className="HomeList">

                <div className="ListTitle">
                    <div>滤芯状态</div>
                    <div>断水更换<Radio toggle /></div>
                </div>
                <ul style={list}>
                    <li style={listLi}>
                        <div style={listhead}>
                            <div>
                                <span style={listname}>5微米PP滤芯</span>
                                <span style={listinfo}>剩余20天</span>
                            </div>
                            <div>
                                <span style={percentage}>30%</span>
                                <span>复位</span>
                            </div>
                        </div>
                        <div style={lineBg}>
                            <div style={linestyle("#52a3da","#C00", "20%")}></div>
                        </div>
                    </li>
                </ul>

            </div>

        </div>
    );
}
