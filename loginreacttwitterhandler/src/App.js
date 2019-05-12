import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing'
import Twitter from './components/TwitterHandler'
import Messenger from './components/Messenger';

import Page404 from './components/Page404';

import './App.css';

class App extends Component {

  render () {
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/twitter" component={Twitter} />
          <Route exact path="/messenger" component={Messenger} />

          <Route component={Page404}/>
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
