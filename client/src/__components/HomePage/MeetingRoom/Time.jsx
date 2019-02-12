import React from 'react';

export class Time extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            time_val: new Date(props.time).toLocaleTimeString(),
            date_val: new Date(props.time).toLocaleDateString()
        }
        
    }

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