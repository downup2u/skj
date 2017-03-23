import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu, List, Label,Select } from 'semantic-ui-react';
import '../../../public/css/tixian.css';


export default class Page extends Component {
    state = {activeItem: '全部'};

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn =()=>{
        this.props.history.goBack();
    }

    render() {
        const { activeItem } = this.state;
        const countryOptions = [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }]
        return (
            <div className="tixianPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll",
                backgroundColor:"#F5F5F5"
             }}>
                <NavBar lefttitle="返回" title="添加银行卡" onClickLeft={this.onClickReturn} />
                <div className="AddressAddPage" style={{marginBottom:"30px"}}>
                    <List selection verticalAlign='middle' className="addAddress">
                        <List.Item>
                            <div className="tit">持卡人:</div>
                            <List.Content>
                                <Input  placeholder='请输入持卡人姓名' />
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <div className="tit">卡类型:</div>
                            <List.Content>
                                <Select placeholder='Select your country' style={{width:"100%",border:"none"}} options={countryOptions} />
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <div className="tit">卡号:</div>
                            <List.Content>
                                <Input  placeholder='请输入卡号' />
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
                <div className="buttoncon">
                    <Button primary>下一步</Button>
                </div>
            </div>
        );
    }
}