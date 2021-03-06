import React, { Component } from 'react'
import { Route, Redirect, } from 'react-router-dom'
import { isLogin } from '../../util/cookie-util';

// 判断已经登录
const MatchRouter = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => { 
            return (
                isLogin()
                    ?
                    <Component {...props} />
                    :
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
        }} />
    )
}
export default MatchRouter