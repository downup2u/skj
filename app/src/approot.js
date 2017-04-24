/**
 * Created by wangxiaoqing on 2017/3/27.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/index.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Addresslist from './components/address_list.js';
import AddressAdd from './components/address-add.js';
import AddressEdit from './components/address-edit.js';
import Userinfo from './components/user-info.js';
import ProfileDetail from './components/profiledetail.js';
import { TransitionMotion, spring } from 'react-motion';


//关于我们
import Aboutus from './components/myprofile/aboutus.js';
//意见反馈
import Feedback from './components/myprofile/feedback.js';
//设置页面
import Settings from './components/settings.js';
//订单页面选择地址
import Orderseladdress from './components/shopping/orderseladdress.js';
//我的邀请码
import Mycode from './components/myprofile/mycode.js';
//订单选择优惠券
import Selcoupon from './components/myprofile/selcoupon.js';
//订单选择地址
import Seladdress from './components/shopping/seladdress.js';
//添加设备
import Devicelist from './components/devicelist.js';
//添加设备
import NewDevice from './components/newdevice.js';
//添加设备第一步连接wifi
import AddNewDevice from './components/device-add.js';
//添加设备第二步连接设备
import AddNewDevice2 from './components/device-add2.js';
//添加设备第三部连接成功
import AddNewDevice3 from './components/device-add3.js';
//圈子首页
import Community from './components/community.js';
//帖子详情
import Communityinfo from './components/community-info.js';
//个人中心
import UserCenter from './components/user-center.js';
//我的收藏
import MyCollection from './components/myprofile/collection.js';
//我的优惠券
import MyCoupon from './components/myprofile/coupon.js';
//我的消息列表
import MyMessage from './components/myprofile/message.js';
//消息详情
import MyMessageDetail from './components/myprofile/messagedetail.js';
//我的订单
import MyOrder from './components/myprofile/order.js';
//我的收益
import MyProfit from './components/myprofile/profit.js';
//提现
import TiXian from './components/myprofile/tixian.js';
//提现2－添加银行卡
import TiXian2 from './components/myprofile/tixian2.js';
//提现3-短信验证
import TiXian3 from './components/myprofile/messageCode.js';
//订单统计
import OrderTotal from './components/myprofile/ordertotal.js';
//我的分销
import Distribution from './components/myprofile/distribution.js';
//分销详情
import DistributionInfo from './components/myprofile/distributioninfo.js';
//退货申请
import ApplicationReturns from './components/myprofile/applicationreturns.js';
//我的帖子列表
import Topiclist from './components/myprofile/topiclist.js';
//修改用户名
import ChangeUsername from './components/myprofile/changeusername.js';
//忘记密码
import ForgetPwd from './components/forgetpwd.js';
//订单评价
import OrderEvaluation from './components/orderevaluation.js';
//订单详情
import OrderInfo from './components/orderinfo.js';
//物流详情
import LogisticsInfo from './components/logisticsinfo.js';
//商城套餐
import ShoppingPackage from './components/shopping/package.js';
//商城产品列表
import ShoppingProlist from './components/shopping/prolist.js';
//商城产品详情
import ShoppingProinfo from './components/shopping/proinfo.js';
//商城产品评价
import ShoppingProevaluate from './components/shopping/evaluate.js';
//购物车
import ShoppingCart from './components/shopping/cart.js';
//提交订单
import Pay from './components/shopping/pay.js';
//结算
import PayEnd from './components/shopping/payend.js';
//我的邀请码
import Share from './components/myprofile/share.js';
//我的邀请码
import Integral from './components/myprofile/integral.js';

//一键登录绑定用户
import Userbind from './components/userbind.js';

import Test from './components/test.js';



import {requireAuthentication} from './components/requireauthentication';
import '../public/css/page.css';

import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

const styles = {};

styles.fill = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: "100%"
}

styles.content = {
    ...styles.fill,
    top: '40px',
    textAlign:'center'
}

styles.nav = {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    height: '40px',
    width: '100%',
    display: 'flex'
}

styles.navItem = {
    textAlign: 'center',
    flex: 1,
    listStyleType: 'none',
    padding: '10px'
}

styles.hsl = {
    ...styles.fill,
    color:'white',
    paddingTop:'20px',
    fontSize:'30px'
}

const FadeRoute = ({ component: Component, ...rest }) => {
    const movelength = 300;
    let pagefirst = true;
    let willLeave = (movelength) => ({zIndex: 1, left: spring(-movelength)});
    let renderChildren = (props)=> {
        let location = props.location;
        let history = props.history;
        let match = props.match;
        let movelength = 300;
        if (history.action === 'PUSH') {
            movelength = 300;//弹出页面
        }
        else if (history.action === 'POP') {
            movelength = -300;//返回页面
        }
        let prvleft = movelength;
        return (
            <TransitionMotion
                willLeave={()=>{willLeave(movelength)}}
                styles={match ? [ {
                key: location.pathname,
                style: { left: 0, x : 1,zIndex:2},
                data: match
            } ] : []}
                >
                {interpolatedStyles => (
                    <div>
                        {interpolatedStyles.map(config => {
                                let x = config.style.x ? (prvleft + movelength) : config.style.left;
                                if (!config.style.x) {
                                    pagefirst = false;
                                    prvleft = config.style.left;
                                }
                                if (pagefirst) {
                                    x = 0
                                }

                                return (
                                    <div
                                        key={config.key}
                                        style={{
                                            ...styles.fill,
                                            ...config.style,
                                            left: `${x}px`,
                                        }}
                                        >
                                        <Component {...config.data} {...props}/>
                                    </div>
                                )
                            }
                        )}
                    </div>
                )}
            </TransitionMotion>
        );
    };

    return (
        <Route {...rest} children={renderChildren}/>
    )
}

import NewTopic from './components/newtopic.js';
const CoApp = (props) => {
    let CustomRoute = Route;
    return (
        <Switch>
            <CustomRoute exact path="/" component={App}/>
            <CustomRoute path="/login" component={Login}/>
            <CustomRoute path="/register" component={Register}/>
            <CustomRoute path="/addresslist" component={requireAuthentication(Addresslist)}/>
            <CustomRoute path="/newaddress" component={requireAuthentication(AddressAdd)}/>
            <CustomRoute path="/editaddress/:addressid" component={requireAuthentication(AddressEdit)}/>
            <CustomRoute path="/userinfo" component={requireAuthentication(Userinfo)}/>
            <CustomRoute path="/profiledetail" component={requireAuthentication(ProfileDetail)}/>
            <CustomRoute path="/newtopic" component={requireAuthentication(NewTopic)}/>
            <CustomRoute path="/devicelist" component={requireAuthentication(Devicelist)}/>
            <CustomRoute path="/newdevice" component={requireAuthentication(NewDevice)}/>
            <CustomRoute path="/addnewdevice" component={requireAuthentication(AddNewDevice)}/>
            <CustomRoute path="/addnewdevice2" component={requireAuthentication(AddNewDevice2)}/>
            <CustomRoute path="/addnewdevice3" component={requireAuthentication(AddNewDevice3)}/>
            <CustomRoute path="/mycollection" component={requireAuthentication(MyCollection)}/>
            <CustomRoute path="/mycoupon" component={requireAuthentication(MyCoupon)}/>
            <CustomRoute path="/mymessage" component={requireAuthentication(MyMessage)}/>
            <CustomRoute path="/mymessagedetail/:msgid" component={requireAuthentication(MyMessageDetail)}/>
            <CustomRoute path="/myorder" component={requireAuthentication(MyOrder)}/>
            <CustomRoute path="/usercenter" component={requireAuthentication(UserCenter)}/>
            <CustomRoute path="/myprofit" component={requireAuthentication(MyProfit)}/>
            <CustomRoute path="/tixian" component={requireAuthentication(TiXian)}/>
            <CustomRoute path="/tixian2" component={requireAuthentication(TiXian2)}/>
            <CustomRoute path="/tixian3" component={requireAuthentication(TiXian3)}/>
            <CustomRoute path="/ordertotal" component={requireAuthentication(OrderTotal)}/>
            <CustomRoute path="/distribution" component={requireAuthentication(Distribution)}/>
            <CustomRoute path="/distributioninfo/:id" component={requireAuthentication(DistributionInfo)}/>
            <CustomRoute path="/applicationreturns" component={requireAuthentication(ApplicationReturns)}/>
            <CustomRoute path="/communityinfo/:topicid" component={Communityinfo}/>
            <CustomRoute path="/mytopiclist" component={Topiclist}/>
            <CustomRoute path="/changeusername" component={requireAuthentication(ChangeUsername)}/>
            <CustomRoute path="/orderevaluation" component={OrderEvaluation}/>
            <CustomRoute path="/orderinfo" component={requireAuthentication(OrderInfo)}/>
            <CustomRoute path="/forgetpwd" component={ForgetPwd}/>
            <CustomRoute path="/logisticsinfo" component={LogisticsInfo}/>
            <CustomRoute path="/shoppingpackage/:id" component={ShoppingPackage}/>
            <CustomRoute path="/shoppingprolist/:type" component={ShoppingProlist}/>
            <CustomRoute path="/shoppingproinfo/:id" component={ShoppingProinfo}/>
            <CustomRoute path="/shoppingproevaluate/:id" component={ShoppingProevaluate}/>
            <CustomRoute path="/shoppingcart" component={requireAuthentication(ShoppingCart)} />
            <CustomRoute path="/pay" component={requireAuthentication(Pay)} />
            <CustomRoute path="/payend/:id" component={requireAuthentication(PayEnd)} />
            <CustomRoute path="/test" component={Test} />
            <CustomRoute path="/share" component={Share} />
            <CustomRoute path="/userbind" component={Userbind} /> 
            <CustomRoute path="/seladdress" component={requireAuthentication(Seladdress)} /> 
            <CustomRoute path="/selcoupon/:id" component={requireAuthentication(Selcoupon)} /> 
            <CustomRoute path="/mycode" component={requireAuthentication(Mycode)} /> 
            <CustomRoute path="/orderseladdress/:id" component={requireAuthentication(Orderseladdress)} /> 
            <CustomRoute path="/settings" component={Settings} /> 
            <CustomRoute path="/feedback" component={requireAuthentication(Feedback)} /> 
            <CustomRoute path="/integral" component={requireAuthentication(Integral)} /> 
            <CustomRoute path="/aboutus/:type" component={Aboutus} /> 
            <CustomRoute component={App}/>
        </Switch>
    );
}

import { hidepopmessage } from './actions/index.js';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Sharebox from './components/tools/share';
import Toast from './components/tools/toast';

class MessageCo extends React.Component {
    onDismiss = ()=> {
        this.props.dispatch(hidepopmessage());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ispop && !this.props.ispop) {
            window.setTimeout(()=> {
                this.props.dispatch(hidepopmessage());
            }, 3000);
        }
    }

    render() {
        let fullheight = {
            height: window.innerHeight + "px"
        }
        let MessageCo = null;
        if (this.props.ispop) {
            if (this.props.type === 'error') {
               MessageCo = (
                    <div className="messageCo" style={fullheight}>
                        <Message 
                            error
                            header={this.props.title}
                            content={this.props.msg}
                        />
                    </div>
                );
            }else if (this.props.type === 'warning') {
                 MessageCo = (
                    <div className="messageCo" style={fullheight}>
                        <Message 
                                 warning
                                 header={this.props.title}
                                 content={this.props.msg}
                            />
                    </div>
                );
            }
            else if (this.props.type === 'success') {
                 MessageCo = (
                    <div className="messageCo" style={fullheight}>
                        <Message 
                                 success
                                 header={this.props.title}
                                 content={this.props.msg}
                            />
                    </div>
                );
            }
        }
        return MessageCo;
     }
}
const mapStateToPropsMessageCo = ({app:{ispop,type,title,msg}}) => {
    return {ispop,type,title,msg};
}
MessageCo = connect(mapStateToPropsMessageCo)(MessageCo);


//app
class AppRoot extends React.Component {
    render() {        
        return (
            <div>
                <Toast />
                <MessageCo />
                <div className="pageWamp"><CoApp /></div>
                <Sharebox />
            </div>
        );
    }
}

export default AppRoot;