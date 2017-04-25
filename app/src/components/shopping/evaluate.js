/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../../../public/css/shoppingproevaluate.css';
import { productcommentsfromproduct } from '../../actions/sagacallback.js';
import InfinitePage from '../controls/infinitecontrol';
import moment from 'moment';

// commenttxt
// :
// "hahaha"
// created_at
// :
// "2017-04-25T14:09:19.819Z"
// creator
// :
// "58f078f3c2065a04efdb828d"
// order
// :
// "58fae7ed451c4760ea54ab36"
// product
// :
// "58f0744bc2065a04efdb8289"
// __v
// :
// 0
// _id
// :
// "58ff588f7ae81453021ab280"


let Page = (props) => {
    let onClickReturn = ()=> {
        props.history.goBack();
    };
    let onClickPage = (name)=> {
        props.history.push(name);
    };
    let updateContent = (item)=> {
        let proinfo = props.products[item.product];
        return  (
            <div className="li" key={item._id}>
                <div className="tt">
                    <img src={proinfo.picurl}/>
                    <div>
                        <span className="name">{proinfo.name}</span>
                        <span className="data">{moment(item.created_at).format("MM月DD日 HH时mm分")}</span>
                    </div>
                </div>
                <span className="content">
                    <span>{item.commenttxt}</span>
                </span>
            </div>
        );
        
    };
    return (
        <div className="ShoppingproevaluatePage">
            <div className="ProinfoPageHead">
                <Icon name="angle left" onClick={()=>{onClickReturn()}} />
                <span className="title">商品评价</span>
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

let mapStateToProps = ({shop:{products}}) => {
    return { products };
}

Page = connect(mapStateToProps)(Page);
export default Page;
