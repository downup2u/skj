/*
 * 购物车
 * */
import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { connect } from 'react-redux';
import { Input, Button, Menu, Radio, Label, Icon } from 'semantic-ui-react';
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
    ui_cartooder_delitem
} from '../../actions';
import _ from 'lodash';

let Caritem =(props)=>{
    console.log('renderCaritem==>' + JSON.stringify(props));
    let {item} = props;
    let cartid = item._id;
    let changeproductnumber = (number)=>{
         let payload = {
             _id:cartid,
             data:{
                 product:item.product,
                 number
            }
          };
          props.dispatch(mycartupdateone(payload)).then((result)=>{
            console.log('mycartupdateone result:' + JSON.stringify(result));
            if(result){
                props.dispatch(uiinfinitepage_updateitem(result.updateditem));
                props.dispatch(ui_cartooder_updateitem(result.updateditem));
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
          props.dispatch(mycartdelone(payload)).then((result)=>{
                console.log('mycartdelone result:' + JSON.stringify(result));
                if(result){
                    props.dispatch(uiinfinitepage_deleteitem(result));
                    props.dispatch(ui_cartooder_delitem(item));
                }
          });
          
     }
     let onClickChecktedItem = ()=>{
         if(props.isselected){
            props.dispatch(ui_cartooder_delitem(item));
         }
         else{
            props.dispatch(ui_cartooder_additem(item));
         }
     }
     let proinfo = props.products[item.product];
     return (<Swipeout autoClose={true}
                        right={[{
                            text: '删除',
                            style: { backgroundColor: 'red', color: 'white' },
                            onPress:onClickDeleteItem
                            },
                        ]}
                        onOpen={() => console.log('open')}
                        onClose={() => console.log('close')}
                    >
                        <div className="li" >
                            <Radio checked={props.isselected} onClick={onClickChecktedItem}/>
                            <div className="l">
                                <img src={proinfo.picurl}/>
                                <div>
                                    <span>{proinfo.name}</span>
                                    <div className="price">
                                        <span>{proinfo.pricenow}</span>
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

let Page = (props) => {

    let updateContent = (item)=> {
            let isselected = props.toordercarts.hasOwnProperty(item._id);
            return  (
                <div key={item._id}>
                    <Caritem item={item} isselected={isselected} products={props.products} dispatch={props.dispatch}/>
                </div>
            );
        
    };

    let onClickReturn = ()=> {
        props.history.goBack();
    };

    let onClickPage = (name)=> {
        props.history.push(name);
    };

    let totalprice = 0;
    _.map(props.toordercarts,(item,key)=>{
        let number = parseInt(item.number);
        let price = parseInt(props.products[item.product].pricenow);
        let priceitem = number*price;
        priceitem = priceitem.toFixed(2);
        totalprice += priceitem;
    });
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
                <div className="proinfo" style={{height:(window.innerHeight-92)+"px"}}>
                    <InfinitePage
                        pagenumber = {30}
                        updateContent= {updateContent.bind(this)} 
                        queryfun= {mycartgetall}
                        listheight= {window.innerHeight-92}
                        query = {{}}
                        sort = {{created_at: -1}}
                    />
                </div>
                <div className="footBtn">
                    <div className="left">
                        <Radio label='全选'/>
                        <div className="price">
                            合计: <span>¥{totalprice}</span>
                        </div>
                    </div>
                    <div className="btn" onClick={()=>{onClickPage('/pay')}}>
                        <span>去结算</span>
                    </div>
                </div>
            </div>
       
    );
}



let mapStateToProps = ({shop,shopcart}) => {
    return {...shop,...shopcart};
}
Page = connect(mapStateToProps)(Page);


export default Page;