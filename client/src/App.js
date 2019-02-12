import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { history } from './__helpers';
import './css/App.css';
import { PrivateRoute } from './__helpers';
import { LoginPage } from './__components//LoginPage';
import { HomePage } from './__components/HomePage';
import { SendResetEmail } from './__components/LoginPage/SendResetEmail';
import { SignUp } from './__components//LoginPage/SignUp';
import { RoomsPage } from './__components/HomePage/MeetingRoom/RoomsPage'; 
import { EachRoom } from './__components/HomePage/MeetingRoom/EachRoom'; 
import { Youbefit } from './__components/HomePage/MeetingRoom/Youbefit';
import { Bar } from './__components/HomePage/Bar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>                
              <Route exact path="/login/signup" component={ SignUp } />        
              <Route exact path="/login" component={ LoginPage } />    
              <Route exact path="/" component={ Youbefit } /> 
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
