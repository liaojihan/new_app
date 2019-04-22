import React, { Component } from 'react'
import { Route } from "react-keeper"
import { isLogin } from '../../util/cookie-util';

// 判断已经登录
const MatchRouter = (callback, props) => {
    console.log(props);
    if (isLogin()){
        callback();
    } else {
        return false
    }
}

export default MatchRouter