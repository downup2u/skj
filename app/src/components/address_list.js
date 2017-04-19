/*
 * 收货地址管理
 * */
import React, { Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Checkbox, Button, Icon } from 'semantic-ui-react'
import NavBar from './nav.js';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { connect } from 'react-redux';
import {getaddresslist_request,deleteaddress_request} from '../actions/index.js';
import {deleteaddress_confirmpopshow,deleteaddress_confirmpophide} from '../actions/index.js';
import { Confirm } from 'semantic-ui-react';
import {editaddress} from '../actions/sagacallback.js';

let AddressItem = (props)=> {
    const { addressitem, defaultaddress } = props;
    let onDelete = ()=> {
        props.onClickDelete(addressitem);
    };
    let onEdit = ()=> {
        props.onClickEdit(addressitem);
    }
    let onClickDefault =()=>{
        addressitem.isdefaultaddress = true;
        props.dispatch(editaddress(addressitem)).then((result)=>{

        }).catch((error)=>{
            //弹出错误框
            console.log("设置默认地址失败:" + JSON.stringify(error));
        });
    }
    console.log(addressitem._id);
    console.log(defaultaddress._id);
    console.log(defaultaddress.hasOwnProperty('_id')&&(addressitem._id===defaultaddress._id))
    let isdefaultaddress = defaultaddress.hasOwnProperty('_id')&&(addressitem._id===defaultaddress._id);
    return (
        <div className="addressItem" key={addressitem._id}>
            <Swipeout autoClose={true}
                    right={[{
                        text: '删除',
                        onPress:onDelete,
                        style: { backgroundColor: 'red', color: 'white' }
                    }]}
                >
                <div className="tit">
                    <span>{addressitem.truename}</span>
                    <span>{addressitem.phonenumber}</span>
                </div>
                <div className="address">
                    <span>{addressitem.provicename}</span>
                    <span>{addressitem.cityname}</span>
                    <span>{addressitem.addressname}</span>
                </div>
                <div className="listControl">
                    {
                        !isdefaultaddress?(
                            <div className="rad">
                                <Checkbox onClick={onClickDefault}
                                    label="设为默认地址"
                                    checked={false}
                                />
                            </div>):(
                            <Checkbox 
                                label="默认地址"
                                checked={true}
                            />
                        )
                    }
                    <div className="lnk">
                        <div onClick={onEdit}><Icon link name='edit'/>编辑</div>
                        <div onClick={onDelete}><Icon link name='trash outline'/>删除</div>
                    </div>
                </div>
            </Swipeout>
        </div>);
};

//
const mapStateToProps2 = ({userlogin}) => {
    return { defaultaddress:userlogin.defaultaddress} ;
};
AddressItem = connect(mapStateToProps2)(AddressItem);


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
        this.props.dispatch(getaddresslist_request(payload));
    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    }
    onClickDelete = (addressitem)=> {
        let poptitle = '确认删除';
        let popmsg = `你确认要删除地址:${addressitem.addressname}吗?`;
        this.props.dispatch(deleteaddress_confirmpopshow({
            poptitle: poptitle,
            popmsg: popmsg,
            deleteingaddress: addressitem
        }));
    }
    onClickEdit = (addressitem)=> {
        this.props.history.push(`/editaddress/${addressitem._id}`);
    }
    onClickConfirmOK = ()=> {
        this.props.dispatch(deleteaddress_request({_id: this.props.deleteingaddress._id}));
        this.props.dispatch(deleteaddress_confirmpophide());
    }
    onClickConfirmCancel = ()=> {
        this.props.dispatch(deleteaddress_confirmpophide());
    }
    onClickNewAddress = ()=> {
        this.props.history.push('/newaddress');
    }

    render() {
        let itemsco = [];
        this.props.addresslist.forEach((addressitem)=> {
            itemsco.push(<AddressItem key={addressitem._id} 
                                      dispatch={this.props.dispatch}
                                      addressitem={addressitem}
                                      onClickEdit={this.onClickEdit}
                                      onClickDelete={this.onClickDelete}/>);
        });
        return (
            <div>
                <NavBar lefttitle="返回" title="地址列表" onClickLeft={this.onClickReturn}/>

                <div className="AddressListPage">
                    <div className="listcont">
                        {itemsco}
                    </div>
                    <Confirm
                        header={this.props.poptitle}
                        content={this.props.popmsg}
                        open={this.props.isconfirmshow}
                        onCancel={this.onClickConfirmCancel}
                        onConfirm={this.onClickConfirmOK}
                        />

                    <div className="addNew">
                        <Button onClick={this.onClickNewAddress} primary><Icon name="add"/>新建地址</Button>
                    </div>
                </div>
            </div>);

    }

}
;
//
const mapStateToProps = ({address,userlogin}) => {
    return {...address,defaultaddress:userlogin.defaultaddress};
};
Page = connect(mapStateToProps)(Page);
export default Page;
