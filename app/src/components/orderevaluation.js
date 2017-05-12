/*
 * 订单评价
 * */
import React, { Component } from 'react';
import { Input, Button, Menu,Select,TextArea } from 'semantic-ui-react';
import NavBar from './newnav.js';
import '../../public/css/orderevaluation.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
    set_weui,
    evaluation_data
} from '../actions';
import {
    productcommentaddone,
    myorderupdateone
} from '../actions/sagacallback';

export class Page extends Component {

    setCommenttxt = (e)=>{
        let data = {
            commenttxt : e.target.value
        }
        this.props.dispatch(evaluation_data(data));
    };

    submitForm = ()=>{
        let data = { 
            product : this.props.evaluation.productid,
            order : this.props.evaluation.orderid,
            commenttxt : this.props.evaluation.commenttxt
        };

        let order = this.props.orderinfo;
        this.props.dispatch(productcommentaddone(data)).then(({result})=>{

            //console.log("mycollectionisproductexits result=>" + JSON.stringify(result));
            this.props.dispatch(
                set_weui({
                    toast : {
                        show : true,
                        text : "感谢您评论该商品",
                        type : "success"
                    }
                })
            )

            //修改订单下的产品评论情况
            let newproductsdetail = [];
            _.map(order.productsdetail, (product, index)=>{
                let newproduct = product;
                if(this.props.evaluation.productid==product.productid){
                    newproduct["isevaluation"] = true;
                }
                newproductsdetail.push(newproduct);
            })
            let payload = {
                _id: order._id,
                data:{
                    productsdetail : newproductsdetail
                }
            };
            this.props.dispatch(myorderupdateone(payload)).then(({updateditem})=>{
                setTimeout(()=>{
                    this.props.history.goBack();
                },1500)
            });

        });
    };

    render() {
        return (
            <div className="orderevaluationPage">
                <NavBar back={true} title="商品评价" />

                <div className="proinfo">

                    <div className="li">
                        <img src={this.props.productinfo.picurl}/>
                        <div>
                            <span>{this.props.productinfo.name}</span>
                            <span className="price">
                                <span>订单编号:<span>{this.props.evaluation.orderid}</span></span>
                            </span>
                        </div>
                    </div>

                </div>

                <div className="list">
                    <div className="li explain">
                        <TextArea 
                            placeholder='喜欢宝贝吗？卖家服务怎么样，产品效果怎么怎么样？'
                            onChange = {(e)=>{
                                this.setCommenttxt(e);
                            }}
                            />
                    </div>
                </div>

                <div className="subBtn">
                    <Button 
                        primary
                        onClick={()=>{this.submitForm();}}
                        >
                    确定</Button>
                </div>

            </div>
        );
    }
}

let PageData = ({evaluation, shop:{products}, shoporder:{orders}}) => {
    let productinfo = products[evaluation.productid];
    let orderinfo = orders[evaluation.orderid];
    return { evaluation, productinfo, orderinfo};
}

export default connect(PageData)(Page)
