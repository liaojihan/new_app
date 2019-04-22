import React, { Component } from 'react'
import { inject, observer } from 'mobx-react/index'
import { Icon, Input, Tooltip, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'
import { loginSuccess } from "../util/cookie-util";
import './index.css'

const warn = () => {
    message.warn('您输入的信息有误', 4);
}

const success = () => {
    message.success('登录成功', 2);
}

@withRouter
@inject('appStore') 
@observer
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    usernameHandler = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    loginHandler = (e) => {
        const username = this.state.username;
        const password = this.state.password;
        if (username !== 'admin' || password !== 'admin') {
            warn();
            return;
        }
        success();
        loginSuccess();
        this.props.history.push('/');
        console.log('');
    }

    render() {
        return (
            <div className="loginForm">
                <p>
                    <Input placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={
                            <Tooltip title="Extra information">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                        value={this.state.username} onChange={ (e) => this.usernameHandler(e)}/>
                </p>
                <p>
                    <Input.Password placeholder="input password"
                        prefix={<Icon type="tool" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        value={this.state.password} onChange={ (e) => this.passwordHandler(e)}/>
                </p>
                <p>
                    <Button type="danger" size="default" onClick={ (e) => this.loginHandler(e)}>登录</Button>
                </p>
            </div>
        );
    }
}

export default Login
