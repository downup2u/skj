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




let CommentExampleComment = ({loginsuccess,history,comment,users,dispatch}) => {
  let islovedbyme = false;//判断loave数组是否有自己
  let showcommenttocomment = (e)=>{
    if(loginsuccess){
      dispatch(uicommentshow({
        selectedid:comment._id,
        selectedtype:'comment'
      }));
      e.stopPropagation();
    }
    else{
      history.push('/login');
    }

  }
  let clicklove =()=>{
    if(loginsuccess){
      let payload = {
        commentid:comment._id,
      };
      dispatch(islovedbyme?lovecommentsunadd_request(payload):lovecommentsadd_request(payload));
    }
    else{
      history.push('/login');
    }
  }
  return (
            <div id={'comment_'+comment._id}>
          <Comment>
              <Comment.Avatar src={users[comment.creator].profile.avatar}/>
              <Comment.Content>
                  <Comment.Author as='a'>{users[comment.creator].profile.nickname}</Comment.Author>
                  <Comment.Text>
                      <p>{comment.title}</p>
                  </Comment.Text>
                  <Comment.Actions className="myCommentAction">
                      <Comment.Metadata>
                          <div>{comment.created_at}</div>
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
              </Comment.Content>
          </Comment>
        </div>

  );
}

const mapStateToProps =  ({userlogin}) =>{
  return userlogin;
};

CommentExampleComment = connect(mapStateToProps)(CommentExampleComment);
export default CommentExampleComment;
