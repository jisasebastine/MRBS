import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/login.css';

export class SendResetEmail extends React.Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault(); 
    }

    render() {
        return (
            <div className='bodyBG'>
                <div className="row">
                    <div className="col-sm-4">  
                    <form onSubmit ={this.handleSubmit}> 
                        <div id="logoContainer">      
                            <div className="form-group">
                                <input placeholder="Email/Username" type="text" className="form-control" name="username" onChange={this.handleChange} autoFocus/>                                
                            </div>
                            <button onClick={this.handleSubmit} className="form-control btn btn-primary active">                                
                                Send Email
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
