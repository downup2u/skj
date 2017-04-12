/**
 * Created by wangxiaoqing on 2017/3/29.
 */
import React, { Component, PropTypes } from 'react';
import '../../public/css/feed.css';

export class Page extends React.Component {
    
    componentWillMount() {
    
    }
    
    render() {
        return (
            <div className="community_message">
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

