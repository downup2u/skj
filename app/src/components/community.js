import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input, Grid, Popup  } from 'semantic-ui-react';

import { connect } from 'react-redux';
import {
    ui_settopiclistinited,
    gettopiclist_request,
    uicommentshow,
    uicommenthide
} from '../actions/index.js';
import '../../public/css/feed.css';
import NavBar from './nav2.js';


import CommentExampleComment from './community_comment.js';
import FeedExampleBasic from './community_topic.js';
import FeedReplyForm from './community_reply.js';
import TopTip from './community_topictip';


export class Topic extends React.Component {
    componentWillMount() {
    }

    render() {
        let commentsco = [];
        for (let commentid of this.props.topic.comments) {
            commentsco.push(<CommentExampleComment key={commentid}
                                                   comment={this.props.comments[commentid]} {...this.props} />);
        }
        return (
            <div onClick={()=>{this.props.onClickTopic(this.props.topic._id);}}>
                <FeedExampleBasic topic={this.props.topic} {...this.props} />

                <div className="commentlistcontent">
                    <Comment.Group>
                        <div className="title">最热评论</div>
                        {commentsco}
                    </Comment.Group>
                </div>
            </div>);
    }
}


export class Page extends React.Component {

    componentWillMount() {
        this.props.dispatch(ui_settopiclistinited(true));
        let queryobj = {};
        this.props.dispatch(gettopiclist_request({
            query:queryobj,
            options:{
                sort:{created_at:-1},
                offset: 0,
                limit: 10,
            }
        }));

        console.log("--------->comm:componentWillMount");
    }

    HotLnk = (data)=> {
        // props.navigator.pushPage({
        // comp: TopicDetail,
        // props: data
        // });
    };
    onClickPage = ()=> {//点击空白处，隐藏?如何判断点击空白
        this.props.dispatch(uicommenthide());
    };
    onClickTopic = (topicid)=> {//点击空白处，隐藏?如何判断点击空白
        this.props.history.push(`/communityinfo/${topicid}`);
    };
    stopDefault = (e)=> {
        e.stopPropagation
    };

    //新建帖子
    addNewCommunity = (topicid)=> {
        this.props.history.push(`/communityinfo/${topicid}`);
    };

    addNewCommunityHotlnk = ()=>{
        this.props.history.push('/newtopic');
    };

    render() {
        let ToptipCo = null;
        if(this.props.useralerttopiclist.length > 0){
            let useralerttopicnew = this.props.useralerttopics[this.props.useralerttopiclist[0]]; //选取最新一条
            let user = this.props.users[useralerttopicnew.userfrom];
            let toptipData = {
                avatar: user.profile.avatar,
                text: `${this.props.useralerttopiclist.length}条新消息`
            };
            ToptipCo = <TopTip data={toptipData} useralerttopic={useralerttopicnew} frompage='nextpage'/>;
        }

        let topicsco = [];
        for (let topicid of this.props.topiclist) {
            console.log(`FeedExampleBasic,topicid:${topicid}`);
            topicsco.push(<Topic key={`topic${topicid}`} topic={this.props.topics[topicid]}
                                 onClickTopic={this.onClickTopic} {...this.props}/> );
        }
        return (
            <div className="feedPage" style={{paddingBottom:"60px"}}>
                <NavBar titlename="圈子" {...this.props}/>
                <Icon name="add circle" color='blue' size='huge' className="addcommunityHotlnk"
                      onClick={this.addNewCommunityHotlnk.bind(this)}
                    />
                <div onClick={this.onClickPage}>
                    {ToptipCo}
                    {topicsco}
                </div>
                <div onClick={this.stopDefault}>
                    {this.props.iscommentshow ? <FeedReplyForm {...this.props} /> : null}
                </div>
            </div>);
    }
}

const mapStateToProps = ({forum}) => {
    return forum;
}
Page = connect(mapStateToProps)(Page);
export default Page;

// 回复自己帖子？
// 点赞自己帖子?
// 或者回复自己评论？
// 点赞自己评论?
//publish:自己帖子id,自己帖子评论id
// let UserAlertTopicSchema = new Schema({
//     creator:{ type: Schema.Types.ObjectId, ref: 'User' }, //提醒谁看
//     type:String,//topiclove,topiccomment,commentlove,commentcomment,
//     topicself:{ type: Schema.Types.ObjectId, ref: 'Topic' },//针对哪条帖子
//     commentself:{ type: Schema.Types.ObjectId, ref: 'Comment' },//针对那条评论
//     comment:{ type: Schema.Types.ObjectId, ref: 'Comment' },//新发的评论
//     userfrom:{ type: Schema.Types.ObjectId, ref: 'User' },//来自用户
//     created_at: Date,//发表时间
// });