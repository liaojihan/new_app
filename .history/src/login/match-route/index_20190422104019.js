import React, { Component } from 'react'
import { Route, Redirect, } from 'react-router-dom'
import {  } from '../../util/cookie-util';

// 判断已经登录
const MatchRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        cookie.isLogin
            ?
        <Component {...props} />
            :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    )}/>
);

export default MatchRouter