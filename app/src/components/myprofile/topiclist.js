import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import '../../../public/css/mytopiclist.css';


export default class Page extends Component {
    state = {activeItem: '全部'};

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn =()=>{
        this.props.history.goBack();
    };

    render() {
        const { activeItem } = this.state;
        return (
            <div className="myTopicListPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll"
             }}>
                <NavBar lefttitle="返回" title="我的帖子" onClickLeft={this.onClickReturn} />
                <div className="cont">
                    <div className="li">
                        <div className="title">这里是帖子标题</div>
                        <div className="content">
                            <div>这里是帖子内容</div>
                            <div className="imglist">
                                <div><img src="img/myprofile/1.png" /></div>
                                <div><img src="img/myprofile/1.png" /></div>
                                <div><img src="img/myprofile/1.png" /></div>
                            </div>
                        </div>
                        <div className="lnk">
                            <div>2017-09-08</div>
                            <div className="myCommentLnk">
                                <div className="lnkAddCommunity" >
                                    <Icon name="commenting outline"/>
                                    10
                                </div>
                                <div className="lnkZhan">
                                    <Icon name="thumbs outline up"/>
                                    20
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="li">
                        <div className="title">这里是帖子标题</div>
                        <div className="content">这里是帖子内容</div>
                        <div className="lnk">
                            <div>2017-09-08</div>
                            <div className="myCommentLnk">
                                <div className="lnkAddCommunity" >
                                    <Icon name="commenting outline"/>
                                    10
                                </div>
                                <div className="lnkZhan">
                                    <Icon name="thumbs outline up"/>
                                    20
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}