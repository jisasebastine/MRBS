import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './__helpers/store';
import Root from './Root';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Root>
        <App/>
    </Root>,
    document.getElementById('root'));
registerServiceWorker();
