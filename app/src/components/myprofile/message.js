import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import '../../../public/css/mymessage.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { getnotifymessage } from '../../actions/sagacallback';
import InfinitePage from '../controls/infinitecontrol';


export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };


    updateContent = (item)=> {
//         created_at
// :
// "2017-04-08T01:32:04.354Z"
// messagecontent
// :
// "消息内容，仅供测试"
// messagetitle
// :
// "这是一条系统消息Sat Apr 08 2017"
// messagetype
// :
// "all"

                
       return  (<li key={item._id}>{item._id}</li>);
        // console.log('--->updateContent:' +data);
        // el.innerHTML = data.index + data.messagecontent;
    }


    render() {
        return (
            <div className="myMessage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="消息" onClickLeft={this.onClickReturn}/>
                <div className="messageList" style={{height:(window.innerHeight-46)+"px"}}>
                    <InfinitePage updateContent={this.updateContent} 
                        queryfun={getnotifymessage}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({notifymessage}) => {
    return notifymessage;
};

export default connect(
)(Page);


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
