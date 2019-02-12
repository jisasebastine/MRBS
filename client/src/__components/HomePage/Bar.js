import React from 'react';
import 'css/bar.css';


export class Bar extends React.Component {   
    logout = () =>{
        localStorage.removeItem('user');
        this.props.history.push('/');
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return(
            <div className="bar">
                <ul>
                    <div className='barlist'> 
                        <li><label className='welcome'>Welcome {` ${user? user.username: ''}`}</label></li>
                        <li className='barlogout'>
                            <button className='glyphicon glyphicon-log-out' data-toggle="tooltip" data-placement="top" title="Logout" onClick={this.logout}></button>
                        </li>
                    </div>
                </ul>
            </div>
        );
    }
}

