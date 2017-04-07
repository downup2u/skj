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
import {CategorylistList,CategorylistEdit,CategorylistShow} from './components/category/index.js';
import {ExpresslistList,ExpresslistEdit,ExpresslistShow} from './components/express/index.js';
import {NotifymessagelistList,NotifymessagelistEdit,NotifymessagelistShow} from './components/notifymessage/index.js';
import {ProductlistList,ProductlistEdit,ProductlistShow} from './components/product/index.js';
import {TopiclistList,TopiclistEdit,TopiclistShow} from './components/topic/index.js';


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
                <Resource name="product" list={ProductlistList} edit={ProductlistEdit} />
                <Resource name="category" list={CategorylistList} edit={CategorylistEdit} />
                <Resource name="express" list={ExpresslistList} edit={ExpresslistEdit} />
                <Resource name="topic" list={TopiclistList} edit={TopiclistEdit} />
                <Resource name="notifymessage" list={NotifymessagelistList} edit={NotifymessagelistEdit} />
            </Admin>
        );
    }
}

export default App;
