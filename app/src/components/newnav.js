import React from 'react';
import { Icon } from 'semantic-ui-react';
import '../../public/css/newnav.css';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

export class Page extends React.Component {

    pageBack=()=>{
        this.props.history.goBack();
    }

    render() {
        const props = this.props;
        //是否有返回按钮 back＝true
        let back = props.hasOwnProperty('back')?props.back:false;
        //是否有分享到按钮 share＝true
        let share = props.hasOwnProperty('share')?props.share:false;    
        //判断是否有用户自定义左侧按钮
        let haveUserLeftNav = props.hasOwnProperty('leftnav')?true:false;
        //判断是否有用户自定义右侧按钮
        let haveUserRightNav = props.hasOwnProperty('rightnav')?true:false;
        //自定义左侧按钮
        /*
            leftnav = [
                {
                    icon : "",
                    text : '',
                    action : fn
                },
            ]
        */
        let leftnav = [];
        if(haveUserLeftNav){
            leftnav = props.leftnav;
        }
        //自定义右侧按钮
         /*
            rightnav = [
                {
                    icon : "",
                    text : '',
                    action : fn
                },
            ]
        */
        let rightnav = [];
        if(haveUserRightNav){
            rightnav = props.rightnav;
        }

        return (
            <div className="newNavHeadContent" id="newNavHeadContent">
                <span className="leftlnk">
                {
                    back?(<Icon name="angle left" className="back" onClick={()=>{this.pageBack()}} />):''
                }
                {
                    _.map(leftnav, (nav, index)=>{
                        return (
                            <span className="nli" onClick={()=>{nav.action}}>
                                {nav.icon==''?'':(<Icon name={nav.icon} />)}
                                {nav.text==''?'':(<span> {nav.text} </span>)}
                            </span>
                        )
                    })
                }
                </span>
                <span className="title">
                    {this.props.title}
                </span>
                <span className="rightlnk">
                {
                    share?(<span className="share"></span>):''
                }
                {
                    _.map(rightnav, (nav, index)=>{
                        return (
                            <span className="nli" onClick={()=>{nav.action}}>
                                {nav.icon==''?'':(<Icon name={nav.icon} />)}
                                {nav.text==''?'':(<span> {nav.text} </span>)}
                            </span>
                        )
                    })
                }
                </span>
            </div>
        );

    }
}
Page = withRouter(Page);
export default Page;

