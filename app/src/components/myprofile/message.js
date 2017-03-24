import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
//import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/mymessage.css';
import {ui_setnotifymessageinited,getnotifymessage_request} from '../../actions';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import moment from 'moment';

export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };
    componentWillMount () {
        this.props.dispatch(ui_setnotifymessageinited(true));
        let queryobj = {};
        this.props.dispatch(getnotifymessage_request({
            query:queryobj,
            options:{
                sort:{created_at:-1},
                offset: 0,
                limit: 10,
            }
        }));
    }

    isRowLoaded = ({ index })=> {
        return (this.props.list.length > index);
    }

    loadMoreRows= ({ startIndex, stopIndex })=> {
        let queryobj = {};
        this.props.dispatch(getnotifymessage_request({
            query:queryobj,
            options:{
                sort:{created_at:-1},
                offset: startIndex,
                limit: (stopIndex-startIndex),
            }
        }));

    }

    rowRenderer= ({ key, index, style})=> {
        let iteminfo = this.props.list[index];
        if (typeof iteminfo.created_at === 'string') {
            iteminfo.created_at = new Date(Date.parse(iteminfo.created_at));
        }
        return ( <div className="items" key={key}>
            <div className="tt">{iteminfo.messagetitle}</div>
            <div className="cont">{iteminfo.messagecontent}</div>
            <div className="lnk">
            <span>{moment(iteminfo.created_at).format("MM月DD日 HH时ss分")}</span>
            <span onClick={()=>{this.props.history.push(`/mymessagedetail/${iteminfo._id}`);}}>查看详情</span>
            </div>
            </div> );

    }


    render() {
        return (
            <div className="myMessage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="消息" onClickLeft={this.onClickReturn}/>

                <div className="messageList">
                        <InfiniteLoader
                            isRowLoaded={this.isRowLoaded}
                            loadMoreRows={this.loadMoreRows}
                            rowCount={this.props.remoteRowCount}
                        >
                            {({ onRowsRendered, registerChild }) => (
                            <List
                                height={580}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={this.props.remoteRowCount}
                                rowHeight={129}
                                rowRenderer={this.rowRenderer}
                                width={400}
                                    />
                            )}
                        </InfiniteLoader>
                </div>

            </div>
        )
    }
}

const mapStateToProps =  ({notifymessage}, props) =>{
    let list = [];
    const {mynotifymessages,...rest} = notifymessage;
    for(let msgid of mynotifymessages.result.list){
        let msg = mynotifymessages.entities.notifymessages[msgid];
        list.push(msg);
    }
    console.log("mapStateToProp===>" + JSON.stringify({...rest,list}));
    return {...rest,list};
};

export default connect(
    mapStateToProps,
)(Page);
