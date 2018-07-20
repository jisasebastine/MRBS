import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from './__helpers';
import './css/App.css';
import { PrivateRoute } from './__helpers';
import { LoginPage } from './__components//LoginPage';
import { HomePage } from './__components/HomePage';
import { SendResetEmail } from './__components/LoginPage/SendResetEmail';
import { SignUp } from './__components//LoginPage/SignUp';
import { RoomsPage } from './__components/HomePage/MeetingRoom/RoomsPage'; 
import { EachRoom } from './__components/HomePage/MeetingRoom/EachRoom'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>                
              <Route exact path="/login/sendresetemail" component={ SendResetEmail } />     
              <Route exact path="/login/signup" component={ SignUp } />        
              <Route exact path="/login" component={ LoginPage } />    
              <PrivateRoute exact path="/" component={ HomePage } /> 
              <PrivateRoute exact path="/rooms" component={ RoomsPage } />    
              <PrivateRoute exact path="/rooms/room" component={ EachRoom } />     
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
