/**
 * Created by wangxiaoqing on 2017/3/20.
 */
import React, { Component, PropTypes } from 'react';

export default function MyPage(props){
    let onClickPage=(name)=>{
        if(name=="back"){
            props.history.goBack();
        }else{
            props.history.push(name);
        }
    };
    return (
        <div onClick={()=>{onClickPage(props.url)}}>{props.value}</div>
    );
}
