import React, { Component, PropTypes } from 'react';
import {Page,Button,Toolbar, ToolbarButton, Icon} from 'react-onsenui';
export default function MyPage(props){

    let homePage = {
        height: "62%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        backgroundImage: "linear-gradient(135deg, #52a3da, #5771c5)"
    };
    let toolBar = {
        background: "none",
        border: "none"
    };
    let headContent = {
        textAlign: "center",
        padding: "10px"
    };
    let headInfo = {
        border: "1px solid #7abbf5",
        padding: "5px 15px",
        borderRadius: "100px",
        fontSize: "14px",
        color: "#FFF"
    };
    let headInfoborder = {
        borderRight: "1px solid #7abbf5",
        margin: "0 10px"
    };
    let HomeList = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "space-between",
        flexDirection: 'column'
    };
    let ListTitle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: "1",
        paddingLeft: "15px",
        borderBottom: "1px solid #DDD",
        background: "#EEE",
        color: "#5694dd"
    };
    let list = {
        listStyle: "none",
        padding: "15px",
        margin: "0"
    };
    let linestyle = (startColor, endColor, widthStyle)=> (
    {
        backgroundImage: "linear-gradient(135deg, " + startColor + ", " + endColor + ")",
        height: "12px",
        borderRadius: "12px",
        width: widthStyle
    }
    );
    let listLi = {
        marginBottom: "10px",
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
        display:"flex",
        justifyContent: "space-between",
        marginBottom: "2px"
    };
    let headImg = {
        width:"60%",
    };

    return (
        <Page>
            <div style={homePage}>
                <Toolbar style={toolBar}>
                    <div className='center' style={{color:"#FFF",fontSize:"18px"}}>水质监测</div>
                    <div className='left'>
                        <ToolbarButton>
                            <Icon icon='md-plus' style={{color:"#FFF",fontSize:"16px"}}></Icon>
                        </ToolbarButton>
                    </div>
                    <div className='right'>
                        <ToolbarButton>
                            <Icon icon='md-menu' style={{color:"#FFF",fontSize:"16px"}}></Icon>
                        </ToolbarButton>
                    </div>
                </Toolbar>

                <div style={headContent}>
                    <img src="1.png" style={headImg} />
                </div>
                <div style={headInfo}>
                    <span>原水TDS-224不健康</span>
                    <span style={headInfoborder}></span>
                    <span>净水TDS-22 可直饮</span>
                </div>
            </div>

            <div style={HomeList}>
                <div style={ListTitle}>
                    <span>滤芯状态</span>
                    <ToolbarButton>更换</ToolbarButton>
                </div>
                <ul style={list}>


                    <li style={listLi}>
                        <div style={listhead}>
                            <div>
                                <span style={listname}>5微米PP滤芯</span>
                                <span style={listinfo}>剩余20天</span>
                            </div>
                            <span style={percentage}>30%</span>
                        </div>
                        <div style={lineBg}>
                            <div style={linestyle("#52a3da","#C00", "20%")}></div>
                        </div>
                    </li>

                    
                    <li style={listLi}>
                        <div style={listhead}>
                            <div>
                                <span style={listname}>5微米PP滤芯</span>
                                <span style={listinfo}>剩余20天</span>
                            </div>
                            <span style={percentage}>30%</span>
                        </div>
                        <div style={lineBg}>
                            <div style={linestyle("#52a3da","#5771c5", "60%")}></div>
                        </div>
                    </li>


                    <li style={listLi}>
                        <div style={listhead}>
                            <div>
                                <span style={listname}>5微米PP滤芯</span>
                                <span style={listinfo}>剩余20天</span>
                            </div>
                            <span style={percentage}>100%</span>
                        </div>
                        <div style={lineBg}>
                            <div style={linestyle("#52a3da","#5771c5", "100%")}></div>
                        </div>
                    </li>
                </ul>
            </div>
        </Page>
    );
}
