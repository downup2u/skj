import React, { Component } from 'react';
import NavBar from './nav.js';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Bigimg from './tools/bigimg.js';
import {gettopiclist_request,
    uicommentshow,
    uicommenthide,
} from '../actions/index.js';
import '../../public/css/feed.css';

import ForumComment from './community_comment.js';
import ForumTopic from './community_topic.js';
import FeedReplyForm from './community_reply.js';
import TopTip from './community_topictip';

export class Topic extends React.Component {
  componentWillMount () {
  }

  render() {
    const {topic,comments} = this.props;
    let commentsco = [];
    for(let commentid of topic.comments){
      commentsco.push(<ForumComment showchild={true} key={commentid} comment={comments[commentid]} />);
    }
    return  (<div >
                <ForumTopic topic={topic} />
                    <Comment.Group>
                        {commentsco}
                    </Comment.Group>
            </div>);

  }
}

let FeedReplyFormShow = ({iscommentshow})=>{
           return(<div className="tb">
                    {iscommentshow?<FeedReplyForm />:null}
                </div>);
}
const mapStateToPropsFeedReplyFormShow = ({forum:{iscommentshow}}) => {
    return {iscommentshow};
}
FeedReplyFormShow = connect(mapStateToPropsFeedReplyFormShow)(FeedReplyFormShow);

export class Page extends React.Component {

    componentWillMount () {
        this.props.dispatch(uicommenthide());
    }

    onClickPage =()=>{//点击空白处，隐藏?如何判断点击空白
        this.props.dispatch(uicommenthide());
    }
    onClickReturn=()=>{
        this.props.history.goBack();
    }
    render() {
        const {useralerttopiclist,useralerttopics,users,topics,comments} = this.props;
        let topicid = this.props.match.params.topicid;
        let ToptipCo = null;
        if(useralerttopiclist.length > 0){
            let filterlist = [];
            for(let useralerttopicid of useralerttopiclist){
                if(useralerttopics[useralerttopicid].topicself === topicid){
                    //关于该帖的评论
                    filterlist.push(useralerttopicid);
                }
            }

            if(filterlist.length > 0){
                let useralerttopicnew = useralerttopics[filterlist[0]]; //选取最新一条
                let user = users[useralerttopicnew.userfrom];
                let toptipData = {
                    avatar: user.profile.avatar,
                    text: `${filterlist.length}条新消息`
                };
                ToptipCo = <TopTip data={toptipData} useralerttopic={useralerttopicnew}  frompage='thispage'/>;
            }
        }
        let topicsco = <Topic key={topicid} topic={topics[topicid]} comments={comments}/>;
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
                <FeedReplyFormShow />
                <Bigimg />
            </div>);
  }
}

const mapStateToProps = ({forum:{comments,useralerttopiclist,useralerttopics,users,topics}}) => {
    return {useralerttopiclist,comments,useralerttopics,users,topics};
}
Page = connect(mapStateToProps)(Page);
export default Page;
