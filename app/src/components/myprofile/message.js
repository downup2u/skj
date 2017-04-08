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

const cachesizetotal = 100;

export class Page extends Component {

    onClickReturn = ()=> {
        this.props.history.goBack();
    };

    onScrollStart =()=> {
        console.log("iScroll starts scrolling")
    };

    componentWillMount =()=> {
        this.myScroll = null;
    };

    componentDidMount = ()=>{
       document.getElementById('scroller').addEventListener('touchmove', function(e){
            let event = e || window.event;
            event.preventDefault();
        }, false);
        this.myScroll = new IScroll('#wrapper', {
            mouseWheel: true,
            infiniteElements: '#scroller .row',
            dataset: this.getData,
            dataFiller: this.updateContent,
            cacheSize: cachesizetotal
        });
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
            if(result.total > start){
                let datas = [];
                let arraydocs = result.docs;
                console.log(`${start}开始${count}个,${arraydocs.length}`);
                // arraydocs.forEach((d)=>{
                //     datas.push(d.messagetitle);
                // })
                for(let i = 0 ;i < arraydocs.length; i ++ ){
                    let index = (i+start);
                    datas.push(index+arraydocs[i].messagetitle);
                }
                console.log(`datas:` + JSON.stringify(datas));
                if(this.myScroll && datas.length > 0){
                    this.myScroll.updateCache(start, datas);
                }
            }
            
        });
    }

    updateContent = (el, data)=> {
        console.log('--->updateContent:' +data);
        el.innerHTML = data;
    }

    /*getrender =(data)=>{

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
    }*/

    render() {
        let i = 0, len = 20, listOfLi = [];
        for(i; i < len; i++) {
          listOfLi.push(<li key={i} className="row"></li>);
        }
        let options = this.props.options;
        return (
            <div className="myMessage" style={{minHeight:(window.innerHeight)+"px"}}>
                <NavBar lefttitle="返回" title="消息" onClickLeft={this.onClickReturn}/>
                <div className="messageList" style={{height:(window.innerHeight-46)+"px"}}>
                    <div id="wrapper">
                        <div id="scroller">
                            <ul>
		                       {listOfLi}
                            </ul>
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
