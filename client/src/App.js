import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { history } from './__helpers';
import './css/App.css';
import { PrivateRoute } from './__helpers';
import { LoginPage } from '__components//LoginPage';
import { SignUp } from '__components//LoginPage/SignUp';
import { Youbefit } from '__components/HomePage/MeetingRoom/Youbefit';

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
