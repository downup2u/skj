import React, { Component } from 'react';
import NavBar from '../newnav.js';
import { connect } from 'react-redux';
import { Input, Button, Select, List } from 'semantic-ui-react';
import '../../../public/css/mycollection.css';
import Swipeout from 'rc-swipeout';
import { mycollectiongetall,mycollectiondelone } from '../../actions/sagacallback.js';
import { uiinfinitepage_deleteitem } from '../../actions';
import InfinitePage from '../controls/listview';
//import Paging from '../tools/paging';
//我的收藏暂时不修改了（需要设为Component,并且刷新什么的）
export class Page extends Component {


    //删除收藏
   delCollection = (id)=>{
        if(confirm("确定删除收藏吗？")){
            this.props.dispatch(mycollectiondelone({_id:id})).then((result)=>{
              this.refs.listviewpage.getWrappedInstance().onRefresh();
                //props.dispatch(uiinfinitepage_deleteitem({_id:result._id}));
            });
        }
    }

    //收藏列表数据
   updateContent = (item)=> {
        let proinfo = this.props.products[item.product];
        if(!!proinfo){
            return  (
                    <Swipeout key={item._id}
                        autoClose={true}
                        right={[{
                            text: '删除',
                            onPress: ()=>{this.delCollection(item._id)},
                            style: {
                                backgroundColor: 'red',
                                color: 'white',
                            }
                        }]}
                    >
                    <div
                        onClick={()=>{this.props.history.push("/shoppingproinfo/"+item.product)}}
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
                        </div>
                    </Swipeout>

            );
        }
        return null;
    };
    render() {
      return (
          <div>
              <NavBar back={true} title="我的收藏" />
              <div className="myCollection"
                   style={{
                      height:(window.innerHeight-46)+"px",
                      overflow:"hidden"
                  }}>
                  <List.Item>
                      <InfinitePage
                          ref="listviewpage"
                          pagenumber = {30}
                          updateContent= {this.updateContent}
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
}

let mapStateToProps = ({shop}) => {
    return {...shop};
}

Page = connect(mapStateToProps)(Page);
export default Page;
