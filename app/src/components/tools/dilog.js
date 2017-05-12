import React, { Component } from 'react';
import '../../../public/css/bigimg.css';
import _ from 'lodash'; 
import { connect } from 'react-redux';
import '../../../public/css/share.css';
import { 
    share_data_updata
} from '../../actions/index.js';
import {
    shareQQ,
    shareWechatFriend,
    shareWechatCircle,
    shareQQFriend
}from '../../env/share';

let Page = ({show,sharesetting,dispatch})=>{

    let hide = (type)=>{
        dispatch(share_data_updata(type));
    }
    let onClickShare = (fn)=>{
        fn(sharesetting,(result)=>{
             alert(JSON.stringify(result));
            console.log(`result:${JSON.stringify(result)}`);
        });
    }
    return (
        <div 
            className="dilogBox"
            >
            <div 
                className="shareBox"
                >
                <div className="shareList">
                    <div onClick={()=>{onClickShare(shareWechatFriend)}} className="li">
                        <img src="img/share/1.png" />
                        <span>微信</span>
                    </div>
                    <div onClick={()=>{onClickShare(shareQQ)}} className="li">
                        <img src="img/share/2.png" />
                        <span>QQ空间</span>
                    </div>
                    <div onClick={()=>{onClickShare(shareWechatCircle)}} className="li">
                        <img src="img/share/3.png" />
                        <span>微信朋友圈</span>
                    </div>
                    <div onClick={()=>{onClickShare(shareQQFriend)}} className="li">
                        <img src="img/share/4.png" />
                        <span>QQ</span>
                    </div>
                </div>
                <div className="shareClose" onClick={()=>{hide(false)}}>取消</div>
            </div>
        </div>
    )
};

let mapStateToProps =  ({share:{show},app:{sharesetting}}) =>{
    return {show,sharesetting};
};
Page = connect(mapStateToProps)(Page);
export default Page;


