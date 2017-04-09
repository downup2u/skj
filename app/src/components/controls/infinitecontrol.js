import React, { Component, PropTypes } from 'react';
import { uiinfinitepage_init,uiinfinitepage_getdata } from '../../actions';
import { connect } from 'react-redux';

import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';

const numperpage = 50;//每页记录个数

export class Page extends Component {

    componentWillMount =()=> {
        this.props.dispatch(uiinfinitepage_init(false));
        this.props.dispatch(this.props.queryfun({
            query: {},
            options: {
                sort: {created_at: -1},
                page: 1,
                limit: numperpage,
            }
        })).then(({result})=> {
            this.props.dispatch(uiinfinitepage_getdata({result,append:false}));
        });
    };

    //调用 IScroll refresh 后回调函数
    handleRefresh(downOrUp, callback) {
        //真实的世界中是从后端取页面和判断是否是最后一页
        let {currentPage,totalPage, lastPage} = this.props;
        if (downOrUp === 'up') { // 加载更多
            if (!lastPage) {
                currentPage++;
            }
        } 
        else 
        { // 刷新
            currentPage = 1;
        }

        if(currentPage !== this.props.currentPage){
            this.props.dispatch(this.props.queryfun({
                query: {},
                options: {
                    sort: {created_at: -1},
                    page: currentPage,
                    limit: numperpage,
                }
            })).then(({result})=> {
                this.props.dispatch(uiinfinitepage_getdata({result,append:downOrUp === 'up'}));
            });
        }

    }
    
  

    render() {
        const {list} = this.props;
        return (<ReactIScroll iScroll={iScroll} handleRefresh={this.handleRefresh.bind(this)} className="example">
          <ul className="example-paging">
            {
                list.map((item) =>{
                    return this.props.updateContent(item);
                }
            )}
          </ul>
        </ReactIScroll>
        );
    }
}

const mapStateToProps = ({infinitepage}) => {
    return infinitepage;
};

export default connect(
    mapStateToProps
)(Page);
