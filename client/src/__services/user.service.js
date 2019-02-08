import Axios from 'axios';
import { api_url } from '../__config';
import { authenticationConstants, alertConstants } from '../__redux/__constants';
import { alertService } from '.';

export const userService = {
    Login,
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

function Login(user) {
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
                    console.log("login success: ", response.data);
                    dispatch(success(response.data));
                    localStorage.setItem('user', JSON.stringify(response.data));
                    window.location.href = '/';
                },
                error => {
                    console.log("login failed ", error.response);
                    dispatch(failure(error.response.data.message));
                }
            );
    }

function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, payload: user};}
function failure(error) { return { type: alertConstants.ERROR, payload: error};}
}

function SignUp(profile) {
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
                console.log("signup failed ", error);
                dispatch(failure(error.response.data.message));
            }
        );
}

function success(message) { return { type: authenticationConstants.SIGNUP_SUCCESS, payload: message};}
function failure(error) { return { type: alertConstants.ERROR, payload: error};}
}