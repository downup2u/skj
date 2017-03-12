import React from 'react';
import { Header, Segment,Button } from 'semantic-ui-react';

export class Page extends React.Component {

  componentWillMount () {

  }

  render() {

    return (<Segment >
      {this.props.hasOwnProperty('righttitle')?
         (<Header as='h3' textAlign='right'>
          <Button onClick={this.props.onClickRight}>{this.props.righttitle}</Button>
        </Header>):null
      }
      {this.props.hasOwnProperty('lefttitle')?
        (<Header as='h3' textAlign='left'>
          <Button onClick={this.props.onClickLeft}>{this.props.lefttitle}</Button>
        </Header>):null
      }
      <Header as='h3' textAlign='center'>
        {this.props.title}
      </Header>
    </Segment>);

  }
}
export default Page;
