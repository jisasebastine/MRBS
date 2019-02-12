import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import 'css/login.css';
import { userService } from '__services';

class SignUp extends React.Component {    
    state = {
        username: '',
        password: '',
        email:'',
        submitted: false
    };

    handleSubmit = (e) => {
        e.preventDefault(); 
        let username = document.getElementsByName('username')[0].value;
        let password = document.getElementsByName('password')[0].value;
        let email = document.getElementsByName('email')[0].value;
        if(username !== '' && password !== '' && email !== '') {
            //sign up the user
            this.setState({            
                submitted: true,
                username: username,
                password: password
            });
            let credentials = {
                username: username,
                password: password,
                email: email
            };
            this.props.SignUp(credentials, () => {
                console.log('callback called');
                this.props.history.push('/');
            });
        }
    }

    render() {
        const { alert } = this.props;
        return (
            <div className='bodyBG'>
                <div className="row">
                    <div className="col-sm-4">                      
                    {
                        alert.type && alert.message &&
                        <div className={alert.type}> {alert.message} </div>
                    }
                    <form onSubmit ={this.handleSubmit}> 
                        <div id="logoContainer">    
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
function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        authentication,
        alert
    };
}


const connectedSignUp = connect(mapStateToProps, userService)(SignUp);
export { connectedSignUp as SignUp }; 