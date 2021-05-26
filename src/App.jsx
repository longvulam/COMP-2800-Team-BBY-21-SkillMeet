import React from "react";
import Home from './RegistrationPages/Home';
import BottomNavBar from './BottomNavbar';
import Profile from './ProfilePage/Profile';
import Friends from './Friends/Friends';
import Create from './RegistrationPages/Create'

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from "./AboutUs/aboutUsComponent";
// import Search from "./SearchPage/searchComponent";
import EditProfilePage from './EditProfile/EditProfilePage';
import Search from "./SearchPage/SearchPage";
import FriendRequests from './Friends/FriendRequests';
import FriendsPageNav from './Friends/friendsComponents/friendsPageNav'
import ChatRoomsList from "./Chat/ChatRoomsList";
import ChatRoom from "./Chat/ChatRoom";
import Theme from './theme/Theme';
import { ThemeProvider } from '@material-ui/core/styles';
function App() {

  return (
      <div className="App">
        <div className = "content" style={styles.content}>
        <ThemeProvider theme={Theme}>
          <Router>
            <Switch>

              <Route exact path = "/">
                  <Home />
              </Route>
              <Route path = "/create">
                  <Create />
              </Route>
              <Route path = "/aboutUs">
                  <AboutUs/>
              </Route>

              <Route path='/editProfile'>
                  <EditProfilePage/>
              </Route>
              <Route path='/chatRoom/:chatRoomId'>
                  <ChatRoom/>
              </Route>

              <Route id="bottomNavbarPages" >

                <Route path={["/profile/:uid", "/profile"]}>
                    <Profile/>
                </Route>
                <Route path = "/friends">
                    <Friends/>
                </Route>
                <Route path = "/search">
                    <Search/>
                </Route>
                <Route path = '/friendRequests'>
                  <FriendsPageNav/>
                  <FriendRequests/>
                </Route>
                <Route path = '/chatRooms'>
                  <ChatRoomsList />
                </Route>
                
                <BottomNavBar />

              </Route>

            </Switch>
          </Router>
        </ThemeProvider>
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
