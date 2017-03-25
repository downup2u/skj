import React, { Component, PropTypes } from 'react';
import '../../../public/css/user.css';
import { Input, Button } from 'semantic-ui-react'
import NavBar from '../nav.js';

export default class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    render() {

        return (
            <div className="ChangeUsernamePage">
                <NavBar lefttitle="返回" title="修改用户名" onClickLeft={this.onClickReturn} />
                <div className="inputContent">
                    <Input focus placeholder='jwhklk' />
                </div>

                <div className="btnSub">
                    <Button primary>确定</Button>
                </div>
            </div>
        )
    }
}
