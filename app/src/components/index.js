import React, { Component, PropTypes } from 'react';


import TabBottomPage from './tab.js';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Navigator from "./nav";

export default class Page extends React.Component {

  componentWillMount () {
  }


  onClickBack(){
  }
  render() {

    return (<TabBottomPage navigator={Navigator}/>);

  }
}
