import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../css/login.css';
import { GoogleLoginPage } from './GoogleLoginPage';
import { userService } from '../../__services';


class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.appLogin = this.appLogin.bind(this);
    }
    
    appLogin(e) {
        e.preventDefault();  
        let username = document.getElementsByName('username')[0].value;
        let password = document.getElementsByName('password')[0].value;
        if(username !== '' && password !== '') {
            //sign up the user
            this.setState({            
                submitted: true,
                username: username,
                password: password
            });
            let credentials = {
                username: username,
                password: password
            };      
        this.props.Login(credentials);
        }
    }

    render() {
        console.log(this.props);
        const { alert } = this.props;
        return (
            <div className='bodyBG'>
                <div className="row">
                    <div className="col-sm-4"> 
                    {
                        alert.type && alert.message &&
                        <div className={alert.type}> {alert.message} </div>
                    } 
                    <form> 
                        <div id="logoContainer"> 
                            <div className="form-group">
                                <input placeholder="Email/Username" type="text" className="form-control" name="username" autoFocus/>   
                                {this.state.submitted && this.state.username ==='' &&
                                    <div className="help-block">Please enter the username</div>
                                }                              
                            </div>
                            <div className='form-group'>
                                <input placeholder="Password" type="password" className="form-control" name="password" />  
                                {this.state.submitted && this.state.password ==='' &&
                                    <div className="help-block">Please enter a password</div>
                                }                               
                            </div>
                            <div className='form-group'>
                                <button onClick={this.appLogin} className="form-control btn btn-primary active">                                
                                    Login
                                </button> 
                            </div>                               
                        </div>                        
                    </form>  
                            <div>
                                <GoogleLoginPage />
                            </div>
                            <Link to="/login/signup" className='otheraction'>Sign Up</Link> 
                    </div>
                    </div>
                </div>
        );
    }
}
function mapStateToProps(state) {
    const { alert, room, authentication } = state;
    return {
        room,
        alert,
        authentication
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({...userService}, dispatch);
}
const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 