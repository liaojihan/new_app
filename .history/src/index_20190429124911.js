import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store";
import {Provider} from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
    <Router> 
        <Provider store={reduxStore}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);
serviceWorker.unregister();
