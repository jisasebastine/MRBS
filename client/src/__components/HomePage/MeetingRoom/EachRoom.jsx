import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';

import '../../../css/rooms.css';
import { NavBar } from '../NavBar';
import { roomService } from '../../../__services';
import { BookSlot } from './BookSlot';
import { Time } from './Time';

class EachRoom extends React.Component {
    constructor() {
        super();
        
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.bookRoom = this.bookRoom.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
    }

    componentWillMount() {
        if(window.location.search !== undefined)
        {            
            const { room } = this.props;
            const index = window.location.search.split('&')[0].split('=')[1];
            const id = window.location.search.split('&')[1].split('=')[1];
            this.props.GoToRoom(id);
            this.props.GetBooking(id);
        }
    }

    componentDidUpdate() {
        setTimeout(() => { 
            if(window.location.pathname.startsWith('/rooms/room'))   
            {
                if(window.location.search !== undefined)
                {
                    const id = window.location.search.split('&')[1].split('=')[1];   
                    //get bookings
                    this.props.GetBooking(id);
                }
            }
        }, 7000);
    }

    bookRoom() {                  
        const user = JSON.parse(localStorage.getItem('user'));
        const room = this.props.room.selected_room;
        // this.props.BookRoomExtension(11, 12, this.props.room.startTime, this.props.room.endTime);
    
        this.props.BookRoom(room.meetingRoomId, user.userid, this.props.room.startTime, this.props.room.endTime);
    }

    cancelBooking(index, e) {
        const booking = this.props.room.bookings[index];
        const room = this.props.room.selected_room;
        const user = JSON.parse(localStorage.getItem('user'));

        this.props.CancelBooking(room.meetingRoomId, user.userid, booking.startTime, booking.endTime);
    }

    render() {
    const { room } = this.props;
        return (
        <div>
            <NavBar />
            <div>
                { room.selected_room !== undefined &&
                    <div>
                        <h3> { room.selected_room.meetingRoomName } </h3>
                            <span>
                                <div>
                                    <Button onClick={this.bookRoom}>Book</Button>            
                                    <BookSlot />
                                </div>
                            </span>
                    {room.bookings !== undefined &&
                        room.bookings.sort((a,b) => a.startTime < b.startTime)
                        .map((booking, index) =>
                            <div key={index}>                                   
                                <li className='form-control'>   
                                <b>{booking.userName}</b> booked this room from <b><Time  time = {booking.startTime} /></b> to <b><Time  time = {booking.endTime} /></b>
                                <button onClick={this.cancelBooking.bind(this, index)} data-toggle="tooltip" data-placement="top" title="double click to cancel booking">
                                <b className='glyphicon glyphicon-trash'></b> 
                                </button>       
                                </li>                        
                            </div> 
                    )}
                    </div>
                }  
            </div>
        </div>
        );

    }
}

function mapStateToProps(state) {
    const { room } = state;
    return {
        room
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...roomService}, dispatch);
}
const connectedEachRoom = connect(mapStateToProps, mapDispatchToProps) (EachRoom);
export { connectedEachRoom as EachRoom };