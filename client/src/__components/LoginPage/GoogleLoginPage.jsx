import React from 'react';
import { GoogleLogin } from 'react-google-login';

import '../../css/google.css';
import * as googleLogo from '../../css/svg/google_logo.svg';
import { userService } from '../../__services';

export class GoogleLoginPage extends React.Component {
    constructor() {
        super();
 
        this.responseGoogle = this.responseGoogle.bind(this);   
    }

    async responseGoogle(response) {
        let user = {'password': response.profileObj.googleId, 'username': response.profileObj.name, 'email': response.profileObj.email};
        //await on signup promise
        await userService.SignUp(user);
        let new_user = await userService.Login(user);
        localStorage.setItem('user', JSON.stringify(new_user.data));
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
