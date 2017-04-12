import 'babel-polyfill';
import React, { Component } from 'react';
import { Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
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
import {BannerlistCreate,BannerlistList,BannerlistEdit,BannerlistShow} from './components/banner/index.js';
import {CategorylistCreate,CategorylistList,CategorylistEdit,CategorylistShow} from './components/category/index.js';
import {ProductlistCreate,ProductlistList,ProductlistEdit,ProductlistShow} from './components/product/index.js';
import {ExpresslistCreate,ExpresslistList,ExpresslistEdit,ExpresslistShow} from './components/express/index.js';
import {NotifymessageCreate,NotifymessagelistList,NotifymessagelistEdit,NotifymessagelistShow} from './components/notifymessage/index.js';
import {TopiclistList,TopiclistEdit,TopiclistShow} from './components/topic/index.js';
import {FeedbackList,FeedbackShow} from './components/feedback/index.js';
import {CouponlistList,CouponlistCreate,CouponlistEdit,CouponlistShow} from './components/coupon/index.js';
import {UserlistList,UserlistShow} from './components/user/index.js';
import {NewslistCreate,NewslistList,NewslistEdit,NewslistShow} from './components/news/index.js';
import {WithdrawcashlistList,WithdrawcashlistEdit,WithdrawcashlistShow} from './components/withdrawcash/index.js';
import {OrderlistList,OrderlistEdit,OrderlistShow} from './components/orders/index.js';

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
                <Resource name="banner" list={BannerlistList} edit={BannerlistEdit} create={BannerlistCreate}  remove={Delete} />
                <Resource name="product" list={ProductlistList} edit={ProductlistEdit} create={ProductlistCreate}  remove={Delete} />
                <Resource name="category" list={CategorylistList} edit={CategorylistEdit} create={CategorylistCreate}  remove={Delete} />
                <Resource name="express" list={ExpresslistList} edit={ExpresslistEdit}  create={ExpresslistCreate}  remove={Delete} />
                <Resource name="topic" list={TopiclistList} edit={TopiclistEdit} />
                <Resource name="notifymessage" list={NotifymessagelistList} edit={NotifymessagelistEdit} create={NotifymessageCreate}  remove={Delete} />
                <Resource name="feedback" list={FeedbackList} show={FeedbackShow} />
                <Resource name="coupon" list={CouponlistList} edit={CouponlistEdit} create={CouponlistCreate}  remove={Delete} />
                <Resource name="user" list={UserlistList} show={UserlistShow} />
                <Resource name="news" list={NewslistList} edit={NewslistEdit} create={NewslistCreate}  remove={Delete} />
                <Resource name="withdrawcash" list={WithdrawcashlistList} show={WithdrawcashlistShow}  edit={WithdrawcashlistEdit}/>
                <Resource name="order" list={OrderlistList} show={OrderlistShow}  edit={OrderlistEdit}/>
           </Admin>
        );
    }
}

export default App;
