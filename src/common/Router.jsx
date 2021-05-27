import React from "react";
import Home from '../RegistrationPages/Home';
import BottomNavBar from '../BottomNavbar';
import Profile from '../ProfilePage/Profile';
import Friends from '../Friends/Friends';
import Create from '../RegistrationPages/Create';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AboutUs from "../AboutUs/aboutUsComponent";
import EditProfilePage from '../EditProfile/EditProfilePage';
import Search from "../SearchPage/SearchPage";
import FriendRequests from '../Friends/FriendRequests';
import FriendsPageNav from '../Friends/friendsComponents/friendsPageNav';
import ChatRoomsList from "../Chat/ChatRoomsList";
import ChatRoom from "../Chat/ChatRoom";
import { ProtectedRoute } from "./ProtectedRoute";
import SocialMedia from '../socialMedia/twitterFeed';
import { PublicRoute } from "./PublicRoute";


const bottomNavbarRoutes = [
    "/profile/:uid",
    "/profile",
    "/friends",
    "/search",
    "/friendRequests",
    "/chatRooms",
];
export function Router() {

    return (<BrowserRouter>
        <Switch>

            <PublicRoute exact path="/">
                <Home />
            </PublicRoute>
            <PublicRoute path="/create">
                <Create />
            </PublicRoute>
            <PublicRoute path="/aboutUs">
                <AboutUs />
            </PublicRoute>

            <Route path="/socialmedia">
                <SocialMedia />
            </Route>

            <ProtectedRoute path='/editProfile'>
                <EditProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path='/chatRoom/:chatRoomId'>
                <ChatRoom />
            </ProtectedRoute>

            <ProtectedRoute path={bottomNavbarRoutes} id="bottomNavbarPages">

                <Route path={["/profile/:uid", "/profile"]}>
                    <Profile />
                </Route>
                <Route path="/friends">
                    <Friends />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
                <Route path='/friendRequests'>
                    <FriendsPageNav />
                    <FriendRequests />
                </Route>
                <Route path='/chatRooms'>
                    <ChatRoomsList />
                </Route>

                <BottomNavBar />


            </ProtectedRoute>

            <Route path="/*">
                <div>404</div>
            </Route>

        </Switch>
    </BrowserRouter>);
}

