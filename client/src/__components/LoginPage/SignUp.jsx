import React from 'react';
import { Link } from 'react-router-dom';

import '../..//css/login.css';
import { userService } from '../../__services';

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            email:'',
            submitted: false,
            alert : {
                'type': '',
                'message': ''
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault(); 
        let username = document.getElementsByName('username')[0].value;
        let password = document.getElementsByName('password')[0].value;
        let email = document.getElementsByName('email')[0].value;
        this.setState({            
            submitted: true,
            username: username,
            password: password,
            email: email,
            alert : {
                type: '',
                message: ''
            }
        });
        if(username !== '' && password !== '') {
            //sign up the user
            let credentials = {
                username: username,
                password: password,
                email: email
            };
            let user = await userService.SignUp(credentials);
            if(user.data !== undefined) {
                if(user.data.message !== undefined) {
                    this.setState(
                        {
                            alert: {
                                type: "alert alert-danger",
                                message: user.data.message
                            }
                        });
                }
                else {
                    if(user.data !== "") {
                        localStorage.setItem('user', JSON.stringify(user.data.user));
                        window.location.href = '/';
                    }
                }
            }
            else {
                this.setState([
                    ...this.state, 
                    {alert: {
                        'type': "alert alert-danger",
                        'message': "Registration was not successful"
                        }
                }]);
            }
        }
    }

    render() {
        return (
            <div className='bodyBG'>
                <div className="row">
                    <div className="col-sm-4">  
                    <form onSubmit ={this.handleSubmit}> 
                        <div id="logoContainer"> 
                            <div  className={this.state.alert.type}>{this.state.alert.message}</div>
                                
                            <div className="form-group">
                                <input placeholder="Username" type="text" className="form-control" name="username" autoFocus/>   
                                {this.state.submitted && this.state.username ==='' &&
                                    <div className="help-block">Please enter your username</div>
                                }                             
                            </div>
                            <div className='form-group'>
                                <input placeholder="Password" type="password" className="form-control" name="password" />  
                                {this.state.submitted && this.state.password === '' &&
                                    <div className="help-block">Please enter a password</div>
                                }                              
                            </div>
                            <div className="form-group">
                                <input placeholder="Email (Optional)" type="text" className="form-control" name="email" />                                
                            </div>
                            <button onClick={this.handleSubmit} className="form-control btn btn-primary active">                                
                                Sign Up
                            </button>
                            <Link to="/" className='otheraction'>Back to Login</Link>                            
                        </div> 
                    </form>  
                    </div>
                    </div>
                </div>
        );
    }
}
