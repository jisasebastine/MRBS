import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../__redux/__reducers';

const loggerMiddleware = createLogger();
const middleware = applyMiddleware(thunk);
export const store = createStore(
    rootReducer, middleware
);