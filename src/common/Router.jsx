import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import BottomNavBar from './BottomNavbar';
import PublicNavbar from './PublicNavbar';
import Home from '../RegistrationPages/Home';
import Profile from '../ProfilePage/Profile';
import Friends from '../Friends/Friends';
import Create from '../RegistrationPages/Create';
import AboutUs from "../AboutUs/AboutUs";
import EditProfilePage from '../EditProfile/EditProfilePage';
import Search from "../SearchPage/SearchPage";
import FriendRequests from '../Friends/FriendRequests';
import FriendsPageNav from '../Friends/friendsComponents/FriendsPageNav';
import ChatRoomsList from "../Chat/ChatRoomsList";
import ChatRoom from "../Chat/ChatRoom";
<<<<<<< HEAD
import { ProtectedRoute } from "./ProtectedRoute";
import Social from '../SocialMedia/Socials';
import Navbar from '../Navbar';
import { PublicRoute } from "./PublicRoute";
=======
import Twitter from '../SocialMedia/TwitterPage';
import Social from '../SocialMedia/Socials';
>>>>>>> b6a1055a9c4ee9631ed59145f92d456591f3a2de


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
                <PublicNavbar />
                <Social />
            </ProtectedRoute>

            <ProtectedRoute path="/twitter">
                <PublicNavbar />
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

