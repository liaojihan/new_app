import React, { Component } from 'react'
import { Route, Control } from "react-keeper"
import { isLogin } from '../../util/cookie-util';

// 判断已经登录
const MatchRouter = (callback, props) => {
    if (isLogin()){
        callback();
    } else {
        Control.go()
    }
}

export default MatchRouter