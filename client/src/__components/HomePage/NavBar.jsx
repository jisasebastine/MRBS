import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import '../../css/rooms.css';

export class NavBar extends React.Component{
    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    logout() {
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        let username = "";
        if(user !== undefined) {
            username = "Hello "+ user.username;
        }
        return(
            <div className="navbar">
                <ul>
                    <li className='navelement'><span className='glyphicon'>{username}</span> </li>
                    <li className='navelement'><span className='glyphicon'></span> </li>
                    {/* <li className='navelement'><Link to='/'><span className='glyphicon glyphicon-home'>Home</span></Link></li>
                    <li className='navelement'><Link to='/'><span className='glyphicon glyphicon-phone-alt'>About</span></Link></li> */}
                    <li className='navelement'><Link to='/rooms'><span className='glyphicon glyphicon-blackboard'>Rooms</span></Link></li>
                    <li className='navelement'><Link to='/'><span className='glyphicon glyphicon-user'>Account</span></Link></li>
                    <li className='navelement'>
                        <Button className='glyphicon glyphicon-log-out' data-toggle="tooltip" data-placement="top" title="Logout" onClick={this.logout}>
                        </Button>
                    </li>
                </ul>
            </div>
        );
    }
}