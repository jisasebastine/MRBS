import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import '../../../css/rooms.css';
import { BookSlot } from './BookSlot';
import { roomService, alertService } from '__services';

class RoomsPage extends React.Component {
    state = {
        addroom: 'hidden',
        rooms: []
    };
    
    componentWillMount = () =>{
        this.props.GetAllRooms();
    }

    handleClick = () =>{
        if(this.state.addroom === 'hidden')
        {
            this.setState({
                addroom: 'visible'
            });
        }
        else {
            this.addRoom();
        }
    }

    addRoom = () =>{
        let roomName = document.getElementsByName('roomname')[0].value;
        this.props.AddRoom(roomName);
    }

    checkAvailability = () =>{    
        this.props.CheckAvailability(this.props.room.startTime, this.props.room.endTime);
    }

    loadEachRoom = (index, meetingRoomId, e) =>{
        // loads the component EachRoom
        console.log(index, meetingRoomId);
        this.props.GoToRoom(meetingRoomId);
        this.props.GetBooking(meetingRoomId);
        this.props.LoadEachRoom(true);
    }

    render() {
        const { alert, room } = this.props;
        const green = 'rgb(62, 161, 84)';
        return(
            <div>
                {
                    alert.room_alert_type && alert.room_alert_message &&
                    <div className={alert.room_alert_type}> {alert.room_alert_message} </div>
                }
                <form onSubmit={this.addRoom} >
                    <div><Button onClick={this.handleClick}> Add Room </Button></div>
                    <div style={{'visibility': this.state.addroom, 'padding':'5px'}}>
                        <input type='text' placeholder="Type in room name" name="roomname"/>
                    </div>
                </form>
                <div className='rooms'>
                    <h1>Meeting Rooms</h1>
                    <ul className="list">
                    {room.rooms.sort((a,b) => a.meetingRoomName > b.meetingRoomName)
                        .map((meetingRoom, index) =>
                            <button key={index} onClick={this.loadEachRoom.bind(this, index, meetingRoom.meetingRoomId)}>   
                                <li style={{'backgroundColor': meetingRoom.vacant? green: 'rgb(8, 76, 85)'}}>   
                                    <b>  {meetingRoom.meetingRoomName} </b>
                                </li>                                
                            </button> 
                    )}
                    </ul>
                </div>
                    <BookSlot useStartTime={new Date()} useEndTime={new Date()}/>
                    <Button onClick={this.checkAvailability}>Check Availability</Button> 
                <div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert, room } = state;
    return {
        room,
        alert
    };
}

const connectedRoomsPage = connect(mapStateToProps, {...roomService, ...alertService})(RoomsPage);
export { connectedRoomsPage as RoomsPage }; 