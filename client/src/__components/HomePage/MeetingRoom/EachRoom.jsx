import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';

import '../../../css/booking.css';
import { roomService } from '../../../__services';
import { BookSlot } from './BookSlot';
import { Time } from './Time';

class EachRoom extends React.Component {
    constructor() {
        super();
        
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.bookRoom = this.bookRoom.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
    }

    componentDidUpdate() {
        const id = this.props.room.selected_room.meetingRoomId;
        setTimeout(() => { 
            this.props.GetBooking(id);
        }, 1000);
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
        <div className="container">
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
                        <div className='container'>
                        <ul className="bookinglist">
                            {room.bookings !== undefined &&
                            room.bookings.sort((a,b) => a.startTime < b.startTime)
                            .map((booking, index) =>
                                <div key={index}>                                   
                                    <li> 
                                    <div className='booking'>  
                                        <ul>
                                        <li><b>{booking.userName}</b>  </li>
                                        <li> <b>{<Time  time = {booking.startTime} type='date'/>}</b>  </li>
                                        <li> <b><Time  time = {booking.startTime} type='time'/></b>  </li>
                                        <li> <b>to</b> </li>
                                        <li> <b><Time  time = {booking.endTime} type='time'/></b> </li>
                                        <li> <button onClick={this.cancelBooking.bind(this, index)} data-toggle="tooltip" data-placement="top" title="click to cancel booking">
                                        <b className='glyphicon glyphicon-trash'></b> 
                                        </button> </li>  
                                        </ul> 
                                    </div>     
                                    </li>                        
                                </div> 
                            )}
                        </ul>
                        </div>
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