import { createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../__redux/__reducers';

const loggerMiddleware = createLogger();
const middleware = applyMiddleware(reduxThunk);
export default initialState => createStore(rootReducer, initialState, middleware);
