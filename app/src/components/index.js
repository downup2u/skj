import React, { Component, PropTypes } from 'react';


import TabBottomPage from './tab.js';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';



export default class Page extends React.Component {

  componentWillMount () {

  }


  onClickBack(){
  }
  render() {

    return (<TabBottomPage {...this.props}/>);

  }
}
