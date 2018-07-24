import React from 'react';
import { RoomsPage } from './RoomsPage';
import { EachRoom } from './EachRoom';

export class Youbefit extends React.Component {
    constructor() {
        super();
        this.state = {
            eachRoomVisible: false
        }
    }
    render() {
        return (
        <div>
            <RoomsPage />
            {this.state.eachRoomVisible && 
                <EachRoom />
            }
        </div>
    );
    }

}