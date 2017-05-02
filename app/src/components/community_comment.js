import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    insertcommentstotopic_request,
    insertcommentstocomments_request,
    lovecommentsadd_request,
    lovecommentsunadd_request,
    uicommentshow,
} from '../actions/index.js';
import '../../public/css/feed.css';
import moment from 'moment';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';

let ForumComment = ({loginsuccess,userid,history,topicid,comment,subcomment,users,dispatch,showchild}) => {
    let islovedbyme = false;//判断love数组是否有自己
    //判断userid是否在comment中loves
    if(comment.loves.indexOf(userid) !== -1){
        islovedbyme = true;
    }
    let showcommenttocomment = (e)=> {
        if (loginsuccess) {
            dispatch(uicommentshow({
                selectedcommentid: comment._id,
                selectedtopicid:topicid,
                selectedtype: 'comment'
            }));
            e.stopPropagation();
        } else {
            history.push('/login');
        }
    };
    let clicklove = ()=> {
        console.log('clicklove:${islovedbyme}');
        if (loginsuccess) {
            let payload = {
                topicid:topicid,
                commentid: comment._id,
            };
            dispatch(islovedbyme ? lovecommentsunadd_request(payload) : lovecommentsadd_request(payload));
        }
        else {
            history.push('/login');
        }
    };
    let childCommentstyle = (comment)=>{
        return (comment.comments.length>0&&comment.isvisiable)?"childComments":"childComments hide";
    }
    //"childComments"

    let childComments = (commentid)=>{
        return (<div>
        {_.map(commentid, (id)=>{
            let child = subcomment[id];
            if(child.isvisiable){
                return (
                    <Comment key={id}>
                        <Comment.Avatar src={users[child.creator].profile.avatar}/>
                        <Comment.Content>
                            <Comment.Author as='a'>{users[child.creator].profile.nickname}</Comment.Author>
                            <Comment.Text>
                                <p>{child.title}</p>
                            </Comment.Text>
                            <Comment.Actions className="myCommentAction">
                                <Comment.Metadata>
                                    <div>{moment(child.created_at).format("MM月DD日 HH时mm分")}</div>
                                </Comment.Metadata>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                )
            }else{
                return (
                    <div style={{display:"none"}}></div>
                )
            }
        })}</div>);
    }

    return (

        <div 
            id={'comment_'+comment._id}
            >
            <Comment>
                <Comment.Avatar src={users[comment.creator].profile.avatar}/>
                <Comment.Content>
                    <Comment.Author as='a'>{users[comment.creator].profile.nickname}</Comment.Author>
                    <Comment.Text>
                        <p>{comment.isvisiable?comment.title:"该评论被隐藏"}</p>
                    </Comment.Text>
                    <Comment.Actions className="myCommentAction">
                        <Comment.Metadata>
                            <div>{moment(comment.created_at).format("MM月DD日 HH时mm分")}</div>
                        </Comment.Metadata>
                        <div className="myCommentLnk">
                            <div className="lnkAddCommunity" onClick={showcommenttocomment}>
                                <Icon name="commenting outline"/>
                                {comment.comments.length}
                            </div>
                            <div className="lnkZhan" onClick={clicklove}>
                                <Icon name="thumbs outline up"/>
                                {comment.loves.length}
                            </div>
                        </div>
                    </Comment.Actions>
                    <div className={childCommentstyle(comment)}>
                        {showchild? childComments(comment.comments):""}
                    </div>
                </Comment.Content>
            </Comment>
        </div>
    );
};

//topicid/comment/showchild
const mapStateToProps = ({userlogin:{loginsuccess,userid},forum:{subcomment,users}}) => {
    //loginsuccess,history,topicid,comment,subcomment,users,dispatch,showchild
    return {loginsuccess,userid,subcomment,users};
};

ForumComment = connect(mapStateToProps)(ForumComment);
ForumComment =withRouter(ForumComment);
export default ForumComment;