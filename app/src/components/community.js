import React, { Component } from 'react';
import { Button, Comment, Header, Feed, Icon, Input, Grid, Popup  } from 'semantic-ui-react';
import Lnk from './lnk.js';
import Bigimg from './tools/bigimg.js';

import { connect } from 'react-redux';
import {
    ui_settopiclistinited,
    gettopiclist_request,
    uicommentshow,
    uicommenthide,
    setCommunityListHeight,
    fillprofile_request,
    fillprofile_result,
    set_weui
} from '../actions/index.js';
import {callthen} from '../sagas/sagacallback.js';
import '../../public/css/feed.css';
import NavBar from './nav2.js';
import ForumComment from './community_comment.js';
import ForumTopic from './community_topic.js';
import FeedReplyForm from './community_reply.js';
import TopTip from './community_topictip';
import { gettopiclist } from '../actions/sagacallback';
import InfinitePage from './controls/listview';
import { withRouter } from 'react-router-dom';
let usecachetopic = false;
export class Topic extends React.Component {
    render() {
        const {topic,comments} = this.props;
        let commentsco = [];
        let commentslength = topic.comments.length;
        let showcomments = commentslength>0?"commentlistcontent":"commentlistcontent hide";
        let length = commentslength>2?2:topic.comments.length;
        let showmore = commentslength>2?(<div className="comentShowMore" onClick={()=>{this.props.onClickTopic(topic._id);}}>查看更多...</div>) :'';
        for (let i = length-1; i>=0; i--) {
            let commentid = topic.comments[i];
            commentsco.push(
                <ForumComment
                    key={commentid}
                    topicid={topic._id}
                    comment={comments[commentid]}
                    showchild={false}
                    />
                );
        }
        return (
            <div>
                <ForumTopic topic={topic} onClickPinbi={this.props.onClickPinbi}/>
                <div className={showcomments}>
                    <Comment.Group>
                        {commentsco}
                        {showmore}
                    </Comment.Group>
                </div>
            </div>);
    }
}
const mapStateToPropsTopic = ({forum:{comments,topics}},props) => {
    let topic = topics[props.itemid];
    return {comments,topic};
}
Topic = connect(mapStateToPropsTopic)(Topic);


let ToptipCo = (props)=>{
    const {useralerttopiclist,users,useralerttopics} = props;
    let ToptipCo = null;
    if(useralerttopiclist.length > 0){
        let useralerttopicnew = useralerttopics[useralerttopiclist[0]]; //选取最新一条
        let user = users[useralerttopicnew.userfrom];
        let toptipData = {
             avatar: user.profile.avatar,
             text: `${useralerttopiclist.length}条新消息`
        };
        ToptipCo = <TopTip data={toptipData} useralerttopic={useralerttopicnew} frompage='nextpage'/>;
     }
    return (<div>{ToptipCo}</div>);
}
const mapStateToPropsToptip = ({forum:{useralerttopiclist,users,useralerttopics}}) => {
     return {useralerttopiclist,users,useralerttopics};
}
ToptipCo = connect(mapStateToPropsToptip)(ToptipCo);


let FeedReplyFormShow = ({iscommentshow,dispatch})=>{
    let stopDefault = (e)=> {
        e.stopPropagation();
    };
    if(iscommentshow){
        return (
            <FeedReplyForm />
        )
    }else{
        return (<div style={{display:"none"}} ></div>)
    }
}
const mapStateToPropsFeedReplyFormShow = ({forum:{iscommentshow}}) => {
    return {iscommentshow};
}
FeedReplyFormShow = connect(mapStateToPropsFeedReplyFormShow)(FeedReplyFormShow);


export class Page extends React.Component {

    componentWillMount() {
        this.props.dispatch(uicommenthide());
    }

    onClickPage = ()=> {//点击空白处，隐藏?如何判断点击空白
        this.props.dispatch(uicommenthide());
    };
    componentDidMount(){
      usecachetopic = false;
    }
    onClickTopic = (topicid)=> {//点击空白处，隐藏?如何判断点击空白
        usecachetopic = true;
        this.props.history.push(`/communityinfo/${topicid}`);
    };

    //新建帖子
    addNewCommunity = (topicid)=> {
        this.props.history.push(`/communityinfo/${topicid}`);
    };

    addNewCommunityHotlnk = ()=>{
        const {point, pointfornewtopic} = this.props;
        usecachetopic = false;
        if(point>pointfornewtopic){
            this.props.history.push('/newtopic');
        }else{
            this.props.dispatch(set_weui({
                alert : {
                    show : true,
                    title : "积分不够",
                    text : `积分必须大于${pointfornewtopic}者,才能发帖`,
                    buttonsClick : ()=>{}
                },
            }))
        }
    };
    onClickPinbi = (id)=>{
      if(confirm("确定要屏蔽该用户吗？")){
        let profile = {...this.props.profile};
        profile['shield'] = profile['shield']  || [];
        profile['shield'].push(id);
        //console.log(callthen);
        this.props.dispatch(callthen(fillprofile_request,fillprofile_result,{profile})).then((result)=>{
          this.refs.listviewpage.getWrappedInstance().onRefresh();
        });
      }
    }
    updateContent = (item)=> {
        return  (
            <Topic
                key = {`topic${item._id}`}
                itemid = {item._id}
                onClickTopic = {this.onClickTopic}
                onClickPinbi = {this.onClickPinbi}
            />
        );
    }

    render() {
        const {useralerttopiclist} = this.props;
        const {point, pointfornewtopic} = this.props;
        let communityListHeight = useralerttopiclist.length > 0?window.innerHeight-162:window.innerHeight-120;
        let tctop = useralerttopiclist.length > 0?90:48;

        return (
            <div className="feedPage">
                <div className="PageHead">
                    <span className="title">圈子</span>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign='right'>
                                <Popup
                                    trigger={
                                        <img src="img/head/1.png" />
                                    }
                                    position='top right'
                                    on='click'
                                    hideOnScroll
                                    >
                                    <Popup.Content>
                                        <div className="communityMoreLnk">
                                            { point>pointfornewtopic && (
                                            <Lnk value="" url="/newtopic" {...this.props}>
                                                <Icon name="add circle"/>
                                                <span>发布</span>
                                            </Lnk>)
                                            }
                                            <Lnk value="" url="/mytopiclist" {...this.props}>
                                                <Icon name="commenting"/>
                                                <span>我的发布</span>
                                            </Lnk>
                                        </div>
                                    </Popup.Content>
                                </Popup>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                <Icon name="add circle" color='blue' size='huge' className="addcommunityHotlnk"
                      onClick={this.addNewCommunityHotlnk.bind(this)}
                    />
                <div onClick={this.onClickPage}>
                    <ToptipCo />
                </div>
                <div
                    className="tc"
                    onClick={this.onClickPage}
                    style={{
                        height : communityListHeight+"px",
                        top: (tctop+20)+"px"
                    }}>
                    <InfinitePage
                        ref="listviewpage"
                        usecache={usecachetopic}
                        listtypeid='community'
                        pagenumber = {8}
                        updateContent= {this.updateContent}
                        queryfun= { gettopiclist }
                        listheight= { communityListHeight }
                        sort = {{created_at: -1}}
                        query = {{}}
                    />
                </div>
                <FeedReplyFormShow />
                <Bigimg />
            </div>);
    }
}

const mapStateToProps = ({forum:{useralerttopiclist},userlogin:{profile,point}, app:{pointfornewtopic}, app}) => {
       //所有使用到的属性列表：bigimgindex/iscommentshow/communityListHeight/useralerttopiclist
    return {useralerttopiclist,profile,point,pointfornewtopic};
}
Page = connect(mapStateToProps)(Page);
Page = withRouter(Page);
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
