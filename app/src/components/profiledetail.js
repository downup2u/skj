import React, { Component, PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
export default function MyPage(props){

    return (<div>
      <p style={{textAlign: 'center'}}>
          <Button onClick={()=>{
            props.history.goBack();
          }}>
          个人中心详情!点击返回
          </Button>
      </p>
    </div>);
}
