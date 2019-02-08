import { alertConstants, roomConstants, authenticationConstants } from '../__constants';
const initialState = {};
const success = 'alert alert-success';
const danger = 'alert alert-danger';

export function alert(state = initialState, action) {
  switch (action.type) {
    case alertConstants.LOADEACHROOM_SUCCESS:
      return {
        ...state,
        loadeachroom: action.payload
      };
    case alertConstants.CLEAR:
      return {
        ...state,
        type: '',
        message: '',
        room_alert_type: '',
        room_alert_message: ''
      };
    case alertConstants.ERROR:
      return {
        ...state,
        type: danger,
        message: action.payload
      };
    case alertConstants.SUCCESS:
      return {
        ...state,
        type: success,
        message: action.payload
      };    
    case roomConstants.ERROR:
          return {
              ...state,
              room_alert_type: danger,
              room_alert_message: action.payload
          };
    case roomConstants.SUCCESS:
        return {
            ...state,
            room_alert_type: success,
            room_alert_message: action.payload
        };    
    default:
      return state
  }
}