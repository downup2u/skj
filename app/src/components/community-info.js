import React, { Component, PropTypes } from 'react';
import {Page,Button as Button1} from 'react-onsenui';
import TopicDetail from './topicdetail.js';
import { Button, Comment, Form, Header,Feed, Icon,Image, Input  } from 'semantic-ui-react';
//import 'semantic-ui/dist/semantic.min.css';
import '../../public/css/feed.css';



const CommentExampleComment = (data) => (

    <Comment.Group className="communityInfoComment">
        <div className="title">最热评论</div>
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

const FeedReply = ()=>(
    <div className="feedBottomReply">
        <Input placeholder='请输入你的评语'/>
        <span>发送</span>
    </div>
)

const FeedExampleBasic = () => (
    <Feed className="communityInfo">

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
                </Feed.Meta>

                <div className="avatarlist">
                    <div>
                        <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg'/>
                        <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg'/>
                        <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg'/>
                        <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg'/>
                        <Image avatar src='http://semantic-ui.com/images/avatar/small/helen.jpg'/>
                    </div>
                    <Icon name="angle right"/>
                </div>
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
            <FeedExampleBasic></FeedExampleBasic>
            <CommentExampleComment></CommentExampleComment>
            <FeedReply></FeedReply>
        </div>
    </Page>);
}
