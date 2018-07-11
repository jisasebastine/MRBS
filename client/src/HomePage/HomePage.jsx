import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { userService } from '../_services';

export class HomePage extends React.Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('user');
        window.location.href = '/';
    }
    render() {
        const profile = JSON.parse(localStorage.getItem('user'));
        return (
            <div>                
                <h1> Welcome { profile.username } </h1>
                <img src={ profile.imageUrl } alt="sorry" />
                <div>{ profile.email }</div>
                <div style={{'visibility': 'hidden'}}>
                 <GoogleLogin
                                clientId="721651622664-51vqgt9jtq7ef8nc5hjr653ascd4ld7b.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={ this.responseGoogle }
                                onFailure={ this.responseGoogle }
                            />
                </div>
                <div>
                    <GoogleLogout clientId="721651622664-51vqgt9jtq7ef8nc5hjr653ascd4ld7b.apps.googleusercontent.com" buttonText="Logout" onLogoutSuccess={this.logout}>
                    </GoogleLogout>
                </div>
            </div>
        );
    }
}
