import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { connect } from 'react-redux';

import { roomService } from '__services/room.service';

class BookSlot extends React.Component {
    state = {
        endTime: new Date(),
        startTime: new Date(),
    };

    componentWillMount = () =>{    
        if(this.props.room.startTime !== undefined && this.props.room.endTime !== undefined){
            // console.log("Redux store has startTime and endTime");
            this.setState({
                ...this.state,
                startTime:this.props.room.startTime,
                endTime: this.props.room.endTime
            });
            this.props.RecordStartTime(this.props.room.startTime);
            this.props.RecordEndTime(this.props.room.endTime);
        }
        else {
            const date_val = new Date();
            this.recordStartTime(date_val);
            this.recordEndTime(date_val);
        }
    }
    recordStartTime = (date) =>{        
        this.setState({...this.state, startTime: date});
        if(this.state.endTime < date) {
            this.setState({
                    startTime: date,
                    endTime: date
            });            
            this.props.RecordStartTime(date);
            this.props.RecordEndTime(date);
        }
        else {
            this.props.RecordStartTime(date);
        }
    }

    recordEndTime = (date) =>{
        this.setState({ 
            ...this.state,
            endTime: date });

        if(date < this.state.startTime) {
            this.setState({
                    startTime: date,
                    endTime: date
            });
            this.props.RecordStartTime(date);
            this.props.RecordEndTime(date);
        }
        else {
            this.props.RecordEndTime(date);
        }
    }

    render() {
        return (
        <div id='datetimepickerelement'>
            Start Time: <DateTimePicker id='starttime'
            onChange={this.recordStartTime}
            value={this.state.startTime}
            />
            End Time: <span id='endtime'><DateTimePicker
            onChange={this.recordEndTime}
            value={this.state.endTime}
            /></span>
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


const connectedBookSlot = connect(mapStateToProps, roomService) (BookSlot);
export { connectedBookSlot as BookSlot };