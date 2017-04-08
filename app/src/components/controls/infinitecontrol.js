import React, { Component, PropTypes } from 'react';
import { uiinfinitepage_init,uiinfinitepage_getrowcount } from '../../actions';
import { connect } from 'react-redux';
import IScroll from 'iscroll/build/iscroll-infinite.js';


export class Page extends Component {

    onScrollStart =()=> {
        console.log("iScroll starts scrolling")
    };

    componentWillMount =()=> {
        this.myScroll = null;
        this.props.dispatch(uiinfinitepage_init(false));
        this.props.dispatch(this.props.queryfun({
            query: {},
            options: {
                sort: {created_at: -1},
                offset: 0,
                limit: 1,
            }
        })).then(({result})=> {
            this.props.dispatch(uiinfinitepage_getrowcount(result.total));
        });
    };
    componentWillReceiveProps(nextProps) {
        //console.log(`componentWillReceiveProps===>${nextProps.remoteRowCount}`);
        if(nextProps.remoteRowCount > 0 && nextProps.rendered && !this.myScroll){
          
           console.log(`start===>${nextProps.remoteRowCount}`);

           document.getElementById('scroller').addEventListener('touchmove', function(e){
                let event = e || window.event;
                event.preventDefault();
            }, false);

            window.setTimeout(()=>{
                this.myScroll = new IScroll('#wrapper', {
                    mouseWheel: true,
                    infiniteElements: '#scroller .row',
                    dataset: this.getData.bind(this),
                    dataFiller: this.props.updateContent,
                    cacheSize: nextProps.remoteRowCount
                });
            },0);
        }
    }
    componentDidMount = ()=>{
        this.props.dispatch(uiinfinitepage_init(true));
    }
    shouldComponentUpdate(nextprop){
      return false;
    }
    getData(start, end){
        console.log(`${start},${end},===>${this.props.remoteRowCount}`);
        if(start < this.props.remoteRowCount && this.props.remoteRowCount>0 ){
            this.props.dispatch(this.props.queryfun({
                query: {},
                options: {
                    sort: {created_at: -1},
                    offset: start,
                    limit: (end-start),
                }
            })).then(({result})=> {
                console.log(`updateCache:${start},${result.docs.length}`);
                let docs =[];
                for(let i = 0;i < result.docs.length ; i++){
                    let data = result.docs[i];
                    data.index  =i ;
                    docs.push(data);
                }
                this.myScroll.updateCache(start, docs);
                // window.setTimeout(()=>{
                //     this.myScroll.refresh();
                // },100);
            });
        }

    }

    // updateContent = (el, data)=> {
    //     console.log('--->updateContent:' +data);
    //     el.innerHTML = data;
    // }

    render() {
        let i = 0, len = 20, listOfLi = [];
        for(i; i < len; i++) {
          listOfLi.push(<li key={i} className="row"></li>);
        }
        let options = this.props.options;
        return (        
                <div id="wrapper">
                    <div id="scroller">
                        <ul>
                            {listOfLi}
                        </ul>
                    </div>
                </div>
                
        );
    }
}

const mapStateToProps = ({infinitepage}) => {
    return infinitepage;
};

export default connect(
    mapStateToProps
)(Page);
