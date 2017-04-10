import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { connect } from 'react-redux';
import { Input, Button, Menu, Radio, Label, Icon } from 'semantic-ui-react';
import '../../../public/css/shoppingcart.css';


export class Page extends React.Component {

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
                <div className="proinfo">
                    <div className="li">
                        <Radio />
                        <div className="l">
                            <img src="./img/myprofile/16.png"/>
                            <div>
                                <span>这是产品标题内容这是产品标题内容这是产品标题内容这是产品标题内容</span>
                                <div className="price">
                                    <span>¥499.00</span>
                                    <div className="btnControl">
                                        <div className="add">+</div>
                                        <div className="num"><Input  /></div>
                                        <div className="del">-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="li">
                        <Radio />
                        <div className="l">
                            <img src="./img/myprofile/16.png"/>
                            <div>
                                <span>这是产品标题内容这是产品标题内容这是产品标题内容这是产品标题内容</span>
                                <div className="price">
                                    <span>¥499.00</span>
                                    <div className="btnControl">
                                        <div className="add">+</div>
                                        <div className="num"><Input  /></div>
                                        <div className="del">-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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