import React from 'react';
import { RoomsPage } from './RoomsPage';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { EachRoom } from './EachRoom';
import { Bar } from '../Bar';

import '../../../css';
import { alertService } from '../../../__services';
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


const connectedYoubefit = compose(
        connect(mapStateToProps, alertService),
        requireAuth
    )(Youbefit);

export { connectedYoubefit as Youbefit }; 