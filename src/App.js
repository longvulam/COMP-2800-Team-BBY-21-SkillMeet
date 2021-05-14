import React, {useState, useEffect} from "react";
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (

    <Router>
      <div className="App">
        <div className = "content">
          <Home />
          {/* <Switch>
            <Route exact path = "/">
              <Home />
            </Route>
            <Route path = "/create">
              <Create />
            </Route>
          </Switch> */}


        </div>
      </div>
    </Router>
  );
}

export default App;
