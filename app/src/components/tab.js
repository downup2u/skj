/**
 * Created by tanDong on 2017/2/27.
 */
import React from "react"
import {Page,Tabbar,Tab} from 'react-onsenui';

import Page0 from './home.js';
import Page1 from './community.js';
import Page2 from './myprofile.js';


let rendertabs =(props)=>{
  return [
      {
        content: <Page key="home">
            <Page0 {...props}/>
        </Page>,
        tab: <Tab label='主页' icon='md-home' key={'home'}/>
      },
      {
        content: <Page key="community">
            <Page1 {...props}/>
        </Page>,
        tab: <Tab label='圈子' icon='ion-plus' key={'community'} />
      },
      {
        content:<Page key="myprofile">
            <Page2 {...props}/>
        </Page>,
        tab: <Tab label='我的' icon='md-settings' key={'myprofile'} />
      }
    ];
};

const Tabs = (props) => {
    return (
        <Page>
            <Tabbar renderTabs={() => rendertabs(props)}/>
        </Page>
    )
}
export default Tabs;
