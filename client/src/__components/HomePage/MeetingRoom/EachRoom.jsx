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
        
        // this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        // this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.bookRoom = this.bookRoom.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
    }

    // componentWillReceiveProps(prevProps) {
    //     if(this.props.room.selected_room !== undefined) {
    //         const id = this.props.room.selected_room.meetingRoomId;
    //         if(prevProps.room.selected_room.meetingRoomId !== id) { 
    //             this.props.GetBooking(id);
    //         }           
    //     }
    // }

    // componentDidUpdate(prevProps) { 
        // setTimeout(() => {            
        //     console.log("PrevProps: ", prevProps);
        // }, 1000);
        // if(this.props.room.bookings !== prevProps.room.bookings) {
        //     const id = this.props.room.selected_room.meetingRoomId;
        //     setTimeout(() => {            
        //         this.props.GetBooking(id);
        //     }, 1000);
        // }
    // }

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
        const { room, alert } = this.props;
        const cur_user = JSON.parse(localStorage.getItem('user'));
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
                            {
                                alert.type && alert.message &&
                                <div className={alert.type}> {alert.message} </div>
                            } 
                            {room.bookings !== undefined &&
                            room.bookings.sort((a,b) => a.startTime < b.startTime)
                            .map((booking, index) =>
                                <div key={booking.bookingId}>                                   
                                    <li> 
                                    <div className='booking'>  
                                        <ul>
                                        <li><b>{booking.userName}</b>  </li>
                                        <li> <b>{<Time  time = {booking.startTime} type='date'/>}</b>  </li>
                                        <li> <b><Time  time = {booking.startTime} type='time'/></b>  </li>
                                        <li> <b>to</b> </li>
                                        <li> <b><Time  time = {booking.endTime} type='time'/></b> </li>
                                        <li> 
                                            <button disabled = {cur_user.userid === booking.userId ? false: true} onClick={this.cancelBooking.bind(this, index)} 
                                            data-toggle="tooltip" data-placement="top" title={cur_user.userid === booking.userId ? "click to cancel booking": 'Not authorized to cancel'}>
                                                <b className='glyphicon glyphicon-trash'></b> 
                                             </button>
                                        </li>  
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
    const { room, alert } = state;
    return {
        room,
        alert
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...roomService}, dispatch);
}
const connectedEachRoom = connect(mapStateToProps, mapDispatchToProps) (EachRoom);
export { connectedEachRoom as EachRoom };