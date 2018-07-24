import { alertConstants } from '../__constants';
const initialState = {};

export function alert(state = initialState, action) {
  switch (action.type) {
    case alertConstants.LOADEACHROOM_SUCCESS:
      return {
        loadeachroom: action.payload
      };
    default:
      return state
  }
}