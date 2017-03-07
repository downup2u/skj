import React, { Component, PropTypes } from 'react';
import {Page,Button} from 'react-onsenui';
export default function MyPage(props){
    console.log('topicid:' + props.topicid);

    return (<Page>
      <p style={{textAlign: 'center'}}>
          <Button onClick={()=>{
            props.history.goBack();
          }}>
          圈子详情!点击返回
          </Button>
      </p>
    </Page>);
}
