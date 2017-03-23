import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {gettopiclist_request,
    uicommentshow,
    uicommenthide
} from '../actions/index.js';
import '../../public/css/feed.css';
import NavBar from './nav.js';


import CommentExampleComment from './community_comment.js';
import FeedExampleBasic from './community_topic.js';
import FeedReplyForm from './community_reply.js';

let TopTip = (props) => {
    return (

        <div className="topTip">
            <div className="con">
                <img src={props.data.avatar}/>
                <span>{props.data.text}</span>
                <Icon name='chevron right' size="small"/>
            </div>
        </div>

    )
}

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
        let page = 1;
        let perpagenumber = 10;
        let payload = {
            query: {},
            options: {
                page: page,
                limit: perpagenumber,
            }
        };
        this.props.dispatch(gettopiclist_request(payload));
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
    }
    onClickTopic = (topicid)=> {//点击空白处，隐藏?如何判断点击空白
        this.props.history.push(`/communityinfo/${topicid}`);
    }
    stopDefault = (e)=> {
        e.stopPropagation
    }
    render() {

        console.dir(this.props.topics);

        let toptipData = {
            avatar: "http://semantic-ui.com/images/avatar/small/joe.jpg",
            text: "一条消息"
        }
        let topicsco = [];
        for (let topicid of this.props.topiclist) {
            console.log(`FeedExampleBasic,topicid:${topicid}`);
            topicsco.push(<Topic key={topicid} topic={this.props.topics[topicid]} {...this.props}
                                 onClickTopic={this.onClickTopic}/>);
        }
        return (
            <div className="feedPage">
                <NavBar title="圈子" />
                <div onClick={this.onClickPage}>
                    <TopTip data={toptipData}></TopTip>
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
