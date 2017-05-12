/**
 * Created by wangxiaoqing on 2017/3/29.
 */
import React, { Component } from 'react';
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
        const {useralerttopic,frompage,history,dispatch} = this.props;
        dispatch(setuseralerttopicreaded_request(useralerttopic._id));

        if(frompage === 'nextpage'){
            history.push(`/communityinfo/${useralerttopic.topicself}#comment_${useralerttopic.comment}`);
        }
        else{
            this.scrollToAnchor('comment_' + useralerttopic.comment);
        }
    }
    render() {
        const {data} = this.props;
        return (
            <div className="topTip" onClick={this.onClick}>
                <div className="con">
                    <img src={data.avatar}/>
                    <span>{data.text}</span>
                    <Icon name='chevron right' size="small"/>
                </div>
            </div>

        );
    };
};


// const mapStateToProps = ({forum:{useralerttopic}}) => {
//     return {useralerttopic};
// }
Page = connect()(Page);
Page = withRouter(Page);
export default Page;
