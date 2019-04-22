import React, { Component } from 'react';
import './App.css'; 
import { BrowserRouter, Route } from 'react-keeper'
import { inject, observer } from 'mobx-react/index'
import Login from './login';
import Home from './home';
import MatchRouter from './login/match-route';

@inject('appStore') 
@observer
class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route index miss path="/" component={Home} enterFilter={MatchRouter} />
                    <Route index miss path="/login" component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
