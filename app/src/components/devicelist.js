import React, { Component } from 'react';
import { Input, List, Radio, Button, Icon } from 'semantic-ui-react'
import NavBar from './nav.js';
import '../../public/css/device.css';

import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { connect } from 'react-redux';
import {getdevicelist_request,deletedevice_request} from '../actions/index.js';
import { Confirm } from 'semantic-ui-react';
import _ from 'lodash';

const DeviceItem = (props)=> {
    const {deviceitem} = props;
    let onDelete = ()=> {
      props.onClickDelete(deviceitem);
    };
    let onEdit = ()=> {
        props.onClickEdit(deviceitem);
    };
    return (
        <List.Item key={deviceitem._id}>
            <Swipeout autoClose={true}
                      right={[
                        {
                            text: '修改',
                            onPress:onEdit,
                            style: { backgroundColor: '#21ba45', color: 'white', fontSize:"16px" }
                        },
                        {
                            text: '删除',
                            onPress:onDelete,
                            style: { backgroundColor: 'red', color: 'white', fontSize:"16px" }
                        }
                    ]}
                onOpen={() => console.log('open')}
                onClose={() => console.log('close')}
            >
                <div className="deviceLi">
                    <div className="pic"><img src="img/5.png"/></div>
                    <div className="info">
                        <div className="tit">
                            <span>{deviceitem.devicename}</span>
                        </div>
                        <div className="address">
                            <span>品牌:{deviceitem.devicebrand}</span>
                            <span>型号:{deviceitem.devicemodel}</span>
                            <span>设备标识:{deviceitem.deviceid}</span>
                        </div>
                    </div>
                </div>
            </Swipeout>
        </List.Item>);
}

export class Page extends React.Component {

    componentWillMount() {
        let page = 1;
        let perpagenumber = 10;
        let payload = {
            query: {},
            options: {
                page: page,
                limit: perpagenumber,
            }
        };
        this.props.dispatch(getdevicelist_request(payload));
    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    }

    onClickEdit =(deviceitem)=>{
      this.props.history.push(`/editdevice/${deviceitem._id}`);
    }
    onClickDelete = (deviceitem)=> {
      if(confirm("确定删除吗？")){
        this.props.dispatch(deletedevice_request({_id: deviceitem._id}));
      }
    }

    onClickNewDevice = ()=> {
        this.props.history.push('/addnewdevice');
    }

    render() {
        console.log("devicelist:" + JSON.stringify(this.props));
        const {mydevicelist} = this.props;
        let itemsco = [];
        _.map(mydevicelist,(deviceitem)=> {
            itemsco.push(<DeviceItem key={deviceitem._id}
              deviceitem={deviceitem}
              onClickEdit={this.onClickEdit}
              onClickDelete={this.onClickDelete}/>
            );
        });
        return (
            <div>
                <NavBar lefttitle="返回" title="设备列表" onClickLeft={this.onClickReturn}
                        righttitle='新建' onClickRight={this.onClickNewDevice}/>
                <List selection className="deviceList">
                    {itemsco}
                </List>
                <Confirm
                    header={this.props.poptitle}
                    content={this.props.popmsg}
                    open={this.props.isconfirmshow}
                    onCancel={this.onClickConfirmCancel}
                    onConfirm={this.onClickConfirmOK}
                    />
            </div>);

    }
}

const mapStateToProps = ({device:{mydevicelist:devicelist,devices}}) => {
    let mydevicelist = [];
    _.map(devicelist,(id)=>{
      mydevicelist.push(devices[id]);
    })
    return {mydevicelist};
}
Page = connect(mapStateToProps)(Page);
export default Page;
