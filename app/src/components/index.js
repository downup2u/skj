import React from 'react'
import { Button,Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Page0 from './home.js';
import Page1 from './community.js';
import Page2 from './shopping/index.js';
import Page3 from './myprofile.js';
import HomeBottom from './homebottom.js';
import '../../public/css/index.css';
import {setbackhandler,removebackhandler,exitAndroidApp} from '../env/android';
import {set_weui, set_innerheight} from '../actions';

export class Page extends React.Component {
    componentWillMount() {
      let that = this;
      setbackhandler(()=>{

        console.log('click android back');
        let confirm = {
          show : true,
          title : "你确定需要退出吗",
          text : "",
          buttonsClose : ()=>{console.log('click close');},
          buttonsClick : ()=>{exitAndroidApp();}
        };
        that.props.dispatch(set_weui({confirm}));

      });


      //this.props.dispatch(set_innerheight());
    }

    componentWillUnmount() {
      removebackhandler();
    }



    render() {
        let innerheight = window.innerHeight;
        let pagesz = [];
        pagesz.push(<Page0 key="page0" />);
        pagesz.push(<Page1 key="page1" />);
        pagesz.push(<Page2 key="page2" />);
        pagesz.push(<Page3 key="page3" />);

        const {curtabindex} = this.props;
        return (
            <div style={{height: innerheight+"px"}}>
                <div className="pageStyle">
                    {pagesz[curtabindex]}
                </div>
                <HomeBottom />
            </div>
        );
    }
}

const mapStateToProps = ({app:{curtabindex}}) => {
    return {curtabindex};
};
Page = connect(mapStateToProps)(Page);
export default Page;
