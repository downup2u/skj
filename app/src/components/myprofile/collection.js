import React, { Component, PropTypes } from 'react';
import NavBar from '../nav.js';
import { Input, Button, Select, List } from 'semantic-ui-react';
import '../../../public/css/mycollection.css';
import Swipeout from 'rc-swipeout';

let countryOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan'}];


export default class Page extends Component {
    state = {activeItem: '未使用'}

    handleItemClick = (e, { name }) => this.setState({activeItem: name});
    onClickReturn = ()=> {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <NavBar lefttitle="返回" title="我的收藏" onClickLeft={this.onClickReturn} />
                <div className="myCollection"
                     style={{
                        height:(window.innerHeight-46)+"px",
                        overflow:"scroll"
                    }}>
                    <List.Item>
                        <Swipeout autoClose={true}
                                  right={[
                                    {
                                        text: '删除',
                                        //onPress:onDelete,
                                        style: { backgroundColor: 'red', color: 'white' }
                                    }
                                  ]}
                                  onOpen={() => console.log('open')}
                                  onClose={() => console.log('close')}
                            >
                            <div className="myCollectionLi">
                                <div className="pic"><img src="img/5.png"/></div>
                                <div className="info">
                                    <div className="tit">
                                        <span>净化器水龙头 自来水过滤 厨房净水器</span>
                                    </div>
                                    <div className="address">
                                        <span>¥ 22.8</span>
                                    </div>
                                </div>
                            </div>
                        </Swipeout>
                        <Swipeout autoClose={true}
                                  right={[
                                        {
                                            text: '删除',
                                            style: { backgroundColor: 'red', color: 'white' }
                                        }
                                  ]}
                                  onOpen={() => console.log('open')}
                                  onClose={() => console.log('close')}
                            >
                            <div className="myCollectionLi">
                                <div className="pic"><img src="img/5.png"/></div>
                                <div className="info">
                                    <div className="tit">
                                        <span>净化器水龙头 自来水过滤 厨房净水器</span>
                                    </div>
                                    <div className="address">
                                        <span>¥ 22.8</span>
                                    </div>
                                </div>
                            </div>
                        </Swipeout>
                    </List.Item>
                </div>
            </div>
        )

    }
}