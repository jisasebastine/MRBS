import React from 'react';
import { RoomsPage } from './RoomsPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { EachRoom } from './EachRoom';
import { Bar } from '../Bar';

import '../../../css';
import { alertService } from '../../../__services';

class Youbefit extends React.Component {
    constructor() {
        super();
        this.closeDiv = this.closeDiv.bind(this);
    }

    closeDiv() {
        this.props.LoadEachRoom(false);
    }

    render() {
        return (
        <div>
            <div>
            <Bar />
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...alertService}, dispatch);
}

const connectedYoubefit = connect(mapStateToProps, mapDispatchToProps)(Youbefit);
export { connectedYoubefit as Youbefit }; 