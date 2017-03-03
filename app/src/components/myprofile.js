import React, { Component, PropTypes } from 'react';
import {Page,Button} from 'react-onsenui';
import MyProfileDetail from './profiledetail.js';

export default function MyPage(props){
    return (<Page>
      <p style={{textAlign: 'center'}}>
      <Button onClick={()=>{
        props.navigator.pushPage({
                comp: MyProfileDetail,
                props: {key: "topicdetail", myprofile: {name:'aaa',age:12}}
        });
      }}>
          我的!
          </Button>
      </p>
    </Page>);
}
