import React, { Component, PropTypes } from 'react';
import { 
    uiinfinitepage_init,
    uiinfinitepage_getdata,
    uiinfinitepage_setstate
 } from '../../actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import iScroll from 'iscroll/build/iscroll-probe';
import './infinitecontrol.css';

const pullDownTips = {
            // 下拉状态
            0: '下拉发起刷新',
            1: '继续下拉刷新',
            2: '松手即可刷新',
            3: '正在刷新',
            4: '刷新成功',
        };

const pullUpTips = {
            // 上拉状态
            0: '上拉加载更多',
            1: '上拉加载更多',
            2: '正在加载',
            3: '加载成功',
            4: '没有更多数据',
        };

        //下啦刷新尖头动画
const pullDownImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACpElEQVR4Xu1b3W0bMQwWT/febNBsEAt3eo47QdEJmkwQe4KmE7QbxNmgGzR91h2u2SAjJO+2WRA4AwfHTnCiqNowBfiRpPgd9X36ocEIjhDCLQB844ZAxE/e+weun132IOF04/PkAZAEN5Vv0QpINUlJPwqAJLrH4FsrQPIrhRCmRVFccmMURXHvnHvi+lEZ3IGA6BI4+X2AAhDC1BhDP9Yoy3JxlBzAyjqTsSgHZMqBFUYBYMH3jnHbtleI+JUbw1o7d8795frRfYDuA14jIMoBug849SsxIsH1en3FJa+yLGdHSYLcxHPYi3JA13XniPiRmwgAPDrnnrl+VAZVBlUGXyEgygG6Dzj1fYBWgFaAvg7r87j2B2iDhHaIaIsM9xSnPULaJKVdYtomd3B9gl3XTZbL5R0ATLgkx7R/RsSF934e4yf6PqBpml/GmM8xQSVsrLUu5uY4GoC2bWeI+EMimQifL3Vdn0XYmWgAKFgI4QEA2E1QMRPfsvlS1zVV5OjBAqDrurPVakVNzBejIycyQMTv3vvbWHcsACgokWEPwofYSTDs7uu6Zr08sQHol8IUAH4zEokxfbTWTrkPJkkAoNn3zRB3MZlE2LxYa8+5yVPcZACQs6ZpfhpjbiISGmNCydOXT9IxkhSAHoSFMYbdFvMGItGMv8tncgAklQEA5lVVUZUlG8kB6JWB5JFKlP0yPMiUzfhZKmATJKU8IuIf7z274zQrAAnlMYnc7VszIktgGIwpj8T4E6k+4eQyuA/lWHmMPeGNYUjxCthMpmmaUfIIANdVVZGN6MgGwBh55B5wxiCWDYCBPNJ/f946OInI3X8jwe3A78ijKONnl8F9qO9RhmQHnINdAsOJbStDDsY/mAoYKANdY9FdwiwH4+8C4B/ujahQXsi/fQAAAABJRU5ErkJggg==";

        //下啦刷新图片资源
const pullDownImgStyle = {
            0: '',
            1: '',
            2: 'transition',
            3: 'transitionload',
            4: '',
        }

export class Page extends Component {
    componentWillUnmount =()=> {
        this.props.dispatch(uiinfinitepage_init());
        document.getElementById('ScrollContainer').removeEventListener('touchmove', (ev) => {
            
        });
    }
    componentWillMount() {
        this.props.dispatch(uiinfinitepage_init());
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

    fetchItems = (isRefresh)=> {
        let querypage = this.props.page;
        if (isRefresh) {
            querypage = 1;
        }
        if(!this.props.pageEnd){
            this.props.dispatch(this.props.queryfun({
                query: this.props.query,
                options: {
                    sort: this.props.sort,
                    page: this.page,
                    limit: this.props.pagenumber,
                }
            })).then(({result})=> {
                if(result){
                    if(result.page>=result.pages){//最后一页
                        this.props.dispatch(uiinfinitepage_getdata({result,append:!isRefresh}));
                        this.props.dispatch(uiinfinitepage_setstate({ pullUpStatus: 0,pullDownStatus: 4}));
                        if(result.page===1){
                            this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
                        }
                    }else{
                        if (isRefresh) {// 刷新操作
                            if (this.props.pullDownStatus == 3) {
                                this.props.dispatch(uiinfinitepage_getdata({result,append:!isRefresh}));
                                this.props.dispatch(uiinfinitepage_setstate({ pullDownStatus: 4}));
                                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
                            }
                        } else {// 加载操作
                            if (this.props.pullUpStatus == 2) {
                                this.props.dispatch(uiinfinitepage_getdata({result,append:!isRefresh}));
                                this.props.dispatch(uiinfinitepage_setstate({ pullUpStatus: 0}));
                            }
                        }
                        this.props.dispatch(uiinfinitepage_setstate({ page: querypage+1}));
                    }
                }
            });
        }
    }

    onTouchStart=(ev)=> {
        this.props.dispatch(uiinfinitepage_setstate({ isTouching: true}));
    }

    onTouchEnd=(ev)=> {
        this.props.dispatch(uiinfinitepage_setstate({ isTouching: false}));
    }

    onPullDown=()=> {
        // 手势
        if (this.props.isTouching) {
            if (this.iScrollInstance.y > 5) {
                if(this.props.pullDownStatus != 2){
                    this.props.dispatch(uiinfinitepage_setstate({ pullDownStatus: 2,pageEnd : false}));
                }
            } else {
                if(this.props.pullDownStatus != 1){
                     this.props.dispatch(uiinfinitepage_setstate({ pullDownStatus: 1,pageEnd : false}));
                }
            }
        }
    }

    onPullUp=()=> {
        // 手势
        if (this.props.isTouching) {
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
                if(this.props.pullUpStatus != 1){
                    this.props.dispatch(uiinfinitepage_setstate({ pullUpStatus: 1}));
                }
            } else {
                if(this.props.pullUpStatus != 0){
                    this.props.dispatch(uiinfinitepage_setstate({ pullUpStatus: 0}));
                }
            }
            if(this.props.pageEnd){
                this.props.dispatch(uiinfinitepage_setstate({pullUpStatus: 4}));
            }
        }
    }

    onScroll =()=> {
        let pullDown = $(this.refs.PullDown);
        let pullUp = $(this.refs.PullUp);
        let Nodata = $(this.refs.Nodata);

        //没有数据的情况下
        if( this.iScrollInstance.maxScrollY==0 ){
            Nodata.show();
        }else{
            Nodata.hide();
        }

        //超过一页数据的时候才会有上划加载更多的功能
        if(this.iScrollInstance.maxScrollY > this.props.listheight){
            pullUp.show();
        }else{
            pullUp.hide();
        }

        // 上拉区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            this.onPullDown();
        } else {
            if(this.props.pullDownStatus != 0 ){
                this.props.dispatch(uiinfinitepage_setstate({pullDownStatus: 0}));
            }
        }

        // 下拉区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.onPullUp();
        }
    }

    onScrollEnd=()=> {
        let pullDown = $(this.refs.PullDown);
        let iScrollInstance_y = this.iScrollInstance.y;

        if( this.iScrollInstance.maxScrollY==0 ){
            pullDown.css("margin-top","-"+pullDown.height()+"px");
        }else{
            pullDown.css("margin-top","0");
        }

        // 滑动结束后，停在刷新区域
        if (iScrollInstance_y > -1 * pullDown.height() && this.iScrollInstance.maxScrollY!=0) {
            if (this.props.pullDownStatus <= 1) {//没有发起刷新,那么弹回去
                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
            } else if (this.props.pullDownStatus == 2) { //发起了刷新,那么更新状态
                this.props.dispatch(uiinfinitepage_setstate({pullDownStatus: 3}));
                this.fetchItems(true);
            }
        }

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            if (this.props.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.props.dispatch(uiinfinitepage_setstate({pullUpStatus: 2}));
                this.fetchItems(false);
            }
        }
    }

    shouldComponentUpdate(nextProps) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        let itemsChanged = nextProps.items.length !== this.props.items.length;
        this.props.dispatch(uiinfinitepage_setstate({itemsChanged}));
        return true;
    }

    componentDidUpdate() {
        // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
        if (this.props.itemsChanged) {
            this.iScrollInstance.refresh();
        }
        return true;
    }

    render() {
        let lis = [];
        this.props.items.forEach((item, index) => {
            lis.push(this.props.updateContent(item));
        });
        let PullUpHeight =  $(this.refs.PullUp).height();

        // 外层容器要固定高度，才能使用滚动条
        return (
            <div id='ScrollContainer'>
                <div id='ListOutsite'
                    style={{height: (this.props.listheight+PullUpHeight)+"px"}}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onTouchEnd}
                    >
                    <ul id='ListInside'>
                        <p ref="PullDown" 
                            id='PullDown' 
                            className={pullDownImgStyle[this.props.pullDownStatus]}
                        >
                            <img src={pullDownImg} />
                            <i></i>
                            <span>{pullDownTips[this.props.pullDownStatus]}</span>
                        </p>
                        {lis}
                        <p ref="PullUp" id='PullUp' className={this.props.pageEnd?"pageEnd":""}>
                            <i></i>
                            <span>{pullUpTips[this.props.pullUpStatus]}</span>
                        </p>
                        <div ref="Nodata" id="Nodata" className="nodata" 
                            style={{
                                display:"none",
                                textAlign:"center",
                                lineHeight:"80px",
                                color:"#999999",
                                fontSize:"16px"
                            }}>- 暂无数据 -</div>
                    </ul>
                </div>
            </div>
        );
    }
}

Page.propTypes = {
    queryfun: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
    pagenumber: PropTypes.number.isRequired,
    listheight: PropTypes.number.isRequired,
    query : PropTypes.object.isRequired,
    sort : PropTypes.object.isRequired,
};

const mapStateToProps = ({infinitepage}) => {
    return {...infinitepage};
};

export default connect(
    mapStateToProps
)(Page);
