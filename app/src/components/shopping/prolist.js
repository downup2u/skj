/*
 * 商城首页
 * */
import React, { Component } from 'react';
import { Button, Comment, Header, Feed, Icon, Input  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Swiper, Slide } from 'react-dynamic-swiper';
import '../../../node_modules/react-dynamic-swiper/lib/styles.css';
import '../../../public/css/shoppingprolist.css';
import _ from 'lodash';
import { 
    uiaddcartdilog,
    getproduct_request,
    set_productlist
} from '../../actions';
import Addcartdilog from './addcartdilog.js';

export class Page extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showSortlistmore: false,
            searchInputFocus: false
        };
        //_.sortBy(users, ['user', 'age']);
        this.sortfn = {
            0: ['name'],//综合排序按照name排序
            1: ['salesvolume'],//人气根据销量排序
            2: ['publishdate'],//最新根据发布时间排序
            3: ['pricenow'],//根据价格排序
            4: ['-pricenow']//根据价格倒序排序
        };
        //排序列表
        this.sortlist = [
            {name : "综合"},
            {name : "热门"},
            {name : "新品"},
            {name : "价格"}
        ]
    }

    componentWillMount = ()=> {
        let protype = this.props.match.params.type;
        this.setState({searchInputFocus: (protype==="search")});
        this.setCategoryid(protype==="search"?0:protype);
    }

    onClickReturn = ()=> {
        this.props.history.goBack();
    }

    onClickPage = (name)=> {
        this.props.history.push(name);
    }

    toggleSortlistmore = ()=>{

    }

    showaddcartdilog =(e, proid)=>{
        e.stopPropagation(e);
        this.props.dispatch(uiaddcartdilog({
            addcartdilogshow : true,
            addcartdilogproid : proid
        }));
    }

    //筛选产品类型
    setCategoryid =(id)=>{
        let payload = {
            productslistType : id
        }
        this.props.dispatch(set_productlist(payload));
    }
    //配置排序条件
    setSorttype =(index)=>{
        let payload = {
            productslistSorttype : index
        }
        this.props.dispatch(set_productlist(payload));
    }

    //根据查询条件查询产品
    //此时产品类型被设为全部
    setSearchtxt =(e)=>{
        let payload = {
            productslistSearchtxt : e.target.value,
            productslistType : 0
        }
        this.props.dispatch(set_productlist(payload));
    }
    //产品列表页面配置参数set_productlist
    // productslistType : 0,
    // productslistSorttype : 0,
    // productslistSearchtxt: '',

    componentWillUnmount(){
        let payload = {
            productslistSearchtxt : "",
            productslistType : 0
        }
        this.props.dispatch(set_productlist(payload));
    }

    render() {

        //更具类型筛选产品
        let fillerList = {};
        if(this.props.productslistType!=0){
            fillerList = _.filter(this.props.products, { 'categoryid': this.props.productslistType });
        }else{
            fillerList = this.props.products;
        }

        //根据查询筛选
        let searchKey = this.props.productslistSearchtxt;
        let fillerSearchList = fillerList;
        if(searchKey!=''){
            fillerSearchList = _.filter(fillerList, (o)=>{
                return o.name.indexOf(searchKey)!=-1;
            });
            console.log(fillerSearchList);
        }

        //排序
        let newsortlist = _.sortBy(fillerSearchList, this.sortfn[this.props.productslistSorttype]);

        return (
            <div className="ProlistPage">

                <div className="searchHead">
                    <Icon name="angle left" onClick={()=>{this.onClickReturn()}} />
                    <Input
                        placeholder="请输入关键字"
                        focus={this.state.searchInputFocus}
                        onChange = {(e)=>{this.setSearchtxt(e)}}
                        />
                    <span className="imgcont" onClick={()=>{this.onClickPage('/shoppingcart')}} >
                        <img src="img/shopping/11.png"/>
                        <span className={this.props.remoteRowCount==0?"hide":""}>{this.props.remoteRowCount}</span>
                    </span>
                </div>
                <div className="hotLnk">
                    <span 
                        key="all" 
                        onClick={()=>{this.setCategoryid(0)}}
                        className={this.props.productslistType==0?"sel":""}
                        >
                        全部
                    </span>
                    {_.map(this.props.categories, (category, index)=>{
                        if(category.name!="套餐"&&category.name!="一体机"){
                            return (
                                <span 
                                    key={index}
                                    onClick={()=>{this.setCategoryid(category._id)}}
                                    className={this.props.productslistType==category._id?"sel":""}
                                    >
                                    {category.name}
                                </span>
                            )
                        }else{
                            return (
                                <span key={index} style={{display:"none"}}></span>
                            )
                        }
                        
                    })}
                </div>
                <div className="sortList">
                    {_.map(this.sortlist, (sortlistitem, index)=>{
                        return (
                            <span 
                                key={index}
                                onClick={()=>{this.setSorttype(index)}}
                                className={this.props.productslistSorttype==index?"sel":""}
                                >
                                {sortlistitem.name}
                            </span>
                        )
                    })}
                    
                </div>

                <div className="proList">
                    {
                        _.map(newsortlist,(proinfo, index)=>{
                            return (
                                <div className="li" key={index} onClick={()=>{this.onClickPage(`/shoppingproinfo/${proinfo._id}`)}}>
                                    <img src={proinfo.picurl}/>
                                    <span className="name">{proinfo.name}</span>
                                    <span className="price">
                                        <span>¥{proinfo.pricenow}</span>
                                        <img src='img/shopping/9.png' onClick={(e)=>{this.showaddcartdilog(e,proinfo._id)}}/>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                <Addcartdilog 
                    show={this.props.addcartdilogshow}
                    proid={this.props.addcartdilogproid}
                    number={this.props.addcartdilogpronumber}
                    type="cart"
                />
            </div>
        )
    }
}

let mapStateToProps = ({shop,shopcart,app}) => {
    return {...shop,...shopcart,...app};
}

export default connect(mapStateToProps)(Page);


