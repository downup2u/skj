import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio} from 'semantic-ui-react'


const ListExampleDivided = () => (
    <div className="AddressAddPage">
        <List selection verticalAlign='middle' className="addAddress">
            <List.Item>
                <div className="tit">姓名:</div>
                <List.Content>
                    <Input placeholder='请填写收货人姓名'/>
                </List.Content>
            </List.Item>
            <List.Item>
                <div className="tit">手机号码:</div>
                <List.Content>
                    <Input placeholder='请填写收货人手机号'/>
                </List.Content>
            </List.Item>
            <List.Item>
                <div className="tit">所在省:</div>
                <List.Content>
                    <select >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                    </select>
                </List.Content>
            </List.Item>
            <List.Item>
                <div className="tit">所在市:</div>
                <List.Content>
                    <select >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                    </select>
                </List.Content>
            </List.Item>
            <List.Item>
                <div className="tit">所在区:</div>
                <List.Content>
                    <select >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                    </select>
                </List.Content>
            </List.Item>
            <List.Item>
                <div className="tit">详细地址:</div>
                <List.Content>
                    <Input placeholder='请填写详细地址方便送达'/>
                </List.Content>
            </List.Item>
        </List>
        <div className="setForm">
            <div className="text">是否设为默认地址</div>
            <Radio toggle label='Make my profile visible' />
        </div>
    </div>

)

export default ListExampleDivided
