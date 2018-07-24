import React from 'react';

export class Time extends React.Component {

    constructor(){
        super();
        this.state = {
            time_val: '',
            date_val:''
        }
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.update = this.update.bind(this);
    }

    componentWillMount() {
        this.update(this.props.time);  
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.update(this.props.time);
        }, 7000);
    }

    update(time) {
        var localTime = new Date(time);
        var offset = new Date().getTimezoneOffset();
        localTime.setMinutes(localTime.getMinutes() - offset);
        this.setState({
            'time_val': localTime.toLocaleString().split(',')[1],
            'date_val': localTime.toLocaleDateString()
        });    
    }

    render(){
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