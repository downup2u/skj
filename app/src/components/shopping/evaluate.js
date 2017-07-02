/*
 * 商城首页
 * */
import React, { Component } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../../../public/css/shoppingproevaluate.css';
import { productcommentsfromproduct } from '../../actions/sagacallback.js';
import InfinitePage from '../controls/listview';
import moment from 'moment';
import NavBar from '../newnav.js';
import $ from "jquery";

let Page = (props) => {

    let onClickPage = (name)=> {
        props.history.push(name);
    };

    let updateContent = (item)=> {
        return  (
            <div className="li" key={item._id}>
                <div className="tt">
                    <img src={item.creator.profile.avatar} />
                    <div>
                        <span className="name">{item.creator.profile.nickname}</span>
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

            <NavBar back={true} title="商品评价" />

            <div className="proinfo" id="proinfoContent">
                <img src={props.proinfo.picurl} />
                <div>
                    <span>{props.proinfo.name}</span>
                    <span>
                        <span className="price">{props.proinfo.pricenow}</span>
                        <span className="markprice">{props.proinfo.pricemarket}</span>
                    </span>
                </div>
            </div>

            <div className="proList"
                style={{
                    width: "100%",
                    overFlow: "hidden"
                }}>
                <InfinitePage
                    listtypeid={`evaluate${props.match.params.id}`}
                    pagenumber = {30}
                    updateContent= {updateContent.bind(this)}
                    queryfun= {productcommentsfromproduct}
                    listheight= {window.innerHeight-147}
                    query = {{product: props.match.params.id}}
                    sort = {{created_at: -1}}
                />
            </div>
        </div>
    )
}

let mapStateToProps = ({shop:{products}},props) => {
    let proinfo = products[props.match.params.id];
    return { proinfo };
}

Page = connect(mapStateToProps)(Page);
export default Page;
