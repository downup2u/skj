/*
 * 购物车
 * */
import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { connect } from 'react-redux';
import { Input, Button, Menu, Checkbox, Label, Icon } from 'semantic-ui-react';
import '../../../public/css/shoppingcart.css';
import { mycartgetall } from '../../actions/sagacallback.js';
import InfinitePage from '../controls/infinitecontrol';
import Swipeout from 'rc-swipeout';
import {
  mycartupdateone,
  mycartdelone,
} from '../../actions/sagacallback.js';
import {
    uiinfinitepage_deleteitem,
    uiinfinitepage_updateitem,
    ui_cartooder_additem,
    ui_cartooder_updateitem,
    ui_cartooder_delitem,
    ui_cart_selectallitems,
    set_orderSurePage,
    getaddresslist_request,
    showpopmessage
} from '../../actions';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

export class Cartitem extends Component {


    //获取我的地址列表
    componentWillMount() {
        let payload = {
            query: {},
            options: {
                page: 1,
                limit: 1000,
            }
        };
        this.props.dispatch(getaddresslist_request(payload));
    }

    render(){
        console.log('Cartitem renderCaritem==>' + JSON.stringify(this.props));
        let {item,products,isselected,dispatch} = this.props;
        let cartid = item._id;
        let changeproductnumber = (number)=>{
            let payload = {
                _id:cartid,
                data:{
                    product:item.product,
                    number
                }
            };
            dispatch(mycartupdateone(payload)).then((result)=>{
                console.log('mycartupdateone result:' + JSON.stringify(result));
                if(result){
                    dispatch(uiinfinitepage_updateitem(result.updateditem));
                    dispatch(ui_cartooder_updateitem(result.updateditem));
                }
            });
            
        }
        let onChangeNumber=(e)=>{
            let number = e.target.value;
            if(number > 0){
                changeproductnumber(number);
            }
        }
        let onChangeNumberPlus=(value)=>{
            let number = item.number;
            number = number + value;
            if(number > 0){
                changeproductnumber(number);
            }
        }
        let onClickDeleteItem =()=>{
            let payload = {
                _id:cartid,
            };
            dispatch(mycartdelone(payload)).then((result)=>{
                    console.log('mycartdelone result:' + JSON.stringify(result));
                    if(result){
                        dispatch(uiinfinitepage_deleteitem(result));
                        dispatch(ui_cartooder_delitem(item));
                    }
            });
            
        }
        let onClickChecktedItem = ()=>{
            if(isselected){
                dispatch(ui_cartooder_delitem(item));
            }
            else{
                dispatch(ui_cartooder_additem(item));
            }
        }
        let proinfo = products[item.product];
        if(proinfo){
            return (
            <Swipeout autoClose={true}
                right={[{
                    text: '删除',
                    style: { backgroundColor: 'red', color: 'white' },
                    onPress:onClickDeleteItem
                }]}
                >
                <div className="li" >
                    <Checkbox 
                        onClick={onClickChecktedItem}
                        checked={isselected}
                        />
                    <div className="l">
                        <img src={proinfo.picurl}/>
                        <div>
                            <span>{proinfo.name}</span>
                            <div className="price">
                                <span>¥{proinfo.pricenow}</span>
                                <div className="btnControl">
                                    <div className="add" onClick={()=>{onChangeNumberPlus(1);}}>+</div>
                                    <div className="num">
                                        <Input name="firstName" type="text" value={item.number} onChange={onChangeNumber}/>
                                    </div>
                                    <div className="del" onClick={()=>{onChangeNumberPlus(-1);}}>-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Swipeout>);
        }
        return (<div>{item.product}产品不存在!</div>);
    }
}

let mapStateToPropsCartItem = ({shop:{products},shopcart:{toordercarts}},props) => {
    let isselected = toordercarts.hasOwnProperty(props.item._id);
    return {products,isselected};
}
Cartitem = connect(mapStateToPropsCartItem)(Cartitem);


export class Pricetotal extends Component {

    createOrder =()=>{
        let toordercarts = this.props.toordercarts;
        let totalprice = this.props.totalprice;
        let prolist = this.props.toordercartsproducts;
        let express = totalprice>this.props.expressfeeforfree?0:this.props.expressfee;
        let orderprice = totalprice + express; 
        let orderAddressInfo = {};
        if(this.props.defaultaddress.hasOwnProperty("_id")){
            orderAddressInfo = this.props.defaultaddress;
        }
        let payload = {
            orderAddressId:'',//地址id
            orderProductsdetail:prolist,//产品列表
            orderExpress:express,//运费
            orderPrice:orderprice,//订单价格
            orderProductPrice : totalprice, //产品总价格
            orderAddressInfo : orderAddressInfo
        }
        this.props.dispatch(set_orderSurePage(payload));
        if(prolist.length>0){
            this.props.history.push("/pay");
        }else{
            this.props.dispatch((showpopmessage({
                title: '订单提交失败',
                msg: '请选择商品',
                type: 'error'
            })))
        }
    }

    render(){
        console.log('Pricetotal renderCaritem==>' + JSON.stringify(this.props));
        const {totalprice,isselected,dispatch,items} = this.props;
        let onClickCheckSelall = ()=>{
            dispatch(ui_cart_selectallitems({isselectedall:!isselected,items}));
        }

        return (
            <div>
                <div className="left">
                    <Checkbox checked={isselected}
                        onClick={onClickCheckSelall}
                        label='全选'
                    />
                    <div className="price">
                        合计: <span>¥{totalprice}</span>
                    </div>
                </div>
                <div className="btn" onClick={()=>{this.createOrder()}}>
                    <span>去结算</span>
                </div>
            </div>
        );
    }
}

let mapStateToPropsPricetotal = (
        {
            shop:{products},
            shopcart:{toordercarts},
            infinitepage:{items},
            app:{expressfee,expressfeeforfree},
            address:{addresslist},
            userlogin:{defaultaddress}
        }
    ) => {
        let totalprice = 0;
        let isselected = false;
        let itemsel = 0;
        let toordercartsproducts = [];
        _.map(toordercarts,(item,key)=>{
            let number = parseInt(item.number);
            let price = parseInt(products[item.product].pricenow);
            let priceitem = number*price;
            priceitem = parseInt(priceitem.toFixed(2));
            totalprice += priceitem;
            itemsel++;
            let product = {
                productid: item.product,
                number: item.number,
                price: price,
                productinfo: products[item.product]
            }
            toordercartsproducts.push(product);
        });
        isselected = itemsel === items.length;
        return {totalprice,isselected,items,toordercarts,toordercartsproducts,expressfee,expressfeeforfree,defaultaddress}
}
Pricetotal = connect(mapStateToPropsPricetotal)(Pricetotal);
Pricetotal = withRouter(Pricetotal);

export class Page extends Component {
    // shouldComponentUpdate(nextProps) {
    //       return false;
    // }

    render() {
        let updateContent = (item)=> {
            return  (
                <div key={item._id}>
                    <Cartitem item={item} />
                </div>
            );
        };

        let onClickReturn = ()=> {
            this.props.history.goBack();
        };

        let onClickPage = (name)=> {
            this.props.history.push(name);
        };

        return (
            <div className="shoppingCartPage"
                style={{
                    height:(window.innerHeight)+"px",
                }}
                >
                <div className="PageHead">
                    <Icon name="angle left" onClick={()=>{onClickReturn()}} />
                    <span className="title">购物车</span>
                </div>
                <div className="proinfo" style={{height:(window.innerHeight-98)+"px"}}>
                    <InfinitePage
                        pagenumber = {30}
                        updateContent= {updateContent} 
                        queryfun= {mycartgetall}
                        listheight= {window.innerHeight-92}
                        query = {{}}
                        sort = {{created_at: -1}}
                    />
                </div>
                <div className="footBtn">
                    <Pricetotal onClickPage={onClickPage} />
                </div>
            </div>
        );
    }
}

Page = connect()(Page);
export default Page;


