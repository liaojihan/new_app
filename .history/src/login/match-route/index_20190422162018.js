import React, { Component } from 'react'
import { Route } from "react-keeper"
import { isLogin } from '../../util/cookie-util';

// 判断已经登录
const MatchRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLogin()
            ?
        <Component {...props} />
            :
        <Route redirect="/login" />
    )}/>
);

export default MatchRouter