import Axios from 'axios';
import { api_url } from '../_config';

export const userService = {
    Login,
    GoogleSignUp,
    SignUp
};

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
    return Axios.post(login_url, data, config);
}

function GoogleSignUp(profile) {
    let signup_url = api_url+"user/signup";
    let data = {
        username: profile.name,
        password: profile.googleId,
        email: profile.email
    };
    let config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    };
    return Axios.post(signup_url, data, config);
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
    return Axios.post(signup_url, data, config);
}