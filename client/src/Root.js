import React from 'react';
import { Provider } from 'react-redux';
import store from './__helpers/store';

export default ({children, initialState={}}) => {
    return (
        <Provider store={store(initialState)}>
                {children}
        </Provider>
    );
}