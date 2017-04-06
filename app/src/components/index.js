import React from 'react'
import { Button,Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {clickTab} from '../actions/index.js';
import Page0 from './home.js';
import Page1 from './community.js';
//import Page2 from './test';
import Page2 from './shopping/index.js';
import Page3 from './myprofile.js';
import HomeBottom from './homebottom.js';
import '../../public/css/index.css';


export class Page extends React.Component {
    componentWillMount() {

    }

    onClickTab(curtabindex) {
        this.props.dispatch(clickTab({curtabindex: curtabindex}));
    }

    render() {
        let pagesz = [];
        pagesz.push(<Page0 key="page0" {...this.props} />);
        pagesz.push(<Page1 key="page1"  {...this.props} />);
        pagesz.push(<Page2 key="page2"  {...this.props} />);
        pagesz.push(<Page3 key="page3"  {...this.props} />);
        let btnsz = [
            {
                title: '首页',
                imgnormal: 'img/bottom2.png',
                imghov: 'img/bottom1.png',
            },
            {
                title: '圈子',
                imgnormal: 'img/bottom4.png',
                imghov: 'img/bottom3.png',
            },
            {
                title: '商城',
                imgnormal: 'img/bottom6.png',
                imghov: 'img/bottom5.png',
            },
            {
                title: '我的',
                imgnormal: 'img/bottom8.png',
                imghov: 'img/bottom7.png',
            },
        ];
        let btncosz = [];
        btnsz.forEach((obj,index)=> {
            if (index === this.props.curtabindex) {
                btncosz.push(<Button key={'btn'+index} onClick={this.onClickTab.bind(this,index)} className="action">
                    <img src={btnsz[index].imghov}/>
                    <span>{btnsz[index].title}</span>
                </Button>);
            }
            else {
                btncosz.push(<Button key={'btn'+index} onClick={this.onClickTab.bind(this,index)}>
                    <img src={btnsz[index].imgnormal}/>
                    <span>{btnsz[index].title}</span>
                </Button>);
            }
        });
        return (
            <div style={{height:window.innerHeight+"px"}}>
                <div className="pageStyle">
                    {pagesz[this.props.curtabindex]}
                </div>
                <HomeBottom />
            </div>
        );
    }
}

const mapStateToProps = ({app}) => {
    return app;
};

Page = connect(mapStateToProps)(Page);
export default Page;
