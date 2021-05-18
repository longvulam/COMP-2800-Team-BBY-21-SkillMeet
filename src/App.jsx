import React from "react";
import Home from './RegistrationPages/Home';
import BottomNavBar from './classes/BottomNavbar';
import Profile from './classes/Profile';
import Friends from './classes/Friends';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from "./AboutUs/aboutUsComponent";
import AboutUs2 from "./AboutUs/aboutUs2.0Component";
import Search from "./SearchPage/searchComponent";

function App() {

  return (
    <Router>
      <div className="App">
        <div className = "content">
          <Switch>
            <Route exact path = "/">
                <Home />
            </Route>
            <Route path = "/aboutUs">
                <AboutUs/>
            </Route>
            <Route path = "/aboutUs2">
                <AboutUs2/>
            </Route>
            <Route path = "/profile">
                <Profile/>
                <BottomNavBar />
            </Route>
            <Route path = "/friends">
                <Friends/>
                <BottomNavBar />
            </Route>
            <Route path = "/search">
                <Search/>
                <BottomNavBar />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
