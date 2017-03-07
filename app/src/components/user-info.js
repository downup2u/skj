import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon, Image } from 'semantic-ui-react'

const ListExampleDivided = () => (
    <div className="UserInfoPage">
        <List selection>
            <List.Item>
                <div className="tit">
                    <span>头像</span>
                </div>
                <div className="rightCont">
                    <Image avatar src='http://semantic-ui.com/images/avatar2/small/rachel.png' />
                </div>
            </List.Item>
            <List.Item>
                <div className="tit">
                    <span>昵称</span>
                </div>
                <div className="rightCont">
                    <span>爱喝水的孩子</span>
                    <Icon name="angle right"/>
                </div>
            </List.Item>
            <List.Item>
                <div className="tit">
                    <span>手机号</span>
                </div>
                <div className="rightCont">
                    <span>13800000000</span>
                    <Icon name="angle right"/>
                </div>
            </List.Item>
            <List.Item>
                <div className="tit">
                    <span>修改密码</span>
                </div>
                <div className="rightCont">
                    <Icon name="angle right"/>
                </div>
            </List.Item>


        </List>
        <div className="escLogin">
            <Button basic>退出登录</Button>
        </div>
    </div>
)

export default ListExampleDivided
