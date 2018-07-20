import Axios from 'axios';
import { api_url } from '../__config';
import { roomConstants } from '../__redux/__constants';

export const roomService = {
    AddRoom,
    GetAllRooms,
    GoToRoom,
    GetRoom,
    GetBooking,
    BookRoom,
    CancelBooking,
    CheckAvailability,
    RecordStartTime,
    RecordEndTime
}

function AddRoom(roomName) {
        let addRoom_url = api_url+"room/addroom";

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
        let data = {
            roomname: roomName
        };
        return dispatch => {
            Axios.post(addRoom_url, data, config)
                .then(
                    room => {
                        if(room.data.message !== undefined) {
                            console.log("No room created ", room);
                            dispatch(failure(room.message));
                        }
                        else {
                            dispatch(GetAllRooms());
                            dispatch(success(room.data));
                        }
                        
                    },
                    error => {
                        dispatch(failure(error));
                    }
                );

        }
function success(room) { return { type: roomConstants.ADDROOM_SUCCESS, payload: room } }
function failure(error) { return { type: roomConstants.ADDROOM_FAILURE, error } }
}

function GetBooking(id) {
    //console.log("Get all rooms");
    let getbooking_url = api_url+"room/getbooking";

    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    let data = {
        meetingRoomId: id
    };
    return dispatch => {
        Axios.post(getbooking_url, data, config)
            .then(
                rooms => {
                    if(rooms.data.message !== undefined) {
                    }else {
                        dispatch(success(rooms.data));
                    }                    
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }
function success(rooms) { return { type: roomConstants.GETBOOKING_SUCCESS, payload: rooms } }
function failure(error) { return { type: roomConstants.GETBOOKING_FAILURE, error } }
}

function GetAllRooms() {
    //console.log("Get all rooms");
        let getallrooms_url = api_url+"room/getallrooms";

        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
        return dispatch => {
            Axios.post(getallrooms_url, null, config)
                .then(
                    rooms => {
                        dispatch(success(rooms.data));
                    },
                    error => {
                        dispatch(failure(error));
                    }
                );
        }
function success(rooms) { return { type: roomConstants.GETALLROOMS_SUCCESS, payload: rooms } }
function failure(error) { return { type: roomConstants.GETALLROOMS_FAILURE, error } }
}

function GoToRoom(id) {
    //logic has to be modified. should make an api call
    return dispatch => {
        GetRoom(id)
            .then(
                rooms => {
                    dispatch(success(rooms.data));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    }
function success(room) { return { type: roomConstants.SELECTROOM_SUCCESS, payload: room } }
function failure() { return { type: roomConstants.SELECTROOM_FAILURE, payload: {} } }
}

function GetRoom(id) {
    let gotoroom_url = api_url+"room/getroom";
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
        let data = {
            meetingRoomId: id
        };
        return Axios.post(gotoroom_url, data, config);
}

function CancelBooking(roomId, userId, startDate, endDate) {
    let bookroom_url = api_url+"room/cancelbooking";    
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    let data = {
        meetingRoomId: roomId,
        userId : userId,
        startDate: startDate,
        endDate: endDate
    };
    return dispatch => {
        Axios.post(bookroom_url, data, config)
                .then(
                    bookings => {
                        dispatch(success(bookings.data));
                    },
                    error => {
                        dispatch(failure(error));
                    }
                );
    }
    
function success(bookings) { return { type: roomConstants.GETBOOKING_SUCCESS, payload: bookings } }
function failure() { return { type: roomConstants.GETBOOKING_FAILURE, payload: {} } }
}


function CheckAvailability(startDate, endDate) {
    //console.log("CheckAvailability ",startDate, endDate);
    let checkavailability_url = api_url+"room/getfreerooms";    
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    let data = {
        startDate: startDate,
        endDate: endDate
    };
    return dispatch => {
        Axios.post(checkavailability_url, data, config)
                .then(
                    rooms => {
                        console.log("rooms.data ", rooms.data);
                        dispatch(success(rooms.data));
                    },
                    error => {
                        console.log(error);
                        dispatch(failure(error));
                    }
                );
    }
    
function success(rooms) { return { type: roomConstants.GETALLROOMS_SUCCESS, payload: rooms } }
function failure() { return { type: roomConstants.CHECKAVAILABILITY_FAILURE, payload: {} } }
}

function BookRoom(roomId, userId, startDate, endDate) {
    let bookroom_url = api_url+"room/bookroom";    
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    let data = {
        meetingRoomId: roomId,
        userId : userId,
        startDate: startDate,
        endDate: endDate
    };
    return dispatch => {
        Axios.post(bookroom_url, data, config)
                .then(
                    rooms => {
                        if(rooms.data.message !== undefined) {
                        }else {
                            dispatch(success(rooms.data));
                        }
                    },
                    error => {
                        dispatch(failure(error));
                    }
                );
    }
    
function success(room) { return { type: roomConstants.SELECTROOM_SUCCESS, payload: room } }
function failure() { return { type: roomConstants.SELECTROOM_FAILURE, payload: {} } }
}

function RecordStartTime(startDate) {
    return dispatch => {
        dispatch(success(startDate));
    }
function success(startDate) { return { type: roomConstants.RECORDSTARTTIME_SUCCESS, payload: startDate }};
}

function RecordEndTime(endDate) {
    return dispatch => {
        dispatch(success(endDate));
    }
function success(endDate) { return { type: roomConstants.RECORDENDTIME_SUCCESS, payload: endDate }};
}