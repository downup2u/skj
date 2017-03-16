import React from 'react';
import { Header, Segment,Button } from 'semantic-ui-react';
import '../../public/css/head.css';


export class Page extends React.Component {

  componentWillMount () {

  }

  render() {

      return (<Segment className="headContent">

          {this.props.hasOwnProperty('lefttitle')?
              (<span className="leftlnk">
              <Button onClick={this.props.onClickLeft}>{this.props.lefttitle}</Button>
              </span>):(<span className="leftlnk"></span>)
          }

          <span className="title">
              {this.props.title}
          </span>

          {this.props.hasOwnProperty('righttitle')?
              (<span className="rightlnk">
              <Button onClick={this.props.onClickRight}>{this.props.righttitle}</Button>
              </span>):(<span className="rightlnk"></span>)
          }

      </Segment>);

  }
}
export default Page;
