import { authenticationConstants } from '__redux/__constants';
const initialState = {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_SUCCESS:        
        return {
            ...state,
            loggedIn: true,
            user: action.payload
        };
    case authenticationConstants.SIGNUP_SUCCESS:        
        return {
            ...state,
            loggedIn: true,
            user: action.payload
        };
    default:
        return state
  }
}