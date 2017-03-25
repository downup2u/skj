import React from 'react';
import { Header, Segment, Button, Grid, Popup, Icon } from 'semantic-ui-react';
import '../../public/css/head.css';
import Lnk from './lnk.js';


export class Page extends React.Component {

    componentWillMount() {

    }

    render() {
        return (

            <Segment className="headContent">

                {this.props.hasOwnProperty('lefttitle') ?
                    (<span className="leftlnk">
                    <Button onClick={this.props.onClickLeft}>{this.props.lefttitle}</Button>
                    </span>) : (<span className="leftlnk"></span>)
                }

                <span className="title">
                {this.props.titlename}
                </span>
                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign='right'>
                            <Popup
                                trigger={<Icon name='ellipsis horizontal' color='grey' size='large'/>}
                                position='top right'
                                >
                                <div className="communityMoreLnk">
                                    <div>
                                        <Icon name="add circle"/>
                                        <Lnk value="发布" url="/newtopic" {...this.props} />
                                    </div>
                                    <div>
                                        <Icon name="commenting"/>
                                        <Lnk value="我的发布" url="/mytopiclist" {...this.props} />
                                    </div>
                                </div>
                            </Popup>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        );

    }
}
export default Page;
