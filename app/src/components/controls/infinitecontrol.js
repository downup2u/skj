import React, { Component, PropTypes } from 'react';
import { uiinfinitepage_init,uiinfinitepage_getdata } from '../../actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import iScroll from 'iscroll/build/iscroll-probe';
import './infinitecontrol.css';

const numperpage = 20;
export class Page extends Component {
      constructor(props, context) {
        super(props, context);
        this.state = {
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
        };

        this.page = 1;
        this.itemsChanged = false;

        this.pullDownTips = {
            // 下拉状态
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新',
            4: '刷新成功',
        };

        this.pullUpTips = {
            // 上拉状态
            0: '上拉发起加载',
            1: '松手即可加载',
            2: '正在加载',
            3: '加载成功',
        };

        this.isTouching = false;

        //this.onItemClicked = this.onItemClicked.bind(this);

        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }
    // componentWillMount =()=> {
    //     this.props.dispatch(this.props.queryfun({
    //          query: {},
    //          options: {
    //              sort: {created_at: -1},
    //              offset: 0,
    //             limit: 1,
    //          }
    //      })).then(({result})=> {
    //               this.setState({
    //                     items: result.docs
    //                });
    //      });
    // }
    componentDidMount() {
        const options = {
            // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
            preventDefault: false,
            // 禁止缩放
            zoom: false,
            // 支持鼠标事件，因为我开发是PC鼠标模拟的
            mouseWheel: true,
            // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
            probeType: 3,
            // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
            bounce: true,
            // 展示滚动条
            scrollbars: true,
        };
        this.iScrollInstance = new iScroll(`#ListOutsite`, options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);

        this.fetchItems(true);
    }

    fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        this.props.dispatch(this.props.queryfun({
            query: {},
            options: {
                sort: {created_at: -1},
                page: this.page,
                limit: numperpage,
            }
        })).then(({result})=> {
                if (isRefresh) {    // 刷新操作
                    if (this.state.pullDownStatus == 3) {
                        this.setState({
                            pullDownStatus: 4,
                            items: result.docs
                        });
                        this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
                    }
                } else {    // 加载操作
                    if (this.state.pullUpStatus == 2) {
                        this.setState({
                            pullUpStatus: 0,
                            items: this.state.items.concat(result.docs)
                        });
                    }
                }
                ++this.page;
                console.log(`fetchItems=effected isRefresh=${isRefresh}`);
            //this.props.dispatch(uiinfinitepage_getdata({result,append:false}));
        });

        // $.ajax({
        //     url: '/msg-list',
        //     data: {page: this.page},
        //     type: 'GET',
        //     dataType: 'json',
        //     success: (response) => {
        //         if (isRefresh) {    // 刷新操作
        //             if (this.state.pullDownStatus == 3) {
        //                 this.setState({
        //                     pullDownStatus: 4,
        //                     items: response.data.items
        //                 });
        //                 this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
        //             }
        //         } else {    // 加载操作
        //             if (this.state.pullUpStatus == 2) {
        //                 this.setState({
        //                     pullUpStatus: 0,
        //                     items: this.state.items.concat(response.data.items)
        //                 });
        //             }
        //         }
        //         ++this.page;
        //         console.log(`fetchItems=effected isRefresh=${isRefresh}`);
        //     }
        // });
    }

    onTouchStart(ev) {
        this.isTouching = true;
    }

    onTouchEnd(ev) {
        this.isTouching = false;
    }

    onPullDown() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y > 5) {
                this.state.pullDownStatus != 2 && this.setState({pullDownStatus: 2});
            } else {
                this.state.pullDownStatus != 1 && this.setState({pullDownStatus: 1});
            }
        }
    }

    onPullUp() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
                this.state.pullUpStatus != 1 && this.setState({pullUpStatus: 1});
            } else {
                this.state.pullUpStatus != 0 && this.setState({pullUpStatus: 0});
            }
        }
    }

    onScroll() {
        let pullDown = $(this.refs.PullDown);

        // 上拉区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            this.onPullDown();
        } else {
            this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        }

        // 下拉区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.onPullUp();
        }
    }

    onScrollEnd() {
        console.log("onScrollEnd" + this.state.pullDownStatus);

        let pullDown = $(this.refs.PullDown);

        // 滑动结束后，停在刷新区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({pullDownStatus: 3});
                this.fetchItems(true);
            }
        }

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({pullUpStatus: 2});
                this.fetchItems(false);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextState.items !== this.state.items;
        return true;
    }

    componentDidUpdate() {
        // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
        if (this.itemsChanged) {
            this.iScrollInstance.refresh();
        }
        return true;
    }

    render() {
        let lis = [];
        this.state.items.forEach((item, index) => {
            lis.push(this.props.updateContent(item));
        });

        // 外层容器要固定高度，才能使用滚动条
        return (
            <div id='ScrollContainer'>
                <div id='ListOutsite' style={{height: window.innerHeight}}
                     onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                    <ul id='ListInside'>
                        <p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>
                        {lis}
                        <p ref="PullUp" id='PullUp'>{this.pullUpTips[this.state.pullUpStatus]}</p>
                    </ul>
                </div>
            </div>
        );
    }

    /*componentWillMount =()=> {
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
        console.log(`handleRefresh:${downOrUp}`);
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
    }*/
}

Page.propTypes = {
  queryfun: PropTypes.func.isRequired,
  updateContent: PropTypes.func.isRequired
};

const mapStateToProps = ({infinitepage}) => {
    return infinitepage;
};

export default connect(
    mapStateToProps
)(Page);
