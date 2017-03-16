import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {gettopiclist_request,
    uicommentshow,
    uicommenthide
} from '../actions/index.js';
import '../../public/css/feed.css';

import CommentExampleComment from './community_comment.js';
import FeedExampleBasic from './community_topic.js';
import FeedReplyForm from './community_reply.js';

export class Topic extends React.Component {
  componentWillMount () {
  }

  render() {
    let commentsco = [];
    for(let commentid of this.props.topic.comments){
      commentsco.push(<CommentExampleComment key={commentid} comment={this.props.comments[commentid]} {...this.props} />);
    }
    return  (<div>
                <FeedExampleBasic topic={this.props.topic} {...this.props} />
                  <Comment.Group>
                    <div className="title">最热评论</div>
                    {commentsco}
                  </Comment.Group>
            </div>);

  }
}


export class Page extends React.Component {

    componentWillMount () {

    }
    HotLnk = (data)=> {
        // props.navigator.pushPage({
        //     comp: TopicDetail,
        //     props: data
        // });
    };
    onClickPage =()=>{//点击空白处，隐藏?如何判断点击空白
        this.props.dispatch(uicommenthide());
    }
    onClickReturn=()=>{
        this.props.history.goBack();
    }
    render() {
        let toptipData = {
            avatar: "http://semantic-ui.com/images/avatar/small/joe.jpg",
            text: "一条消息"
        }

        let topicid = this.props.match.params.topicid;
        let topicsco = <Topic key={topicid} topic={this.props.topics[topicid]} {...this.props}/>;

        return (
            <div>
                <NavBar lefttitle="返回" title="帖子详情" onClickLeft={this.onClickReturn} />
                {topicsco}
                {this.props.iscommentshow?<FeedReplyForm {...this.props}/>:null}
            </div>);
  }
}

const mapStateToProps = ({forum}) => {
    return forum;
}
Page = connect(mapStateToProps)(Page);
export default Page;
