import React, {useState, useEffect} from "react";
import Home from './Home';
import BottomNavBar from './classes/BottomNavbar';
import Profile from './classes/Profile';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <div className = "content">
          <Switch>
            <Route exact path = "/">
              <Home />
            </Route>
            <Route path = "/profile">
                <Profile/>
            </Route>
          </Switch>
        <BottomNavBar />
        </div>
      </div>
    </Router>
  );
}

export default App;
