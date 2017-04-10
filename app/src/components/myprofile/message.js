import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import '../../../public/css/mymessage.css';
import { connect } from 'react-redux';
import moment from 'moment';
import { getnotifymessage } from '../../actions/sagacallback';
import InfinitePage from '../controls/infinitecontrol';

// http://www.cnblogs.com/qq120848369/p/5920420.html
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
        return  (
            <div className="items" key={item._id}>
                <div className="tt">{item.messagetitle}</div>
                <div className="cont">{item.messagecontent}</div>
                <div className="lnk">
                    <span>{moment(item.created_at).format("MM月DD日 HH时mm分")}</span>
                    <span onClick={()=>{this.props.history.push(`/mymessagedetail/${item._id}`);}}>查看详情</span>
                </div>
            </div>
        );
    }

    onClickItem = (item)=>{

    }
    render() {
        return (
            <div className="myMessage" style={{height:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="消息" onClickLeft={this.onClickReturn}/>
                <div className="messageList">
                    <InfinitePage
                        updateContent={this.updateContent} 
                        queryfun={getnotifymessage}
                    />
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
