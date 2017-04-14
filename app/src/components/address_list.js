import React,{ Component, PropTypes } from 'react';
import '../../public/css/user.css';
import { Input, List, Radio, Button, Icon } from 'semantic-ui-react'
import NavBar from './nav.js';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { connect } from 'react-redux';
import {getaddresslist_request,deleteaddress_request} from '../actions/index.js';
import {deleteaddress_confirmpopshow,deleteaddress_confirmpophide} from '../actions/index.js';
import { Confirm } from 'semantic-ui-react';
import {editaddress} from '../actions/sagacallback.js';

const AddressItem = (props)=> {
    const {addressitem,isdefaultaddress} = props;
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
            console.log("编辑地址成功:" + JSON.stringify(error));
        });
    }
    return (
        <List.Item key={addressitem._id}>
            <Swipeout autoClose={true}
                      right={[
      {
        text: '删除',
        onPress:onDelete,
        style: { backgroundColor: 'red', color: 'white' }
      }
    ]}
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
                    {!isdefaultaddress?
                    (<div className="rad">
                        <Radio onClick={onClickDefault}/>
                    </div>):null}
                    <div className="lnk">
                        <div onClick={onEdit}><Icon link name='edit'/>编辑</div>
                        <div onClick={onDelete}><Icon link name='trash outline'/>删除</div>
                    </div>
                </div>
            </Swipeout>
        </List.Item>);
};


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
            let isdefaultaddress = false;
            if(this.props.defaultaddress.hasOwnProperty('_id')){
                if(addressitem._id === this.props.defaultaddress._id){
                    isdefaultaddress = true;
                }
            }
            itemsco.push(<AddressItem key={addressitem._id} 
                                      dispatch={this.props.dispatch}
                                      isdefaultaddress={isdefaultaddress}
                                      addressitem={addressitem}
                                      onClickEdit={this.onClickEdit}
                                      onClickDelete={this.onClickDelete}/>);
        });
        return (
            <div>
                <NavBar lefttitle="返回" title="地址列表" onClickLeft={this.onClickReturn}/>

                <div className="AddressListPage">
                    <List selection>
                        {itemsco}
                    </List>
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
