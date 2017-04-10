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

        //下啦刷新尖头动画
        let pullDownImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACpElEQVR4Xu1b3W0bMQwWT/febNBsEAt3eo47QdEJmkwQe4KmE7QbxNmgGzR91h2u2SAjJO+2WRA4AwfHTnCiqNowBfiRpPgd9X36ocEIjhDCLQB844ZAxE/e+weun132IOF04/PkAZAEN5Vv0QpINUlJPwqAJLrH4FsrQPIrhRCmRVFccmMURXHvnHvi+lEZ3IGA6BI4+X2AAhDC1BhDP9Yoy3JxlBzAyjqTsSgHZMqBFUYBYMH3jnHbtleI+JUbw1o7d8795frRfYDuA14jIMoBug849SsxIsH1en3FJa+yLGdHSYLcxHPYi3JA13XniPiRmwgAPDrnnrl+VAZVBlUGXyEgygG6Dzj1fYBWgFaAvg7r87j2B2iDhHaIaIsM9xSnPULaJKVdYtomd3B9gl3XTZbL5R0ATLgkx7R/RsSF934e4yf6PqBpml/GmM8xQSVsrLUu5uY4GoC2bWeI+EMimQifL3Vdn0XYmWgAKFgI4QEA2E1QMRPfsvlS1zVV5OjBAqDrurPVakVNzBejIycyQMTv3vvbWHcsACgokWEPwofYSTDs7uu6Zr08sQHol8IUAH4zEokxfbTWTrkPJkkAoNn3zRB3MZlE2LxYa8+5yVPcZACQs6ZpfhpjbiISGmNCydOXT9IxkhSAHoSFMYbdFvMGItGMv8tncgAklQEA5lVVUZUlG8kB6JWB5JFKlP0yPMiUzfhZKmATJKU8IuIf7z274zQrAAnlMYnc7VszIktgGIwpj8T4E6k+4eQyuA/lWHmMPeGNYUjxCthMpmmaUfIIANdVVZGN6MgGwBh55B5wxiCWDYCBPNJ/f946OInI3X8jwe3A78ijKONnl8F9qO9RhmQHnINdAsOJbStDDsY/mAoYKANdY9FdwiwH4+8C4B/ujahQXsi/fQAAAABJRU5ErkJggg==";
        let pullDownEndImg = "data:image/png;base64,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";
        let pullDownLoadImg = "data:image/png;base64,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"
        this.pullDownTransitionImg = {
            0: pullDownImg,
            1: pullDownImg,
            2: pullDownImg,
            3: pullDownLoadImg,
            4: '',
        }

        //下啦刷新图片资源
        this.pullDownImgStyle = {
            0: '',
            1: '',
            2: 'transition',
            3: 'transitionload',
            4: '',
        }

        this.isTouching = false;

        //this.onItemClicked = this.onItemClicked.bind(this);

        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }
    componentWillUnmount =()=> {
       document.getElementById('ScrollContainer').removeEventListener('touchmove', (ev) => {
            
        });
    }
    componentDidMount() {
        document.getElementById('ScrollContainer').addEventListener('touchmove', (ev) => {
            ev.preventDefault();
        });
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
                <div id='ListOutsite' style={{height: window.innerHeight+"px"}}
                     onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                    <ul id='ListInside'>
                        <p ref="PullDown" 
                            id='PullDown' 
                            className={this.pullDownImgStyle[this.state.pullDownStatus]}
                        >
                            <img src={this.pullDownTransitionImg[this.state.pullDownStatus]} />
                            <span>{this.pullDownTips[this.state.pullDownStatus]}</span>
                        </p>
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
