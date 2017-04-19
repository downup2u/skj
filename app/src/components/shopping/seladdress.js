/*
 * 选择收货地址
 * */
import React, { Component, PropTypes } from 'react';
import { Input, List, Checkbox, Button, Icon } from 'semantic-ui-react'
import NavBar from '../nav.js';
import Swipeout from 'rc-swipeout';
import 'rc-swipeout/assets/index.css';
import { connect } from 'react-redux';
import {getaddresslist_request,deleteaddress_request} from '../../actions/index.js';
import { deleteaddress_confirmpopshow,deleteaddress_confirmpophide } from '../../actions/index.js';

export class Page extends React.Component {

}
const mapStateToProps = ({address,userlogin}) => {
    return {...address};
};
Page = connect(mapStateToProps)(Page);
export default Page;