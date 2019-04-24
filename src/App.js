import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react/index'
import Login from './login';
import Home from './components/home';
import MatchRouter from './login/match-route';

@inject('appStore') 
@observer
class App extends Component {

    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <MatchRouter path="/" component={Home} />
            </Switch>
        );
    }
}
        
export default App;
