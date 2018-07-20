import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/login.css';
import { GoogleLoginPage } from './GoogleLoginPage';
import { userService } from '../../__services';


export class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            alert : {
                type: '',
                message: ''
            }
        };

        this.appLogin = this.appLogin.bind(this);
    }
    
    appLogin(e) {
        e.preventDefault(); 
        let username = document.getElementsByName('username')[0].value;
        let password = document.getElementsByName('password')[0].value;
        this.setState({            
            submitted: true,
            username: username,
            password: password,
            alert : {
                type: '',
                message: ''
            }
        });
        if(username !== '' && password !== '') {
            //sign up the user
            let credentials = {
                username: username,
                password: password
            };
            userService.Login(credentials)
            .then(
                user => {
                    if(user.data !== "") {
                        localStorage.setItem('user', JSON.stringify(user.data));
                        window.location.href = '/';
                    }
                    else {
                        this.setState(
                            {
                                alert: {
                                    type: "alert alert-danger",
                                    message: "Please make sure you entered a valid username and the correct password"
                                }
                            });
                    }
                },
                error => {
                    console.log(error);
                    this.setState(
                        {
                            alert: {
                                type: "alert alert-danger",
                                message: "Sorry something went wrong. Please try again later."
                            }
                        });
                }
            );
        }
    }

    render() {
        return (
            <div className='bodyBG'>
                <div className="row">
                    <div className="col-sm-4">  
                    <form> 
                        <div id="logoContainer"> 
                            <div  className={this.state.alert.type}>{this.state.alert.message}</div>    

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
