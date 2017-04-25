import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { connect } from 'react-redux';
import { Input, Button, Select, List } from 'semantic-ui-react';
import '../../../public/css/mycollection.css';
import Swipeout from 'rc-swipeout';
import { mycollectiongetall,mycollectiondelone } from '../../actions/sagacallback.js';
import { uiinfinitepage_deleteitem } from '../../actions';
import InfinitePage from '../controls/infinitecontrol';
//import Paging from '../tools/paging';

let Page =(props)=> {

    //删除收藏
    let delCollection = (id)=>{
        if(confirm("确定删除收藏吗？")){
            props.dispatch(mycollectiondelone({_id:id})).then((result)=>{
                props.dispatch(uiinfinitepage_deleteitem({_id:result._id}));
            });
        }
    }

    //收藏列表数据
    let updateContent = (item)=> {
        let proinfo = props.products[item.product];
        if(proinfo){
            return  (
                <div key={item._id}>
                    <Swipeout 
                        autoClose={true}
                        right={[{
                            text: '删除',
                            onPress: ()=>{delCollection(item._id)},
                            style: {
                                backgroundColor: 'red',
                                color: 'white',
                                fontSize: '16px'
                            }
                        }]}
                    >
                        <div className="myCollectionLi">
                            <div className="pic"><img src={proinfo.picurl}/></div>
                            <div className="info">
                                <div className="tit">
                                    <span>{proinfo.name}</span>
                                </div>
                                <div className="address">
                                    <span>¥ {proinfo.pricenow}</span>
                                </div>
                            </div>
                        </div>
                    </Swipeout>
                </div>
            );
        }
    };

    let onClickReturn = ()=> {props.history.goBack();}

    return (
        <div>
            <NavBar lefttitle="返回" title="我的收藏" onClickLeft={onClickReturn} />
            <div className="myCollection"
                 style={{
                    height:(window.innerHeight-46)+"px",
                    overflow:"hidden"
                }}>
                <List.Item>
                    <InfinitePage
                        pagenumber = {30}
                        updateContent= {updateContent.bind(this)} 
                        queryfun= { mycollectiongetall }
                        listheight= {window.innerHeight-92}
                        query = {{}}
                        sort = {{created_at: -1}}
                    />
                </List.Item>
                
            </div>
        </div>
    )
}

let mapStateToProps = ({shop}) => {
    return {...shop};
}

Page = connect(mapStateToProps)(Page);
export default Page;