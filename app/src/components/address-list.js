import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon } from 'semantic-ui-react'

const ListExampleDivided = () => (
    <div className="AddressListPage">
        <List selection>
            <List.Item>
                <div className="tit">
                    <span>王小胖</span>
                    <span>13800000000</span>
                </div>
                <div className="address">
                    <span>江苏省</span>
                    <span>南京市</span>
                    <span>雨花台2837号</span>
                </div>
                <div className="listControl">
                    <div className="rad">
                        <Radio label='设为默认' />
                    </div>
                    <div className="lnk">
                        <div><Icon link name='edit' />编辑</div>
                        <div><Icon link name='trash outline' />删除</div>
                    </div>
                </div>
            </List.Item>
            <List.Item>
                <div className="tit">
                    <span>王小胖</span>
                    <span>13800000000</span>
                </div>
                <div className="address">
                    <span>江苏省</span>
                    <span>南京市</span>
                    <span>雨花台2837号</span>
                </div>
                <div className="listControl">
                    <div className="rad">
                        <Radio label='设为默认' />
                    </div>
                    <div className="lnk">
                        <div><Icon link name='edit' />编辑</div>
                        <div><Icon link name='trash outline' />删除</div>
                    </div>
                </div>
            </List.Item>
        </List>
        <div className="addNew">
            <Button primary><Icon name="add" />新建地址</Button>
        </div>
    </div>
)

export default ListExampleDivided
