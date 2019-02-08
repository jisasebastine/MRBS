import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { room } from './room.reducer';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers({
    alert,
    room,
    authentication
});

export default rootReducer;