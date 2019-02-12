import { combineReducers } from 'redux';
import { alert } from '__redux/__reducers/alert.reducer';
import { room } from '__redux/__reducers/room.reducer';
import { authentication } from '__redux/__reducers/authentication.reducer';

const rootReducer = combineReducers({
    alert,
    room,
    authentication
});

export default rootReducer;