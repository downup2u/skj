import React from 'react'
import { Button,Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {clickTab} from '../actions/index.js';
import Page0 from './home.js';
import Page1 from './community.js';
import Page2 from './myprofile.js';
import '../../public/css/index.css';

export class Page extends React.Component {
    componentWillMount() {

    }

    onClickTab(curtabindex) {
        this.props.dispatch(clickTab({curtabindex: curtabindex}));
    }

    render() {
        let pagesz = [];
        pagesz.push(<Page0 {...this.props} />);
        pagesz.push(<Page1 {...this.props} />);
        pagesz.push(<Page2 {...this.props} />);
        let pagewamp = {
            height : window.height,
        }
        return (
            <div style={pagewamp}>
                <div className="pageStyle">
                    {pagesz[this.props.curtabindex]}
                </div>
                <div className="homeBottom">
                    <Button onClick={this.onClickTab.bind(this,0)} className="action">
                        <img src="/img/2.png" />
                        <span>首页</span>
                    </Button>
                    <Button onClick={this.onClickTab.bind(this,1)}>
                        <img src="/img/3.png" />
                        <span>圈子</span>
                    </Button>
                    <Button onClick={this.onClickTab.bind(this,2)}>
                        <img src="/img/3.png" />
                        <span>我的</span>
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({app}) => {
    return app;
};

Page = connect(mapStateToProps)(Page);
export default Page;