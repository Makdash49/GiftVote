import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import Login from 'Login';
import firebase from 'app/firebase/';

var Main = require('Main');
import Amazon from 'Amazon';



var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next()
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if(firebase.auth().currentUser) {
    replace('/amazon');
  }
  next()
};

export default (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="amazon" component={Amazon} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
