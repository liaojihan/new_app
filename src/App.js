import React, { Component } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import { inject, observer } from 'mobx-react/index'
import Login from './login';
// import Home from './home';
import Other from './other'
import MatchRouter from './login/match-route';
import Container from "./container";
import Top from "./top"
import Details from "./details"

@inject('appStore') 
@observer
class App extends Component {

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <MatchRouter path="/" component={Other} />
                <Route path='/home' component={Container} />
                <Route path='/hot' component={Top} />
                <Route path='/soon' component={Top} />
                <Route path='/bank' component={Top} />
                <Route path='/details' component={Details}/>
            </Switch>
        );
    }
}

export default App;
