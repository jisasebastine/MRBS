import { combineReducers } from 'redux';
import { alert } from './alert.reducer';
import { room } from './room.reducer';

const rootReducer = combineReducers({
    alert,
    room
});

export default rootReducer;