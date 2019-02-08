import Axios from 'axios';
import { api_url } from '../__config';
import { roomConstants, alertConstants } from '../__redux/__constants';
import { alertService } from './alert.service';

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
            dispatch(alertService.Clear());
            Axios.post(addRoom_url, data, config)
                .then(
                    room => {
                        dispatch(GetAllRooms());
                        dispatch(success(room.data));
                        
                    },
                    error => {
                        console.log("No room created ", error.response);
                        dispatch(failure(error.response.data.message));
                    }
                );

        }
function success(room) { return { type: roomConstants.ADDROOM_SUCCESS, payload: room } }
function failure(error) { return { type: roomConstants.ERROR, payload: error } }
}

function GetBooking(id) {
    console.log("Get all bookings");    
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
        dispatch(alertService.Clear());
        Axios.post(getbooking_url, data, config)
            .then(
                rooms => {
                    if(rooms.data.length === 0) {
                        dispatch(alert("No bookings yet."));
                    }
                    dispatch(success(rooms.data));                   
                },
                error => {
                    dispatch(alert(error.response.data.message));
                }
            );
    }
function success(rooms) { return { type: roomConstants.GETBOOKING_SUCCESS, payload: rooms } }
function alert(error) { return { type: alertConstants.ERROR, payload: error } }
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
            dispatch(alertService.Clear());
            Axios.post(getallrooms_url, null, config)
                .then(
                    rooms => {
                        dispatch(success(rooms.data));
                    },
                    error => {
                        dispatch(failure());
                    }
                );
        }
function success(rooms) { return { type: roomConstants.GETALLROOMS_SUCCESS, payload: rooms } }
function failure() { return { type: alertConstants.ERROR, payload: 'Get All Rooms failed' } }
}

function GoToRoom(id) {
    //logic has to be modified. should make an api call
    return dispatch => {
        dispatch(alertService.Clear());
        GetRoom(id)
            .then(
                rooms => {
                    dispatch(success(rooms.data));
                },
                error => {
                    dispatch(failure(error.response.data.message));
                }
            );
    }
function success(room) { return { type: roomConstants.SELECTROOM_SUCCESS, payload: room } }
function failure(error) { return { type: roomConstants.ERROR, payload: error } }
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
        dispatch(alertService.Clear());
        Axios.post(bookroom_url, data, config)
                .then(
                    bookings => {
                        dispatch(success(bookings.data));
                    },
                    error => {
                        dispatch(failure(error.response.data.message));
                    }
                );
    }
    
function success(bookings) { return { type: roomConstants.GETBOOKING_SUCCESS, payload: bookings } }
function failure(error) { return { type: alertConstants.ERROR, payload: error } }
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
        dispatch(alertService.Clear());
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
function failure(error) { return { type: roomConstants.ERROR, payload: error.response.message } }
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
        dispatch(alertService.Clear());
        Axios.post(bookroom_url, data, config)
                .then(
                    booking => {
                        dispatch(success(booking.data));//returns the updated bookings for the selected room
                        dispatch(success_alert("Room is booked successfully"));
                    },
                    error => {
                        dispatch(failure(error.response.data.message));
                    }
                );
    }
    
function success(bookings) { return { type: roomConstants.GETBOOKING_SUCCESS, payload: bookings } }
function success_alert(message) { return { type: alertConstants.SUCCESS, payload: message } }
function failure(message) { return { type: alertConstants.ERROR, payload: message } }
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