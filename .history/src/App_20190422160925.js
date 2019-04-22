import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-keeper'
import { inject, observer } from 'mobx-react/index'
import Login from './login';
import Home from './home';
import MatchRouter from './login/match-route';

@inject('appStore') 
@observer
class App extends Component {

    render() {
        return (
            <Route/>
        );
    }
}

export default App;
