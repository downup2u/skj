import React from 'react';
import { Route } from 'react-router';
import Configuration from './configuration/Configuration';
import MycouponbatchCreate from './components/mycoupon/createbatch.js';

export default [
    <Route exact path="/createbatch" component={MycouponbatchCreate} />,
    <Route exact path="/configuration" component={Configuration} />
];
