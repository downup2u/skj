/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../../../public/css/shoppingproevaluate.css';
import { productcommentsfromproduct } from '../../actions/sagacallback.js';
import InfinitePage from '../controls/infinitecontrol';

let Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    };
    let onClickPage = (name)=> {
        props.history.push(name);
    };
    let updateContent = (item)=> {
        let isselected = props.toordercarts.hasOwnProperty(item._id);
        return  (
            <div className="li" key={item._id}>
                <div className="tt">
                    <img src="img/shopping/14.png"/>
                    <div>
                        <span className="name">水可净智能水盒子</span>
                        <span className="data">2016-09-09</span>
                    </div>
                </div>
                <span className="content">
                    <span>这里是评价内容这里是评价内容这里是评价内容这里是评价内容这里是评价内容</span>
                </span>
            </div>
        );
        
    };
    return (
        <div className="ShoppingproevaluatePage">
            <div className="ProinfoPageHead">
                <Icon name="angle left" onClick={()=>{onClickReturn()}} />
                <span className="title">商品详情</span>
                <span className="imgcont">
                    <img src="img/head/1.png"/>
                </span>
            </div>

            <div className="proList" 
                style={{
                    height:(window.innerHeight-48)+"px",
                    width: "100%",
                    overFlow: "hidden"
                }}>
                <InfinitePage
                    pagenumber = {30}
                    updateContent= {updateContent.bind(this)} 
                    queryfun= {productcommentsfromproduct}
                    listheight= {window.innerHeight-48}
                    query = {{product: props.match.params.id}}
                    sort = {{created_at: -1}}
                />
            </div>
        </div>
    )
}

let mapStateToProps = ({shop,shopcart}) => {
    return {...shop};
}

Page = connect(mapStateToProps)(Page);
export default Page;
