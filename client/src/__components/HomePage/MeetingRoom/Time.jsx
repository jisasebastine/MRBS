import React from 'react';
import { clearTimeout } from 'timers';

export class Time extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            time_val: new Date(props.time).toLocaleTimeString(),
            date_val: new Date(props.time).toLocaleDateString()
        }
        // this.componentWillMount = this.componentWillMount.bind(this);
    }

    // componentWillMount() {
    //     let time = this.props.time;
    //     console.log("Time mounting: ", this.props.time);
    //     var localTime = new Date(time);
    //     var offset = new Date().getTimezoneOffset();
    //     localTime.setMinutes(localTime.getMinutes() - offset);
    //     this.update(localTime);  
    //     console.log("New time: ", this.state.date_val, this.state.time_val); 
    // }

    // update(localTime) {
    //     this.setState({
    //         'time_val': localTime.toLocaleTimeString(),
    //         'date_val': localTime.toLocaleDateString()
    //     }); 
        
    // }

    render(){
        if(this.props.time !== undefined){
            if(this.props.type === 'time') {
                return(
                    <span>
                        {this.state.time_val}
                    </span>
                );
            }
            else {
                return(
                    <span>
                        {this.state.date_val}
                    </span>
                );
            }
        }
    }
}