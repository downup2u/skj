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
        pagesz.push(<Page0 key="page0" {...this.props} />);
        pagesz.push(<Page1 key="page1"  {...this.props} />);
        pagesz.push(<Page2 key="page2"  {...this.props} />);
        let pagewamp = {
            height : window.height,
        }
        let btnsz = [
          {
            title:'首页',
            imgnormal:'/img/2.png',
            imghov:'/img/3.png',
          },
          {
            title:'圈子',
            imgnormal:'/img/2.png',
            imghov:'/img/3.png',
          },
          {
            title:'我的',
            imgnormal:'/img/3.png',
            imghov:'/img/2.png',
          },
        ];
        let btncosz = [];
        for(let index in btnsz ){
          if(index === this.props.curtabindex){
            btncosz.push(<Button key={'btn'+index} onClick={this.onClickTab.bind(this,index)} className="action">
                    <img src={btnsz[index].imghov} />
                    <span>{btnsz[index].title}</span>
                </Button>);
          }
          else{
            btncosz.push(<Button key={'btn'+index} onClick={this.onClickTab.bind(this,index)}>
                    <img src={btnsz[index].imgnormal} />
                    <span>{btnsz[index].title}</span>
                </Button>);
          }
        }
        return (
            <div style={pagewamp}>
                <div className="pageStyle">
                    {pagesz[this.props.curtabindex]}
                </div>
                <div className="homeBottom">
                  {btncosz}
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
