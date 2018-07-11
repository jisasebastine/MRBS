import React from 'react';
import { GoogleLogin } from 'react-google-login';

import '../css/google.css';
import * as googleLogo from '../css/svg/google_logo.svg';
import { userService } from '../_services';

export class GoogleLoginPage extends React.Component {
    constructor() {
        super();
 
        this.responseGoogle = this.responseGoogle.bind(this);   
    }

    async responseGoogle(response) {
        //await on signup promise
        let user = await userService.GoogleSignUp(response.profileObj);

        let new_user = null;
        if(user.data !== undefined) {
            new_user = {
            ...response.profileObj,
            'userId': user.data.userid
            };
        }
        localStorage.setItem('user', JSON.stringify(new_user));
        window.location.href = '/';
    }
    

    render() {
        return (            
            <div>
                <div className='abcRioButtonBlue'>
                <div className='abcRioButtonContents'>                        
                    <div className='googleLogo'><img src = { googleLogo } alt="sorry"/></div>
                    <GoogleLogin className='googleButton' 
                        clientId="721651622664-51vqgt9jtq7ef8nc5hjr653ascd4ld7b.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
                    </div>
                </div>
            </div>
        );
    }
}
