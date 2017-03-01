import React, { Component, PropTypes } from 'react';
import Ons from 'react-onsenui';
import Page0 from './home.js';
import Page1 from './community.js';
import Page2 from './myprofile.js';
import TabBottomPage from './tabbottompage.js';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

export default function MyPage(props){
    let contentPages= [];
    contentPages.push(<Page0 {...props} key='home'/>);
    contentPages.push(<Page1 {...props} key='community' />);
    contentPages.push(<Page2 {...props} key='myprofile' />);
    return (<TabBottomPage currentindex={props.currentindex} contentPages={contentPages} onChangedIndex={props.onChangedIndex} />);
}
