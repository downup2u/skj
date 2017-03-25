import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
//import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/mymessage.css';
import {ui_setnotifymessageinited,getnotifymessage_request} from '../../actions';
import { InfiniteLoader, List, Icon } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import moment from 'moment';
import {getnotifymessage} from '../../actions/sagacallback';

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
                limit: 5,
            }
        }));
    }

    isRowLoaded = ({ index })=> {
        return (this.props.list.length > index);
    }

    loadMoreRows= ({ startIndex, stopIndex })=> {
        console.log(`loadMoreRows====>${startIndex},${stopIndex}`)
            // let queryobj = {};
            // return this.props.dispatch(getnotifymessage({
            //     query:queryobj,
            //     options:{
            //         sort:{created_at:-1},
            //         offset: startIndex,
            //         limit: (stopIndex-startIndex)+1,
            //     }
            // }));

        return new Promise((resolve) => {
            let queryobj = {};
            this.props.dispatch(getnotifymessage({
                query:queryobj,
                options:{
                    sort:{created_at:-1},
                    offset: startIndex,
                    limit: (stopIndex-startIndex)+1,
                }
            })).then((result)=>{
                resolve();
            });
        });
    }

    rowRenderer= ({ key, index, style})=> {
        //console.log(`rowRenderer====>${key},${index}`);

        if(this.isRowLoaded({index})){
            let msgid = this.props.list[index];
            let iteminfo = this.props.notifymessages[msgid];

            if (typeof iteminfo.created_at === 'string') {
                iteminfo.created_at = new Date(Date.parse(iteminfo.created_at));
            }
            return ( <div className="items" key={key}>
                <div className="tt">{iteminfo.messagetitle}</div>
            <div className="cont">{iteminfo.messagecontent}</div>
            <div className="lnk">
                <span>{moment(iteminfo.created_at).format("MM月DD日 HH时mm分")}</span>
            <span onClick={()=>{this.props.history.push(`/mymessagedetail/${iteminfo._id}`);}}>查看详情</span>
            </div>
            </div> );
        }
        return (<div key={key}>loading...</div>);


    }


    render() {
        console.log(`window.innerHeight===>${window.innerHeight}`);
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
                                height={window.innerHeight-46}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={this.props.remoteRowCount}
                                rowHeight={97}
                                rowRenderer={this.rowRenderer}
                                width={window.innerWidth}
                            />
                            )}
                        </InfiniteLoader>
                </div>
            </div>
        )
    }
}

const mapStateToProps =  ({notifymessage}) =>{
    return notifymessage;
};

export default connect(
    mapStateToProps
)(Page);
