import React, { Component, PropTypes } from 'react';
import {Page,Button as Button1} from 'react-onsenui';
import TopicDetail from './topicdetail.js';
import { Button, Comment, Form, Header,Feed, Icon  } from 'semantic-ui-react';
//import 'semantic-ui/dist/semantic.min.css';
import '../../public/css/feed.css';

const CommentExampleComment = () => (
    <Comment.Group>
        <Comment>
            <Comment.Avatar src='http://semantic-ui.com/images/avatar/small/elliot.jpg'/>
            <Comment.Content>
                <Comment.Author as='a'>Elliot Fu</Comment.Author>
                <Comment.Text>
                    <p>This has been very useful</p>
                </Comment.Text>
                <Comment.Actions className="myCommentAction">
                    <Comment.Metadata>
                        <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>

                    <div className="myCommentLnk">
                        <div className="lnkAddCommunity">
                            <Icon name="commenting outline"/>
                            200
                        </div>
                        <div className="lnkZhan">
                            <Icon name="thumbs outline up"/>
                            200
                        </div>

                    </div>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    </Comment.Group>
);

const FeedExampleBasic = () => (
    <Feed>

        <Feed.Event>

            <Feed.Content>
                <div className="feedHead">
                    <Feed.Label image='http://semantic-ui.com/images/avatar/small/joe.jpg'>
                    </Feed.Label>
                    <Feed.Summary>
                        <a className="summaryName">Joe Henderson</a>
                        <Feed.Date>2017-11-11</Feed.Date>
                    </Feed.Summary>
                </div>
                <div className="feedContent">
                    <Feed.Extra images>
                        <a><img src='http://semantic-ui.com/images/wireframe/image.png'/></a>
                        <a><img src='http://semantic-ui.com/images/wireframe/image.png'/></a>
                    </Feed.Extra>
                    <Feed.Extra text>
                        Ours is
                    </Feed.Extra>
                </div>
                <Feed.Meta className="myMeta">
                    <div className="addCommunity">
                        <Icon name="talk outline"/>
                        评论 (10)
                    </div>
                    <Feed.Like>
                        <Icon name='like'/>
                        赞 (20)
                    </Feed.Like>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    </Feed>
)

const TopTip = (props) => {
    return (
        <div className="topTip">
            <div className="con">
                <img src={props.data.avatar}/>
                <span>{props.data.text}</span>
                <Icon name='chevron right' size="small"/>
            </div>
        </div>
    )
}


export default function MyPage(props) {

    let HotLnk = (data)=> {
        props.navigator.pushPage({
            comp: TopicDetail,
            props: data
        });
    };

    let toptipData = {
        avatar: "http://semantic-ui.com/images/avatar/small/joe.jpg",
        text: "一条消息"
    }

    return (<Page style={{backgroundColor:"#EEE"}}>
        <div>
            <TopTip data={toptipData}></TopTip>
            <FeedExampleBasic></FeedExampleBasic>
            <CommentExampleComment></CommentExampleComment>
        </div>
    </Page>);
}
