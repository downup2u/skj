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
import { Field, FieldArray, reduxForm } from 'redux-form'

let Page = (props) => {
    let updateContent = (item)=> {
        let proinfo = props.products[item.product];
        if(proinfo){
            return  (
                <div key={item._id}>
                    <Swipeout autoClose={true}
                        right={[{
                            text: '删除',
                            style: { backgroundColor: 'red', color: 'white' }}
                        ]}
                        onOpen={() => console.log('open')}
                        onClose={() => console.log('close')}
                    >
                        <div className="li" >
                            <Radio />
                            <div className="l">
                                <img src={proinfo.picurl}/>
                                <div>
                                    <span>{proinfo.name}</span>
                                    <div className="price">
                                        <span>{proinfo.pricenow}</span>
                                        <div className="btnControl">
                                            <div className="add">+</div>
                                            <div className="num">
                                                <Field name="firstName" component="input" type="text" placeholder="First Name" value={item.number} />
                                            </div>
                                            <div className="del">-</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Swipeout>
                </div>
            );
        }
    };

    let onClickReturn = ()=> {
        props.history.goBack();
    };

    let onClickPage = (name)=> {
        props.history.push(name);
    };

    return (
        <form>
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
                            合计: <span>¥499.00</span>
                        </div>
                    </div>
                    <div className="btn" onClick={()=>{onClickPage('/pay')}}>
                        <span>去结算</span>
                    </div>
                </div>
            </div>
        </form>
    );
}

let mapStateToProps = ({shop}) => {
    return {...shop};
}

Page = connect(mapStateToProps)(Page);
export default reduxForm({form: 'simple'})(Page);


