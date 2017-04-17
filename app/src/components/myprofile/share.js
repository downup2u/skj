/*
    我的推广吗
*/
import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/myorder.css';
import { connect } from 'react-redux';

export class Page extends React.Component {
    render() {
        return (
            <div className="myOrder" style={{height:(window.innerHeight)+"px"}}>
                
            </div>
        )
    }
}

let mapStateToProps = ({shop,order}) => {
    return {...order,...shop};
}

export default connect(mapStateToProps)(Page);




