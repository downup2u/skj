import React, { Component, PropTypes } from 'react';
import NavBar from './nav.js';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Bigimg from './tools/bigimg.js';
import {gettopiclist_request,
    uicommentshow,
    uicommenthide,
} from '../actions/index.js';
import '../../public/css/feed.css';

import CommentExampleComment from './community_comment.js';
import FeedExampleBasic from './community_topic.js';
import FeedReplyForm from './community_reply.js';
import TopTip from './community_topictip';

export class Topic extends React.Component {
  componentWillMount () {
  }

  render() {
    let commentsco = [];
    for(let commentid of this.props.topic.comments){
      commentsco.push(<CommentExampleComment showchild={true} key={commentid} comment={this.props.comments[commentid]} {...this.props} />);
    }
    return  (<div >
                <FeedExampleBasic topic={this.props.topic} {...this.props} />
                    <Comment.Group>
                        {commentsco}
                    </Comment.Group>
            </div>);

  }
}


export class Page extends React.Component {

    componentWillMount () {
        this.props.dispatch(uicommenthide());
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
        let topicid = this.props.match.params.topicid;
        let ToptipCo = null;
        if(this.props.useralerttopiclist.length > 0){
            let filterlist = [];
            for(let useralerttopicid of this.props.useralerttopiclist){
                if(this.props.useralerttopics[useralerttopicid].topicself === topicid){
                    //关于该帖的评论
                    filterlist.push(useralerttopicid);
                }
            }

            if(filterlist.length > 0){
                let useralerttopicnew = this.props.useralerttopics[filterlist[0]]; //选取最新一条
                let user = this.props.users[useralerttopicnew.userfrom];
                let toptipData = {
                    avatar: user.profile.avatar,
                    text: `${filterlist.length}条新消息`
                };
                ToptipCo = <TopTip data={toptipData} useralerttopic={useralerttopicnew}  frompage='thispage'/>;
            }
        }
        let topicsco = <Topic key={topicid} topic={this.props.topics[topicid]} {...this.props}/>;
        return (
            <div className="commentInfoPage" style={{height:window.innerHeight+"px"}}>
                <div className="th">
                    <NavBar lefttitle="返回" title="帖子详情" onClickLeft={this.onClickReturn} />
                </div>
                <div className="tt">
                    {ToptipCo}
                </div>
                <div className="tc">
                    {topicsco}
                </div>
                <div className="tb">
                    {this.props.iscommentshow?<FeedReplyForm {...this.props}/>:null}
                </div>
                <Bigimg imglist={this.props.bigimglist} showindex={this.props.bigimgindex} show={this.props.bigimgshow} />
            </div>);
  }
}

const mapStateToProps = ({forum,app}) => {
    return {...forum,...app};
}
Page = connect(mapStateToProps)(Page);
export default Page;
