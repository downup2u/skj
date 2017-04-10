import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import '../../../public/css/mymessage.css';
import { connect } from 'react-redux';
import moment from 'moment';
import {getnotifymessage} from '../../actions/sagacallback';
import { ui_setnotifymessage } from '../../actions';
import InfinitePage from '../controls/infinitecontrol';

// http://www.cnblogs.com/qq120848369/p/5920420.html
export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };


    updateContent = (item)=> {
        return  (
            <div className="items" key={item._id}>
                <div className="tt">{item.messagetitle}</div>
                <div className="cont">{item.messagecontent}</div>
                <div className="lnk">
                    <span>{moment(item.created_at).format("MM月DD日 HH时mm分")}</span>
                    <span onClick={()=>{this.onClickItem(item);}}>查看详情</span>
                </div>
            </div> 
        );
    }

    onClickItem = (item)=>{
        this.props.dispatch( ui_setnotifymessage(item) );
        this.props.history.push(`/mymessagedetail/${item._id}`);
    }
    render() {
        return (
            <div className="myMessage" style={{height:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="消息" onClickLeft={this.onClickReturn} />
                <div className="messageList">
                    <InfinitePage
                        pagenumber = {30}
                        updateContent= {this.updateContent} 
                        queryfun= {getnotifymessage}
                    />
                </div>
            </div>
        )
    }
}

export default connect()(Page);


/*
<div>
    <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.props.remoteRowCount}
        >
        {({ onRowsRendered, registerChild }) => (
            <List
                height={97*this.props.list.length}
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
*/
