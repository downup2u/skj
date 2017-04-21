import React, { Component, PropTypes } from 'react';
import '../../../public/css/bigimg.css';
import _ from 'lodash'; 
import { connect } from 'react-redux';
import '../../../public/css/share.css';
import { 
    share_data_updata
} from '../../actions/index.js';


let Page = ({show,dispatch})=>{

    let hide = (type)=>{
        dispatch(share_data_updata(type));
    }

    return (
        <div 
            className={show?"shareContent":"shareContent hide"}
            >
            <div 
                className="shareBox"
                >
                <div className="shareList">
                    <div className="li">
                        <img src="img/share/1.png" />
                        <span>微信</span>
                    </div>
                    <div className="li">
                        <img src="img/share/2.png" />
                        <span>QQ空间</span>
                    </div>
                    <div className="li">
                        <img src="img/share/3.png" />
                        <span>微信朋友圈</span>
                    </div>
                    <div className="li">
                        <img src="img/share/4.png" />
                        <span>QQ</span>
                    </div>
                </div>
                <div className="shareClose" onClick={()=>{hide(false)}}>取消</div>
            </div>
        </div>
    )
};

let mapStateToProps =  ({share}) =>{
    return {...share};
};
Page = connect(mapStateToProps)(Page);
export default Page;


