import React, { Component } from 'react';
import { Button, Comment, Header,Feed, Icon,Input,TextArea  } from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form ,reset } from 'redux-form';
import { connect } from 'react-redux';
import {
    insertcommentstotopic_request,
    insertcommentstocomments_request,
    uicommentshow,
    uicommenthide
} from '../actions/index.js';
import '../../public/css/feed.css';
import NavBar from './newnav.js';

let renderInput =(props)=>{
  const { input: { value, onChange } ,replyplaceholder} = props;
  return (
      <TextArea placeholder='输入帖子内容' placeholder={replyplaceholder} type="text" value={value} onChange={onChange} />
  );
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
        }else if(props.selectedtype === 'comment'){
            props.dispatch(insertcommentstocomments_request({
                commentid:props.selectedcommentid,
                topicid:props.selectedtopicid,
                comment:{
                    title:values.title,
                }
            }));
            props.dispatch(reset('feedreply'));
        }
        props.dispatch(uicommenthide({}));
    }

    let hidecomment = ()=>{
        props.dispatch(uicommenthide({}));
    }

    let stopDefault = (e)=> {
        e = e||window.event;
        e.stopPropagation();
    };

    return (
        <Form 
            onSubmit={handleSubmit(onClickSendComment)}
            className="feedBottomReplyForm"
            
            >
            <NavBar back={false} title="评论帖子" />
            <Icon name="angle left" className="back" onClick={hidecomment} />
            <div 
                className="feedBottomReply"
                onClick={stopDefault}
                >
                
                <Field name="title" component={renderInput}/>
                <Button 
                    primary
                    
                    >发送</Button>
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

const mapStateToPropsFeedReply = ({forum:{selectedtype,selectedtopicid,selectedcommentid}}) => {

     return {selectedtype,selectedtopicid,selectedcommentid};
}
FeedReplyForm = connect(mapStateToPropsFeedReply)(FeedReplyForm);

FeedReplyForm = reduxForm({
  form: 'feedreply',
  initialValues:{
    title:'',
  },
  validate
})(FeedReplyForm);


export default FeedReplyForm;
