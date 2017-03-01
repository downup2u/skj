import React, { Component, PropTypes } from 'react';
import {Page,Button} from 'react-onsenui';
export default function MyPage(props){
    return (<Page>
      <p style={{textAlign: 'center'}}>
        <Button onClick={props.handleClick}>
          我的!
          </Button>
      </p>
    </Page>);
}
