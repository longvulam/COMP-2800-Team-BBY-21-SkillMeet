import React from "react";
import Home from '../RegistrationPages/Home';
import BottomNavBar from '../BottomNavbar';
import Profile from '../ProfilePage/Profile';
import Friends from '../Friends/Friends';
import Create from '../RegistrationPages/Create';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AboutUs from "../AboutUs/aboutUs2.0Component";
import EditProfilePage from '../EditProfile/EditProfilePage';
import Search from "../SearchPage/SearchPage";
import FriendRequests from '../Friends/FriendRequests';
import FriendsPageNav from '../Friends/friendsComponents/friendsPageNav';
import ChatRoomsList from "../Chat/ChatRoomsList";
import ChatRoom from "../Chat/ChatRoom";
import { ProtectedRoute } from "./ProtectedRoute";
import Social from '../SocialMedia/Socials';
import Twitter from '../SocialMedia/TwitterPage';
import Navbar from '../Navbar';
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

            <PublicRoute path="/aboutUs">
                <AboutUs />
            </PublicRoute>

            <ProtectedRoute path="/facebook">
                <Navbar />
                <Social />
            </ProtectedRoute>

            <ProtectedRoute path="/twitter">
                <Navbar />
                <Twitter />
            </ProtectedRoute>

            <ProtectedRoute exact path="/create">
                <Create />
            </ProtectedRoute>

            <ProtectedRoute exact path='/editProfile'>
                <EditProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path='/chatRoom/:chatRoomId'>
                <ChatRoom />
            </ProtectedRoute>

            <ProtectedRoute path={bottomNavbarRoutes} id="bottomNavbarPages">

                <Route path={["/profile/:uid", "/profile"]}>
                    <Profile />
                </Route>
                <Route exact path="/friends">
                    <Friends />
                </Route>
                <Route exact path="/search">
                    <Search />
                </Route>
                <Route exact path='/friendRequests'>
                    <FriendsPageNav />
                    <FriendRequests />
                </Route>
                <Route exact path='/chatRooms'>
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

