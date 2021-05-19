import React from "react";
import Home from './RegistrationPages/Home';
import BottomNavBar from './BottomNavbar';
import Profile from './ProfilePage/Profile';
import Friends from './Friends/Friends';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from "./AboutUs/aboutUsComponent";
import Search from "./SearchPage/searchComponent";
import EditProfilePage from './EditProfile/EditProfilePage';
import OtherUserProfile from './OtherUserProfile/OtherUserProfile'

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
            <Route path = "/profile">
                <Profile/>
                <BottomNavBar />
            </Route>
            <Route path = "/otherUserProfile">
                <OtherUserProfile/>
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
            <Route path = '/editProfile'>
                <EditProfilePage/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
