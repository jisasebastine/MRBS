import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from './__helpers';
import './css/App.css';
import { PrivateRoute } from './__helpers';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { SendResetEmail } from './LoginPage/SendResetEmail';
import { SignUp } from './LoginPage/SignUp';

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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
