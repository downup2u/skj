import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/mymessage.css';

export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="myMessage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="消息" onClickLeft={this.onClickReturn}/>

                <div className="messageList">
                    <div className="items">
                        <div className="tt">消息标题</div>
                        <div className="cont">这里是消息内容这里是消息内容这里是消息内容这里是消息内容这里是消息内容</div>
                        <div className="lnk">
                            <span>2017-02-09</span>
                            <span>查看详情 ></span>
                        </div>
                    </div>
                    <div className="items">
                        <div className="tt">消息标题</div>
                        <div className="cont">这里是消息内容这里是消息内容这里是消息内容这里是消息内容这里是消息内容</div>
                        <div className="lnk">
                            <span>2017-02-09</span>
                            <span>查看详情 ></span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}