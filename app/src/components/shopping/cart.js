import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { connect } from 'react-redux';
import { Input, Button, Menu, Radio, Label, Icon } from 'semantic-ui-react';
import '../../../public/css/shoppingcart.css';
import { mycartgetall } from '../../actions/sagacallback.js';
import InfinitePage from '../controls/infinitecontrol';
import Swipeout from 'rc-swipeout';

export class Page extends React.Component {

    updateContent = (item)=> {
        let proinfo = this.props.products[item.product];
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
                                            <div className="num"><Input value={item.number} /></div>
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

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onClickPage = (name)=> {
        this.props.history.push(name);
    };

    render() {
        return (
            <div className="shoppingCartPage"
                style={{
                    height:(window.innerHeight)+"px",
                }}
                >
                <div className="PageHead">
                    <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                    <span className="title">购物车</span>
                </div>
                <div className="proinfo" style={{height:(window.innerHeight-92)+"px"}}>
                    <InfinitePage
                        pagenumber = {30}
                        updateContent= {this.updateContent.bind(this)} 
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
                    <div className="btn" onClick={()=>{this.onClickPage('/pay')}}>
                        <span>去结算</span>
                    </div>
                </div>


            </div>
        );
    }
}

let mapStateToProps = ({shop}) => {
    return {...shop};
}
export default connect(mapStateToProps)(Page);

