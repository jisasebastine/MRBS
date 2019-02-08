import { roomConstants } from '../__constants';
const initialState = {
    "rooms": []
};

const success = 'alert alert-success';
const danger = 'alert alert-danger';

export function room(state=initialState, action) {
    //console.log("Action type", action.type);
    switch (action.type) {
        case roomConstants.GETALLROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.payload
            }
        case roomConstants.GETBOOKING_SUCCESS:
            return {
                ...state,
                bookings: action.payload
            }
        case roomConstants.ADDROOM_SUCCESS:
            return {
                ...state,
                new_room: true              
            }
        case roomConstants.SELECTROOM_SUCCESS: 
            return {
                ...state,
                selected_room: action.payload
            }
        case roomConstants.RECORDSTARTTIME_SUCCESS:
            return {
                ...state,
                startTime: action.payload
            }
        case roomConstants.RECORDENDTIME_SUCCESS:
            return {
                ...state,
                endTime: action.payload
            }        
        default: {
            return state
        }
    }
}