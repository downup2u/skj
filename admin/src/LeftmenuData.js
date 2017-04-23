import React, { PropTypes } from 'react';
import { translate } from 'admin-on-rest';


import PlatformbaseinfoIcon from 'material-ui/svg-icons/action/perm-data-setting';//平台基本信息
import BaseinfocompanyIcon from 'material-ui/svg-icons/action/settings-input-antenna';//平台基本信息
import BaseinfocompanystatIcon from 'material-ui/svg-icons/av/equalizer';//平台统计信息
import BaseinfocompanypayIcon from 'material-ui/svg-icons/action/payment';//平台支付机构信息
import BaseinfocompanyserviceIcon from 'material-ui/svg-icons/action/account-balance';//平台服务机构信息
import BaseinfocompanypermitIcon from 'material-ui/svg-icons/action/verified-user';//平台经营许可信息
import BaseinfocompanyfareIcon from 'material-ui/svg-icons/maps/local-atm';//运价信息
import BaseinfovehicleIcon from 'material-ui/svg-icons/maps/directions-car';//车辆信息
import BaseinfovehiclelnsuranceIcon from 'material-ui/svg-icons/hardware/security';//保险信息
import BaseinfovehicletotalmileIcon from 'material-ui/svg-icons/action/donut-large';//车辆里程信息
import BaseinfodriverIcon  from 'material-ui/svg-icons/action/assignment-ind';//司机基本信息
import BaseinfodrivereducateIcon  from 'material-ui/svg-icons/maps/directions-car';//司机教育信息
import BaseinfodriverappIcon  from 'material-ui/svg-icons/navigation/apps';//app信息
import BaseinfodriverstatIcon  from 'material-ui/svg-icons/editor/pie-chart';//司机统计信息
import BaseinfopassengerIcon  from 'material-ui/svg-icons/action/accessibility';//乘客基本信息

import PlatformorderIcon from 'material-ui/svg-icons/action/shopping-cart';//订单信息
import OrdercreateIcon from 'material-ui/svg-icons/action/note-add';//订单新建
import OrdermatchIcon from 'material-ui/svg-icons/action/done';//订单匹配
import OrdercancelIcon from 'material-ui/svg-icons/navigation/cancel';//订单取消

import PlatformoperateIcon from 'material-ui/svg-icons/action/motorcycle';//经营信息
import OperateloginIcon from 'material-ui/svg-icons/action/check-circle';//经营上线
import OperatelogoutIcon from 'material-ui/svg-icons/action/exit-to-app';//经营下线
import OperatedepartIcon from 'material-ui/svg-icons/action/flight-takeoff';//经营出发
import OperatearriveIcon from 'material-ui/svg-icons/action/flight-land';//经营到达
import OperatepayIcon from 'material-ui/svg-icons/action/credit-card';//经营支付

import PlatformpositionIcon from 'material-ui/svg-icons/communication/location-on';//位置
import PositiondriverIcon from 'material-ui/svg-icons/maps/person-pin';
import PositionvehicleIcon from 'material-ui/svg-icons/maps/edit-location';

import PlatformratedIcon from 'material-ui/svg-icons/action/face';//服务质量
import RatedpassengerIcon from 'material-ui/svg-icons/action/favorite';//乘客评价
import RatedpassengercomplaintIcon from 'material-ui/svg-icons/action/perm-phone-msg';//投诉
import RateddriverpunishIcon from 'material-ui/svg-icons/action/thumb-down';//惩罚信息
import RateddriverIcon from 'material-ui/svg-icons/action/favorite-border';//司机评价

import SysinfoIcon from 'material-ui/svg-icons/action/build';//系统设置
import SystemconfigIcon from 'material-ui/svg-icons/action/settings-brightness';//系统设置
import NotifymessageIcon from 'material-ui/svg-icons/communication/chat';//系统消息
import FaretypeIcon from 'material-ui/svg-icons/editor/monetization-on';//运价类型
import PriceIcon from 'material-ui/svg-icons/editor/attach-money';//价格信息
import AboutIcon from 'material-ui/svg-icons/action/info';//关于信息
import BuscarpoolIcon from 'material-ui/svg-icons/social/people-outline';//拼车信息
import TourbusinfoIcon from 'material-ui/svg-icons/maps/directions-bus';//旅游大巴信息
import CouponIcon from 'material-ui/svg-icons/action/card-giftcard';//优惠券信息
import OrderIcon from 'material-ui/svg-icons/action/euro-symbol';//订单信息
import TriprequestIcon from 'material-ui/svg-icons/action/pan-tool';//请求信息

import UsermgrIcon from 'material-ui/svg-icons/social/people-outline';//用户管理
import UserdriverIcon from 'material-ui/svg-icons/action/account-box';//司机信息

//import SystemconfigIcon from 'material-ui/svg-icons/action/settings-brightness';//系统设置
import FeedbackIcon from 'material-ui/svg-icons/action/feedback';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import TopicIcon from 'material-ui/svg-icons/communication/forum';
import TopiccommentIcon from 'material-ui/svg-icons/communication/forum';
import ForumIcon from 'material-ui/svg-icons/communication/forum';
import CategoryIcon from 'material-ui/svg-icons/action/list';
import BannerIcon from 'material-ui/svg-icons/action/view-carousel';
import ExpressIcon from 'material-ui/svg-icons/content/send';
import ProductIcon from 'material-ui/svg-icons/hardware/toys';
//import CouponIcon from 'material-ui/svg-icons/action/card-giftcard';//优惠券信息
import MycouponIcon from 'material-ui/svg-icons/action/card-giftcard';//优惠券信息
import UserIcon from 'material-ui/svg-icons/action/account-circle';//乘客信息

import Icon from 'material-ui/svg-icons/social/person';
// const items = [
//     { name: 'systemconfig', icon: <SystemconfigIcon /> },
//     { name: 'news', icon: <UserIcon /> },
//     { name: 'banner', icon: <BannerIcon /> },
//     { name: 'category', icon: <CategoryIcon /> },
//     { name: 'product', icon: <Icon /> },
//     { name: 'express', icon: <ExpressIcon /> },
//     { name: 'coupon', icon: <CouponIcon /> },

//     { name: 'topic', icon: <TopicIcon /> },
//     { name: 'comment', icon: <TopiccommentIcon /> },
//     { name: 'notifymessage', icon: <MessageIcon /> },
//     { name: 'feedback', icon: <FeedbackIcon /> },


  
//   { name: 'order', icon: <UserIcon /> },
  
//   { name: 'user', icon: <UserIcon /> },
//   { name: 'mycoupon', icon: <MycouponIcon /> },
//   { name: 'withdrawcash', icon: <UserIcon /> },
// ];


export default [
  {
    'name':'baseinfo',
    'icon': <PlatformbaseinfoIcon />,
    'children': [
      { name: 'systemconfig', icon: <SystemconfigIcon /> },
      { name: 'news', icon: <UserIcon /> },
      { name: 'banner', icon: <BannerIcon /> },
      { name: 'category', icon: <CategoryIcon /> },
      { name: 'product', icon: <Icon /> },
      { name: 'express', icon: <ExpressIcon /> },
      { name: 'coupon', icon: <CouponIcon /> },
      { name: 'about', icon: <AboutIcon /> },
    ]
  },
   {
    'name':'forum',
    'icon': <ForumIcon />,
    'children': [
      { name: 'topic', icon: <TopicIcon /> },
      { name: 'comments', icon: <TopiccommentIcon /> },
    ]
  },



    { name: 'notifymessage', icon: <MessageIcon /> },
    { name: 'feedback', icon: <FeedbackIcon /> },
    { name: 'order', icon: <UserIcon /> },
  {
    'name':'usermgr',
    'icon': <UsermgrIcon />,
    'children': [
      { name: 'user', icon: <UserIcon /> },
      { name: 'mycoupon', icon: <MycouponIcon /> },
      { name: 'withdrawcash', icon: <UserIcon /> },
    ]
  },

];
