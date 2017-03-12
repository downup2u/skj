import React from 'react'
import { Button,Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {clickTab} from '../actions/index.js';
import Page0 from './home.js';
import Page1 from './community.js';
import Page2 from './myprofile.js';

export class Page extends React.Component {

  componentWillMount () {

  }


  onClickTab(curtabindex){
    this.props.dispatch(clickTab({curtabindex:curtabindex}));
  }
  render() {
    let pagesz = [];
    pagesz.push(<Page0 {...this.props} />);
    pagesz.push(<Page1 {...this.props} />);
    pagesz.push(<Page2 {...this.props} />);
    return (
      <div>
        <Segment attached>
          {pagesz[this.props.curtabindex]}
        </Segment>
        <Button.Group attached='bottom'>
          <Button onClick={this.onClickTab.bind(this,0)}>首页</Button>
          <Button onClick={this.onClickTab.bind(this,1)}>圈子</Button>
          <Button onClick={this.onClickTab.bind(this,2)}>我的</Button>
        </Button.Group>
  </div>
);

  }
}

const mapStateToProps = ({app}) => {
  return app;
}
Page = connect(mapStateToProps)(Page);
export default Page;
