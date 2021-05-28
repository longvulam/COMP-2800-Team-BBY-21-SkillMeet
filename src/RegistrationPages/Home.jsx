import { useState, useEffect } from "react";
import firebase from '../firebase';
import Login from './Login';
import PublicNavbar from '../common/PublicNavbar';
import { useHistory } from "react-router-dom";

import '../../src/LandingPageStyles/Landing_Page_Styles.css';

export default function Home(props) {

    const appName = "SkillMeet";
    const appHook = "Building Connections Based On Skills";
    const history = useHistory();
    const [user, setUser] = useState('');

    /** Checks the authentication status of the user. */
    const authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser("");
            }
        });
    }

    /** 
     * Runs the authListener function after rendering components 
     * and then at every update on the page.
     * Redirects user to /profile path if the user is logged in.
     */
    useEffect(() => {
        authListener()
        if (user) {
            history.push('/profile');
        }
    }, []);

    return (
        <div style={{ margin: '-.5em' }} className="landingPage">
            <PublicNavbar />
            <div className="landing-page-background">

                <div className="white-background">
                    <div className="app-name">{appName}</div>
                    <div className="app-hook">{appHook}</div>
                </div>

                <Login />
            </div>
        </div>
    );
}
