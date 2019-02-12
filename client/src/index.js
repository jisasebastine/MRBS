import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from 'Root';
import 'css/index.css';
import App from 'App';

ReactDOM.render(
    <Root>
        <App/>
    </Root>,
    document.getElementById('root'));
