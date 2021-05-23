import React from "react";
import Home from './RegistrationPages/Home';
import BottomNavBar from './BottomNavbar';
import Profile from './ProfilePage/Profile';
import Friends from './Friends/Friends';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from "./AboutUs/aboutUsComponent";
// import Search from "./SearchPage/searchComponent";
import EditProfilePage from './EditProfile/EditProfilePage';
import Search from "./SearchPage/SearchPage";
import FriendRequests from './Friends/FriendRequests';
import FriendsPageNav from './Friends/friendsComponents/friendsPageNav'
import ChatRoomsList from "./Chat/ChatRoomsList";
import ChatRoom from "./Chat/ChatRoom";

function App() {

  return (
      <div className="App">
        <div className = "content" style={styles.content}>
          <Router>
            <Switch>
              <Route exact path = "/">
                  <Home />
              </Route>
              <Route path = "/aboutUs">
                  <AboutUs/>
              </Route>
              <Route path={["/profile/:uid", "/profile"]}>
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
              <Route path = '/editProfile'>
                  <EditProfilePage/>
              </Route>
              <Route path = '/friendRequests'>
                  <FriendsPageNav/>
                  <FriendRequests/>
                  <BottomNavBar />
              </Route>
              <Route path = '/chatRooms'>
                  <ChatRoomsList />
              </Route>
              <Route path = '/chatRoom/:chatRoomId'>
                  <ChatRoom/>
              </Route>
              </Switch>
          </Router>
        </div>
      </div>
  );
}

const styles = {
    content: {
        height: '100vh',
    }
}

export default App;
