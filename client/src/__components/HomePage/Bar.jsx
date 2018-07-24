import React from 'react';
import '../../css/bar.css';


export class Bar extends React.Component {
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
        return(
            <div className="bar">
                <ul>
                    <div className='barlist'> 
                        <li><label className='welcome'>Welcome {' '+user.username}</label></li>
                        <li className='barlogout'>
                            <button className='glyphicon glyphicon-log-out' data-toggle="tooltip" data-placement="top" title="Logout" onClick={this.logout}></button>
                        </li>
                    </div>
                </ul>
            </div>
            // <div>
            //     <ul>
            //         <li><a href="#default.asp">Home</a></li>
            //         <li><a href="#news.asp">News</a></li>
            //         <li><a href="#contact.asp">Contact</a></li>
            //         <li><a href="#about.asp">About</a></li>
            //     </ul>
            // </div>
        );
    }
}