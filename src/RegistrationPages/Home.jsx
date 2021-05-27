import React, { useState, useEffect } from "react";
import firebase from '../firebase';
import Login from './Login';
import Navbar from '../Navbar';
import $ from 'jquery';
import { useHistory } from "react-router-dom";

import '../../src/LandingPageStyles/Landing_Page_Styles.css';

export default function Home(props) {

  const appName = "SkillMeet";
  const appDescription = "Discover people interested in the same skills as yours, connect and make friends with them, find companions to practice skills together, join groups to expand your friendship circle.";
  const appHook = "Building Connections Based On Skills";

  const history = useHistory();
  const [user, setUser] = useState('');

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  }

  useEffect(() => {
    authListener()
    if (user) {
      history.push('/profile');
    }
  }, []);



  return (

    <div style={{margin: '-.5em'}} className="landingPage">
      <Navbar />
      <div className="landing-page-background">

        <div className="white-background">
          <div className="app-name">{appName}</div>
          <div className="app-hook">{appHook}</div>
          {/* <div className="app-description">{appDescription}</div> */}
        </div>
        <Login />
      </div>
    </div>
  );
}
