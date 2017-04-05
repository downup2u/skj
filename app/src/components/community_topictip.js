/**
 * Created by wangxiaoqing on 2017/3/29.
 */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input, Grid, Popup  } from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {
    setuseralerttopicreaded_request
} from '../actions/index.js';
import '../../public/css/feed.css';

export class Page extends React.Component {
    componentWillMount() {
    }

    scrollToAnchor =(idname)=>{
        document.querySelector(`#${idname}`).scrollIntoView();
    }

    onClick = ()=>{
        this.props.dispatch(setuseralerttopicreaded_request(this.props.useralerttopic._id));

        if(this.props.frompage === 'nextpage'){
            this.props.history.push(`/communityinfo/${this.props.useralerttopic.topicself}#comment_${this.props.useralerttopic.comment}`);
        }
        else{
            this.scrollToAnchor('comment_' + this.props.useralerttopic.comment);
        }
    }
    render() {
        return (
            <div className="topTip" onClick={this.onClick}>
                <div className="con">
                    <img src={this.props.data.avatar}/>
                    <span>{this.props.data.text}</span>
                    <Icon name='chevron right' size="small"/>
                </div>
            </div>

        );
    };
};


const mapStateToProps = ({forum}) => {
    return forum;
}
Page = connect(mapStateToProps)(Page);
Page =withRouter(Page);
export default Page;