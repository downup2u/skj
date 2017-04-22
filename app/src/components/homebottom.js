import React from 'react';
import { connect } from 'react-redux';
import { Button,Segment } from 'semantic-ui-react';
import {clickTab,setmsgcount} from '../actions/index.js';
import {getnotifymessage} from '../actions/sagacallback.js';

import Page0 from './home.js';
import Page1 from './community.js';
//import Page2 from './test';
import Page2 from './shopping/index.js';
import Page3 from './myprofile.js';
import '../../public/css/index.css';

export class Page extends React.Component {
    componentWillMount() {

    }

    onClickTab(curtabindex) {
        this.props.dispatch(clickTab({curtabindex: curtabindex}));
        if(curtabindex === 3){
            let payload = {
                query:{created_at:{$gt:this.props.lastreadmsgtime_at}},
                options:{
                    page: 1,
                    limit: 1,
                }
            };
            this.props.dispatch(getnotifymessage(payload)).then(({result})=>{
                console.log('setmsgcount:' + result.total);
                this.props.dispatch(setmsgcount(result.total));
                //getnotifymessage result=>{"docs":[],"total":0,"limit":10,"page":1,"pages":1}
            });
        }
    }

    render() {
        // let pagesz = [];
        // pagesz.push(<Page0 key="page0" {...this.props} />);
        // pagesz.push(<Page1 key="page1"  {...this.props} />);
        // pagesz.push(<Page2 key="page2"  {...this.props} />);
        // pagesz.push(<Page3 key="page3"  {...this.props} />);
        // let pagewamp = {
        //     height: window.height,
        // }
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
            <div className="homeBottom">
                {btncosz}
            </div>
        );
    }
}

const mapStateToProps = ({app:{curtabindex},userlogin:{lastreadmsgtime_at}}) => {
    return {curtabindex,lastreadmsgtime_at};
};

Page = connect(mapStateToProps)(Page);
export default Page;


