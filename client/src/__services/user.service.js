import Axios from 'axios';
import { api_url } from '__config';
import { authenticationConstants, alertConstants } from '__redux/__constants';
import { alertService } from '__services/alert.service';

export const userService = {
    Login,
    GoogleSignUp,
    SignUp,
    OtherLogin
};

function OtherLogin(profile) {
    let signup_url = api_url+"user/signup";
    var data = {
        username: profile.username,
        password: profile.password,
        email: profile.email
    };
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    return dispatch => {
        dispatch(alertService.Clear());
        Axios.post(signup_url, data, config)
        .then(
            response => {
                console.log("signup success: ", response);
                dispatch(success(response.data.message));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                window.location.href = '/';
            },
            error => {
                dispatch(Login(profile));
            }
        );
}

function success(message) { return { type: authenticationConstants.SIGNUP_SUCCESS, payload: message};}

}

function Login(user, callback) {
    let login_url = api_url+"user/login";
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    let data = {
        username: user.username,
        password: user.password
    };
    return dispatch => {
        dispatch(alertService.Clear());
        Axios.post(login_url, data, config)
            .then(
                response => {
                    dispatch(success(response.data));
                    localStorage.setItem('user', JSON.stringify(response.data));
                    callback();
                },
                error => {
                    dispatch(failure(error.response.data.message));
                    callback(error.response.data.message);
                }
            );
    }

function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, payload: user};}
function failure(error) { return { type: alertConstants.ERROR, payload: error};}
}

function GoogleSignUp(profile, callback) {
    let signup_url = api_url+"user/signup";
    var data = {
        username: profile.username,
        password: profile.password,
        email: profile.email
    };
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    return dispatch => {
        dispatch(alertService.Clear());
        Axios.post(signup_url, data, config)
        .then(
            response => {
                console.log("signup success: ", response);
                dispatch(success(response.data.message));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                callback();
            },
            error => {
                console.log("signup failed ", error);
                dispatch(failure(error.response.data.message));
                localStorage.setItem('user', JSON.stringify(error.response.data.user));
                callback();
            }
        );
}
function success(message) { return { type: authenticationConstants.SIGNUP_SUCCESS, payload: message};}
function failure(error) { return { type: alertConstants.ERROR, payload: error};}
}

function SignUp(profile, callback) {
    let signup_url = api_url+"user/signup";
    var data = {
        username: profile.username,
        password: profile.password,
        email: profile.email
    };
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    return dispatch => {
        dispatch(alertService.Clear());
        Axios.post(signup_url, data, config)
        .then(
            response => {
                console.log("signup success: ", response);
                dispatch(success(response.data.message));
                localStorage.setItem('user', JSON.stringify(response.data.user));
                callback();
            },
            error => {
                console.log("signup failed ", error);
                dispatch(failure(error.response.data.message));
                callback();
            }
        );
}

function success(message) { return { type: authenticationConstants.SIGNUP_SUCCESS, payload: message};}
function failure(error) { return { type: alertConstants.ERROR, payload: error};}
}