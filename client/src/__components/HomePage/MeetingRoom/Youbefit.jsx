import React from 'react';
import { RoomsPage } from '__components/HomePage/MeetingRoom/RoomsPage';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { EachRoom } from '__components/HomePage/MeetingRoom/EachRoom';
import { Bar } from '__components/HomePage/Bar';

import 'css';
import { alertService } from '__services';
import requireAuth from '__helpers/requireAuth';

class Youbefit extends React.Component {
    closeDiv = () => {
        this.props.LoadEachRoom(false);
    }

    render() {
        return (
        <div>
            <div>
            <Bar {...this.props}/>
            </div>
            <div className='roomtoroom'>
            <div className='leftpanel'><RoomsPage /></div>
            {this.props.alert.loadeachroom && 
                <div className='rightpanel'> 
                <button className='closebutton' onClick={this.closeDiv}><div className='glyphicon glyphicon-remove'></div></button>
                    <EachRoom />
                </div>
            }
            </div>
        </div>
    );
    }

}
function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

// compose multiple Higher Order Components
const connectedYoubefit = compose(
        connect(mapStateToProps, alertService),
        requireAuth
    )(Youbefit);

export { connectedYoubefit as Youbefit }; 