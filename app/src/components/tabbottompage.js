import React, { Component, PropTypes } from 'react';
import {Tabbar,Tab} from 'react-onsenui';
export default function TabBottomPage({curtabindex,contentPages,onChangedIndex}){
  let rendertabs =()=>{
    return [
        {
          content: contentPages[0],
          tab: <Tab label='主页' icon='md-home' key={'home'}/>
        },
        {
          content: contentPages[1],
          tab: <Tab label='圈子' icon='md-settings' key={'community'} />
        },
        {
          content: contentPages[2],
          tab: <Tab label='我的' icon='md-settings' key={'myprofile'} />
        }
      ];
    }
    return (
     <Tabbar
       index={curtabindex}
       onPreChange={(event) =>
         {
           if (event.index != curtabindex) {
             onChangedIndex(event.index);
           }
         }
       }
       renderTabs={rendertabs}
     />
   );
};
