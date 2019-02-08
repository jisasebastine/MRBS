import { alertConstants } from "../__redux/__constants";

export const alertService = {
    LoadEachRoom,
    Clear
};

function LoadEachRoom(value) {
    return dispatch => {
        dispatch(success(value));
    }
function success(value) { return {type:alertConstants.LOADEACHROOM_SUCCESS, payload: value}}
// function failure() { return {type:alertConstants.LOADEACHROOM_FAILURE, payload: false}}
}

function Clear() {
    return { type: alertConstants.CLEAR, payload: {}};
}