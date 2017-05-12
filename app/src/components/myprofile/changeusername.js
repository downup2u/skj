import React, { Component } from 'react';
import '../../../public/css/user.css';
import { Input, Button } from 'semantic-ui-react'
import NavBar from '../nav.js';
import {fillprofile_request,ui_changeusername} from '../../actions';
import { connect } from 'react-redux';
class Page extends Component {

    onClickReturn = ()=> {
        this.props.dispatch(ui_changeusername(this.props.profile.nickname));
        this.props.history.goBack();
    };
    onClickOK = ()=>{
        let profile = {...this.props.profile};
        profile.nickname = this.props.editusername;
        this.props.dispatch(fillprofile_request({profile}));
        this.props.history.goBack();
    }
    onChange =(e)=>{
        this.props.dispatch(ui_changeusername(e.target.value));
    }
    render() {

        return (    
            <div className="ChangeUsernamePage">
                <NavBar lefttitle="返回" title="修改用户名" onClickLeft={this.onClickReturn} />
                <div className="inputContent">
                    <Input focus  value={this.props.editusername} onChange={this.onChange}/>
                </div>

                <div className="btnSub">
                    <Button primary onClick={this.onClickOK}>确定</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({userlogin}) =>{
    return userlogin;
};

export default connect(
    mapStateToProps
)(Page);