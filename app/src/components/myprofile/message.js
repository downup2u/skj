import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
//import { Input, Button, Select, List, Menu } from 'semantic-ui-react';
import '../../../public/css/mymessage.css';
import { ui_setnotifymessageinited, getnotifymessage_request } from '../../actions';
import { InfiniteLoader, List, Icon } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import moment from 'moment';
import { getnotifymessage } from '../../actions/sagacallback';
import IScroll from 'iscroll/build/iscroll-infinite.js';



export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onScrollStart =()=> {
        console.log("iScroll starts scrolling")
    };

    componentWillMount =()=> {
        // this.props.dispatch(ui_setnotifymessageinited(true));
        // let queryobj = {};
        // this.props.dispatch(getnotifymessage_request({
        //     query: queryobj,
        //     options: {
        //         sort: {created_at: -1},
        //         offset: 0,
        //         limit: 5,
        //     }
        // }));
        // let queryobj = {};
        // this.props.dispatch(getnotifymessage({
        //     query: queryobj,
        //     options: {
        //         sort: {created_at: -1},
        //         offset: 0,
        //         limit: 10,
        //     }
        // })).then((result)=> {
        //     console.log('--->result' + JSON.stringify(result));
        //     return result.docs;
        // });
    };

    componentDidMount = ()=>{
        this.myScroll = new IScroll('#wrapper', {
            mouseWheel: true,
            infiniteElements: '#scroller .row',
            //infiniteLimit: 2000,
            dataset: this.getData,
            dataFiller: this.updateContent,
            cacheSize: 1000
        });
        document.addEventListener('touchmove', (e)=>{ e.preventDefault(); }, false);
    }

    getData =(start, count)=>{
        let queryobj = {};
        this.props.dispatch(getnotifymessage({
            query: queryobj,
            options: {
                sort: {created_at: -1},
                offset: start,
                limit: count,
            }
        })).then(({result})=> {
            let datas = [];
            let arraydocs = result.docs;
            arraydocs.forEach((d)=>{
                datas.push(d.messagetitle);
            })
            this.myScroll.updateCache(start, datas);
        });
    }

    updateContent = (el, data)=> {
        el.innerHTML = data;
    }

    getrender =(data)=>{

    }


    isRowLoaded = ({ index })=> {
        return (this.props.list.length > index);
    };

    loadMoreRows = ({ startIndex, stopIndex })=> {
        return new Promise((resolve) => {
            let queryobj = {};
            this.props.dispatch(getnotifymessage({
                query: queryobj,
                options: {
                    sort: {created_at: -1},
                    offset: startIndex,
                    limit: (stopIndex - startIndex) + 1,
                }
            })).then((result)=> {
                resolve();
            });
        });
    }

    rowRenderer = ({ key, index, style})=> {
        //console.log(`rowRenderer====>${key},${index}`);
        console.log(`当前${index}|所有：${this.props.list.length}`)
        if (this.isRowLoaded({index})) {
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
                    <span onClick={()=>{}}>查看详情</span>
                </div>
            </div> );
        }
        return (<div key={key}>loading...</div>);
    }

    render() {
        var i = 0, len = 1000, listOfLi = [];
        for(i; i < len; i++) {
          listOfLi.push(<li key={i}>Row {i+1}</li>)
        }
        let options = this.props.options;
        return (
            <div className="myMessage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="消息" onClickLeft={this.onClickReturn}/>
                <div className="messageList" style={{height:(window.innerHeight-46)+"px"}}>
                    <div style={{height: '100vh'}}>
                        <div id="wrapper">
                            <div id="scroller">
                                <ul>
			                        <li className="row">Row 1</li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({notifymessage}) => {
    return notifymessage;
};

export default connect(
    mapStateToProps
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
