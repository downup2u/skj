import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource ,Delete} from 'admin-on-rest';
import themeReducer from './themeReducer';
import authClient from './authClient';

import logo from './logo.svg';
import './App.css';
import sagas from './sagas';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
//import { Dashboard } from './dashboard';
import CustomRoutes from './routes';
import translations from './i18n';
import {SystemconfigCreate,SystemconfigList,SystemconfigShow,SystemconfigEdit} from './components/systemconfig/index.js';
import {BannerlistCreate,BannerlistList,BannerlistEdit,BannerlistShow} from './components/banner/index.js';
import {CategorylistCreate,CategorylistList,CategorylistEdit,CategorylistShow} from './components/category/index.js';
import {ProductlistCreate,ProductlistList,ProductlistEdit,ProductlistShow} from './components/product/index.js';
import {ExpresslistCreate,ExpresslistList,ExpresslistEdit,ExpresslistShow} from './components/express/index.js';
import {NotifymessageCreate,NotifymessagelistList,NotifymessagelistEdit,NotifymessagelistShow} from './components/notifymessage/index.js';
import {TopiclistList,TopiclistEdit,TopiclistShow} from './components/topic/index.js';
import {TopiccommentlistList,TopiccommentlistEdit,TopiccommentlistShow} from './components/topiccomment/index.js';
import {FeedbackList,FeedbackShow} from './components/feedback/index.js';
import {CouponlistList,CouponlistCreate,CouponlistEdit,CouponlistShow} from './components/coupon/index.js';
import {MycouponlistList,MycouponlistCreate,MycouponlistEdit,MycouponlistShow} from './components/mycoupon/index.js';
import {UserlistList,UserlistShow,UserlistEdit} from './components/user/index.js';
import {NewslistCreate,NewslistList,NewslistEdit,NewslistShow} from './components/news/index.js';
import {WithdrawcashlistList,WithdrawcashlistEdit,WithdrawcashlistShow} from './components/withdrawcash/index.js';
import {OrderlistList,OrderlistEdit} from './components/orders/index.js';
import {AboutlistList,AboutlistEdit,AboutlistCreate} from './components/abouts/index.js';
import {DevicelistList,DevicelistEdit} from './components/device/index';
import {RealtimedatalistList,RealtimedatalistEdit} from './components/realtimedata/index';
import restClient from './restClient';
class App extends Component {
     render() {
        return (
            <Admin
                title="水盒子管理后台"
                restClient={restClient}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={CustomRoutes}
                authClient={authClient}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="cn"
                messages={translations}
            >
                <Resource name="about" list={AboutlistList} edit={AboutlistEdit} create={AboutlistCreate}  />
                <Resource name="systemconfig" list={SystemconfigList} show={SystemconfigShow} edit={SystemconfigEdit}  create={SystemconfigCreate} />
                <Resource name="banner" list={BannerlistList} edit={BannerlistEdit} create={BannerlistCreate}  remove={Delete} />
                <Resource name="product" list={ProductlistList} edit={ProductlistEdit} create={ProductlistCreate}  />
                <Resource name="category" list={CategorylistList} edit={CategorylistEdit} create={CategorylistCreate} />
                <Resource name="express" list={ExpresslistList} edit={ExpresslistEdit}  create={ExpresslistCreate}  remove={Delete} />
                <Resource name="topic" list={TopiclistList} edit={TopiclistEdit} />
                <Resource name="comments" list={TopiccommentlistList} edit={TopiccommentlistEdit} />
                <Resource name="notifymessage" list={NotifymessagelistList} edit={NotifymessagelistEdit} create={NotifymessageCreate}  remove={Delete} />
                <Resource name="feedback" list={FeedbackList} show={FeedbackShow} />
                <Resource name="coupon" list={CouponlistList} edit={CouponlistEdit} create={CouponlistCreate}  remove={Delete} />
                <Resource name="mycoupon" list={MycouponlistList} edit={MycouponlistEdit} create={MycouponlistCreate}  remove={Delete} />
                <Resource name="device" list={DevicelistList} edit={DevicelistEdit}  remove={Delete} />
                <Resource name="realtimedata" list={RealtimedatalistList} edit={RealtimedatalistEdit}  remove={Delete} />
                <Resource name="user" list={UserlistList} show={UserlistShow} edit={UserlistEdit} />
                <Resource name="news" list={NewslistList} edit={NewslistEdit} create={NewslistCreate}  remove={Delete} />
                <Resource name="withdrawcash" list={WithdrawcashlistList}  edit={WithdrawcashlistEdit}/>
                <Resource name="order" list={OrderlistList} edit={OrderlistEdit}/>
           </Admin>
        );
    }
}

export default App;
