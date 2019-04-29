import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'
import reduxStore from './store/redux/index'
import {Provider} from ''
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Router> 
        <Provider {reduxStore}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
);
serviceWorker.unregister();
