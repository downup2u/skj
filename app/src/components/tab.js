/**
 * Created by tanDong on 2017/2/27.
 */
import React from "react"
import {Page,Tabbar,Tab} from 'react-onsenui';
import Navigator from "./nav"
import Page0 from './home.js';
import Page1 from './community.js';
import Page2 from './myprofile.js';


let rendertabs =(appNavigator)=>{
  return [
      {
        content: <Page key="home">
            <Navigator initialRoute={{comp: Page0, props: {key: "home"}}} app={appNavigator}/>
        </Page>,
        tab: <Tab label='主页' icon='md-home' key={'home'}/>
      },
      {
        content: <Page key="community">
            <Navigator initialRoute={{comp: Page1, props: {key: "community"}}} app={appNavigator}/>
        </Page>,
        tab: <Tab label='圈子' icon='ion-plus' key={'community'} />
      },
      {
        content:<Page key="myprofile">
            <Navigator initialRoute={{comp: Page2, props: {key: "myprofile"}}} app={appNavigator}/>
        </Page>,
        tab: <Tab label='我的' icon='md-settings' key={'myprofile'} />
      }
    ];
};

const Tabs = (props) => {
    return (
        <Page>
            <Tabbar renderTabs={() => rendertabs(props.navigator)}/>
        </Page>
    )
}
export default Tabs;
