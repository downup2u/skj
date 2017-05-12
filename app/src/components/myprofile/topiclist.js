import React, { Component } from 'react';
import NavBar from '../newnav.js';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import '../../../public/css/mytopiclist.css';
import Bigimg from '../tools/bigimg.js';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import moment from 'moment';
import {ui_setmytopiclistinited,getmytopic_request} from '../../actions';
import { uicommentimg } from '../../actions/index.js';

import { getmytopic } from '../../actions/sagacallback';
import InfinitePage from '../controls/infinitecontrol';

let TopicInfo = (props)=>{
    const {iteminfo, dispatch} = props;
    let piccos = [];
    let pics = iteminfo.picurl;
    //点击显示大图
    let clickimg = (pic, index)=>{
        let imgObj = {
          bigimgshow : true,
          bigimglist : pic,
          bigimgindex : index
        };
        dispatch(uicommentimg(imgObj));
    }
    pics.forEach((picurl,index)=>{
        piccos.push(<div key={index}><img src={picurl} onClick={()=>{clickimg(iteminfo.picurl, index)}}/></div>);
    });
    return (
        <div className="li" onClick={props.onClick}>
            <div className="title"></div>
                <div className="content">
                    <div>{iteminfo.title}</div>
                    <div className="imglist">
                        {piccos}
                    </div>
                </div>
                <div className="lnk">
                    <div>{moment(iteminfo.created_at).format("MM月DD日 HH时mm分")}</div>
                    <div className="myCommentLnk">
                        <div className="lnkAddCommunity" >
                        <Icon name="commenting outline"/>
                        {iteminfo.comments.length}
                    </div>
                    <div className="lnkZhan">
                        <Icon name="thumbs outline up"/>
                        {iteminfo.loves.length}
                    </div>
                </div>
            </div>
        </div>
    );
}

class Page extends Component {

    onClick =(iteminfo)=>{
        this.props.history.push(`/communityinfo/${iteminfo._id}`);
    }

    rowRenderer = (item)=> {
        return (
            <TopicInfo 
                dispatch={this.props.dispatch}
                key={item._id} 
                onClick={()=>{this.onClick(item)}}
                iteminfo={item}
                />
        );

    }

    render() {
        return (
            <div 
                className="myTopicListPage"
                style={{height:window.innerHeight+"px"}}
                >
                <NavBar 
                    back={true}
                    title="我的帖子" 
                    />
                <div className="cont">
                    <InfinitePage
                        pagenumber = {20}
                        updateContent= {this.rowRenderer} 
                        queryfun= { getmytopic }
                        listheight={window.innerHeight-48}
                        sort = {{created_at: -1}}
                        query = {{}}
                    />
                </div>
                <Bigimg />
            </div>
        );
    }
}


Page = connect()(Page);
export default Page;