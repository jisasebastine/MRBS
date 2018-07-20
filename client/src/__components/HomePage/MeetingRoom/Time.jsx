import React from 'react';

export class Time extends React.Component {

    constructor(){
        super();
        this.state = {
            time: ''
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
        this.setState({'time': localTime.toLocaleString()});    
    }

    render(){
        return(
            <span>
                {this.state.time}
            </span>
        );
    }
}