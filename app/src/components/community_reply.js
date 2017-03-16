import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import {
    insertcommentstotopic_request,
    insertcommentstocomments_request,
    uicommentshow,
    uicommenthide
} from '../actions/index.js';
import '../../public/css/feed.css';


const renderInput =(props)=>{
  const { input: { value, onChange } } = props;
  return (<Input value={value} onChange={onChange}  type="text" placeholder="请输入你的评语"/>);
}


let FeedReplyForm = (props)=>{
  const {handleSubmit} = props;
  let onClickSendComment=(values)=>{
    if(props.selectedtype === 'topic'){
      props.dispatch(insertcommentstotopic_request({
        topicid:props.selectedid,
        comment:{
          title:values.title,
        }
      }));
    }
    else if(props.selectedtype === 'comment'){
      props.dispatch(insertcommentstocomments_request({
        commentid:props.selectedid,
        comment:{
          title:values.title,
        }
      }));
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


FeedReplyForm = reduxForm({
  form: 'feedreply',
  initialValues:{
    title:'',
  }
})(FeedReplyForm);

export default FeedReplyForm;
