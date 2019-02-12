import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../css/google.css';
import * as googleLogo from '../../css/svg/google_logo.svg';
import { userService } from '../../__services';

class GoogleLoginPage extends React.Component {
    constructor() {
        super();
 
        this.responseGoogle = this.responseGoogle.bind(this);   
    }

    responseGoogle(response) {
        let user = {'password': response.profileObj.googleId, 'username': response.profileObj.name, 'email': response.profileObj.email};
        this.props.SignUp(user, () => { 
            console.log("check history: ", this.props);
            this.props.history.push('/');
        });
        // this.props.Login(user);
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

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({...userService}, dispatch);
// }
const connectedGoogleLoginPage = connect(mapStateToProps, userService)(GoogleLoginPage);
export { connectedGoogleLoginPage as GoogleLoginPage }; 
