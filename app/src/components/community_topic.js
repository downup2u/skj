import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header,Feed, Icon,Input  } from 'semantic-ui-react';
import { Field,Fields, reduxForm,Form  } from 'redux-form';
import { connect } from 'react-redux';
import {gettopiclist_request,
    lovetopicadd_request,
    lovetopicunadd_request,
    uicommentshow,
    uicommenthide
} from '../actions/index.js';
import '../../public/css/feed.css';
//import { withRouter } from 'react-router';

let FeedExampleBasic = ({loginsuccess,history,topic,users,dispatch}) => {
  let islovedbyme = false;//判断loave数组是否有自己
  let showtopictocomment = (e)=>{
    if(loginsuccess){
      dispatch(uicommentshow({
        selectedid:topic._id,
        selectedtype:'topic'
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
        topicid:topic._id,
      };
      dispatch(islovedbyme?lovetopicunadd_request(payload):lovetopicadd_request(payload));
    }
    else{
      history.push('/login');
    }
  }
  let imgcos = [];
  for(let url in topic.picurl){
    imgcos.push(<div key={url}><img src={topic.picurl[url]}/></div>);
  }
  return (
      <Feed>
          <Feed.Event>
              <Feed.Content>
                  <div className="feedHead">
                      <Feed.Label image='http://semantic-ui.com/images/avatar/small/joe.jpg'>
                      </Feed.Label>
                      <Feed.Summary>
                          <a className="summaryName">{users[topic.creator].username}</a>
                          <Feed.Date>{topic.created_at}</Feed.Date>
                      </Feed.Summary>
                  </div>
                  <div className="feedContent">
                      <Feed.Extra images key='image'>
                          {imgcos}
                      </Feed.Extra>
                      <Feed.Extra text key='text'>
                          {topic.title}
                      </Feed.Extra>
                  </div>
                  <Feed.Meta className="myMeta">
                      <div className="addCommunity" onClick={showtopictocomment}>
                          <Icon name="talk outline"/>
                          评论 ({topic.comments.length})
                      </div>
                      <Feed.Like>
                          <Icon name='like' onClick={clicklove}/>
                          赞 ({topic.loves.length})
                      </Feed.Like>
                  </Feed.Meta>
              </Feed.Content>
          </Feed.Event>
      </Feed>
  );
}

const mapStateToProps =  ({userlogin}) =>{
  return userlogin;
};

FeedExampleBasic = connect(mapStateToProps)(FeedExampleBasic);
//FeedExampleBasic =withRouter(FeedExampleBasic);
export default FeedExampleBasic;
