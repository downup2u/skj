import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form ,reset } from 'redux-form';
import { connect } from 'react-redux';
import {
    insertcommentstotopic_request,
    insertcommentstocomments_request,
    uicommentshow,
    uicommenthide
} from '../actions/index.js';
import '../../public/css/feed.css';


let renderInput =(props)=>{
  const { input: { value, onChange } ,replyplaceholder} = props;
  return (<Input value={value} onChange={onChange}  type="text" placeholder={replyplaceholder}/>);
}

const mapStateToProps = ({forum}) => {
    let replyplaceholder = '请输入你的评语';
    if(forum.selectedtype === 'topic'){
      let username = forum.users[forum.topics[forum.selectedtopicid].creator].profile.nickname;
      replyplaceholder = `评论${username}的帖子:`;
    }
    else if(forum.selectedtype === 'comment'){
      let username = forum.users[forum.comments[forum.selectedcommentid].creator].profile.nickname;
      replyplaceholder = `回复${username}的评论:`;
    }
    return {replyplaceholder};
}
renderInput = connect(mapStateToProps)(renderInput);

 

let FeedReplyForm = (props)=>{
  const {handleSubmit} = props;
  let onClickSendComment=(values)=>{
    if(props.selectedtype === 'topic'){
      props.dispatch(insertcommentstotopic_request({
        topicid:props.selectedtopicid,
        comment:{
          title:values.title,
        }
      }));
      props.dispatch(reset('feedreply'));
    }
    else if(props.selectedtype === 'comment'){
      props.dispatch(insertcommentstocomments_request({
        commentid:props.selectedcommentid,
        topicid:props.selectedtopicid,
        comment:{
          title:values.title,
        }
      }));
      props.dispatch(reset('feedreply'));
    }
  }
  return (
      <Form onSubmit={handleSubmit(onClickSendComment)}>
        <div className="feedBottomReply">
            <Field name="title" component={renderInput}/>
            <Button primary>发送</Button>
        </div>
      </Form>
  );
}


const validate = values => {
  const errors = {}
  if (!values.title || values.title ==='') {
    errors.title = '说点什么吧';
  }
  return errors;
}

FeedReplyForm = reduxForm({
  form: 'feedreply',
  initialValues:{
    title:'',
  },
  validate
})(FeedReplyForm);

export default FeedReplyForm;
