import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Menu, Icon } from 'semantic-ui-react';
import '../../../public/css/mytopiclist.css';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { connect } from 'react-redux';
import moment from 'moment';
import {ui_setmytopiclistinited,getmytopic_request} from '../../actions';

let TopicInfo = (props)=>{
    const {iteminfo} = props;
    let piccos = [];
    let pics = iteminfo.picurl;
    pics.forEach((picurl,index)=>{
        piccos.push(<div key={index}><img src={picurl} /></div>);
    });
    return (
        <div className="li" onClick={props.onClick}>
        <div className="title"></div>
        <div className="content">
        <div>{iteminfo.title}</div>
        <div className="imglist">
        {piccos}
        </div>
        </div>
        <div className="lnk">
        <div>{moment(iteminfo.created_at).format("MM月DD日 HH时mm分")}</div>
        <div className="myCommentLnk">
        <div className="lnkAddCommunity" >
        <Icon name="commenting outline"/>
        {iteminfo.comments.length}
        </div>
        <div className="lnkZhan">
        <Icon name="thumbs outline up"/>
        {iteminfo.loves.length}
        </div>
        </div>
        </div>
        </div>
    );
}

class Page extends Component {
    componentWillMount () {
        this.props.dispatch(ui_setmytopiclistinited(true));
        let queryobj = {};
        this.props.dispatch(getmytopic_request({
            query:queryobj,
            options:{
                sort:{created_at:-1},
                offset: 0,
                limit: 10,
            }
        }));
    }
    onClickReturn =()=>{
        this.props.history.goBack();
    };

    isRowLoaded = ({ index })=> {
        return (this.props.mytopiclist.length > index);
    }

    loadMoreRows= ({ startIndex, stopIndex })=> {
        let queryobj = {};
        this.props.dispatch(getmytopic_request({
            query:queryobj,
            options:{
                sort:{created_at:-1},
                offset: startIndex,
                limit: (stopIndex-startIndex)+1,
            }
        }));

    }

    onClick =(iteminfo)=>{

    }
    rowRenderer= ({ key, index, style})=> {
        if(this.isRowLoaded({index})){
            let topicid = this.props.mytopiclist[index];
            let iteminfo = this.props.topics[topicid];

            if (typeof iteminfo.created_at === 'string') {
                iteminfo.created_at = new Date(Date.parse(iteminfo.created_at));
            }
            return ( <TopicInfo key={`mytopic${key}`} onClick={this.onClick.bind(iteminfo)} iteminfo={iteminfo}/>);

        }
        return (<div key={key}>loading...</div>);

    }


    render() {
        //const { activeItem } = this.state;
        return (
            <div className="myTopicListPage">
                <NavBar lefttitle="返回" title="我的帖子" onClickLeft={this.onClickReturn} />
                <div className="cont">

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
                            rowCount={this.props.mytopicremoteRowCount}
                            rowHeight={129}
                            rowRenderer={this.rowRenderer}
                            width={window.innerWidth}
                        />
                        )}
                    </InfiniteLoader>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({forum}) => {
    return forum;
}
Page = connect(mapStateToProps)(Page);
export default Page;