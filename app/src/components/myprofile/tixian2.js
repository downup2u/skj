import React, { Component } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu, List, Label,Select } from 'semantic-ui-react';
import '../../../public/css/tixian.css';
import { connect } from 'react-redux';
import {
    profit_set_tixianform,
    showpopmessage,
    sendauth_request,
    profit_set_profitid
} from '../../actions';
import {
    withdrawcashapplyaddone
} from '../../actions/sagacallback.js';

export class Page extends Component {

    onClickReturn =()=>{
        this.props.history.goBack();
    }

    setTixianForm = (e, type)=>{
        let payload = {};
        let val = e.target.value;
        payload[type] = val;
        this.props.dispatch(profit_set_tixianform(payload));
    }

    onClickNext = (name)=> {
        let profitform = this.props.profitform;
        if(profitform.truename==''||profitform.bankaccount==''||profitform.bankname==''){
            this.props.dispatch((showpopmessage({
                title: '提交失败',
                msg: '请完善表单信息',
                type: 'error'
            })))
        }else{
            this.props.dispatch(withdrawcashapplyaddone(profitform)).then((result)=>{
                //生成验证码
                this.props.dispatch(sendauth_request({username: this.props.username}));
                //生成提现记录id
                this.props.dispatch(profit_set_profitid(result.newitem._id));

                setTimeout(()=>{
                    this.props.history.replace("/tixian3");
                },2000)
            });
        }
    }

    render() {
        return (
            <div className="tixianPage"
                 style={{
                height:(window.innerHeight)+"px",
                overflow:"scroll",
                backgroundColor:"#F5F5F5"
             }}>
                <NavBar lefttitle="返回" title="添加银行卡" onClickLeft={this.onClickReturn} />
                <div className="AddressAddPage" style={{marginBottom:"30px"}}>
                    <List selection verticalAlign='middle' className="addAddress">
                        <List.Item>
                            <div className="tit">持卡人:</div>
                            <List.Content>
                                <Input  placeholder='请输入持卡人姓名' onChange={(e)=>{this.setTixianForm(e,"truename")}} />
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <div className="tit">所在银行:</div>
                            <List.Content>
                                <Input  placeholder='请输入银行名称' onChange={(e)=>{this.setTixianForm(e,"bankname")}} />
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <div className="tit">卡号:</div>
                            <List.Content>
                                <Input  placeholder='请输入卡号' onChange={(e)=>{this.setTixianForm(e,"bankaccount")}} />
                            </List.Content>
                        </List.Item>
                    </List>
                </div>
                <div className="buttoncon">
                    <Button primary onClick={()=>{this.onClickNext()}}>下一步</Button>
                </div>
            </div>
        );
    }
}
const mapStateToProps =  ({userlogin,profit}) =>{ return {...userlogin, ...profit};};
export default connect(mapStateToProps)(Page);
