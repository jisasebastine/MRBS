import { alertConstants } from '../__constants';
const initialState = {};

export function alert(state = initialState, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    case alertConstants.SHOW_MODAL_ACCOUNT:
      return {
        showModalAccount : action.payload
      };
    case alertConstants.SHOW_MODAL_USER:
      return {
        showModalUser : action.payload
      };
    default:
      return state
  }
}