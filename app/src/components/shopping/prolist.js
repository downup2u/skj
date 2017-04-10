/*
 * 商城首页
 * */
import React, { Component, PropTypes } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingprolist.css';

export class Page extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showSortlistmore: false,
            searchInputFocus: false
        };
    }

    componentWillMount = ()=> {
        let protype = this.props.match.params.type;
        this.setState({searchInputFocus: (protype==="search")});
    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    }

    onClickPage = (name)=> {
        this.props.history.push(name);
    }

    toggleSortlistmore = ()=>{

    }

    render() {
        console.log(this.state.searchInputFocus)
        return (
            <div className="ProlistPage">

                <div className="searchHead">
                    <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                    <Input placeholder="请输入关键字" focus={this.state.searchInputFocus}/>
                    <img src="img/shopping/11.png"  onClick={()=>{this.onClickPage('/shoppingcart')}} />
                </div>
                <div className="hotLnk">
                    <span className="sel">净水器·滤芯</span>
                    <span>净水器·水龙头</span>
                    <span>净水器·配件</span>
                    <span>净水器·净水装置</span>
                </div>
                <div className="sortList">
                    <span>综合</span>
                    <span>热门</span>
                    <span>新品</span>
                    <span onClickPage={this.toggleSortlistmore}>价格<Icon name="sort"/></span>
                    <div className={this.state.showSortlistmore?"sortlistmore":"sortlistmore hide"}>
                        <span>销量</span>
                        <span>价格</span>
                    </div>
                </div>

                <div className="proList" style={{height:(window.innerHeight-58-42-43)+"px"}}>

                    <div className="li" onClick={()=>{this.onClickPage('/shoppingproinfo')}}>
                        <img src="img/shopping/8.png"/>
                        <span className="name">水可净智能水盒子</span>
                        <span className="price">
                            <span>¥499.00</span>
                            <img src="img/shopping/9.png"/>
                        </span>
                    </div>
                    
                </div>
            </div>
        )
    }
}

let mapStateToProps = ({shop}) => {
    return {...shop};
}
export default connect(mapStateToProps)(Page);
