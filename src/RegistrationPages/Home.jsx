import React, { useState, useEffect } from "react";
import firebase from '../firebase';
import { db } from '../firebase';
import Login from './Login';
import Navbar from '../Navbar';
import '../../src/LandingPageStyles/Landing_Page_Styles.css';

import { useHistory } from "react-router-dom";

const Home = () => {
  const appName = "SkillMeet";
  const appDescription = "Discover people interested in the same skills as yours, connect and make friends with them, find companions to practice skills together, join groups to expand your friendship circle.";
  const appHook = "Building Connections Based On Skills";

  const history = useHistory();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputsLogin = () => {
    setEmail("");
    setPassword("");
  }


  const clearInputsSignUp = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setFirstNameError("");
    setLastNameError("");
  }

  const handleLogin = () => {
    clearErrors();
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(value => history.push("/profile"))
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleSignup = () => {
    clearErrors();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        email: email,
        displayName: firstName + " " + lastName
      })
    }).then(() => {
      history.push("/create");
    }).catch((error) => {
      if (firstName.trim().length == 0) {
        setFirstNameError("PLease fill your first name.");
      }
      if (lastName.trim().length == 0) {
        setLastNameError("PLease fill your last name.");
      }

      switch (error.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(error.message);
          break;
        case "auth/weak-password":
          setPasswordError(error.message);
          break;
      }
    })
  };

  const handleLogout = () => {

    var promise = firebase.auth().signOut();
    promise.then(function () {
      window.location.href = '/';
    });
  }

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputsSignUp();
        setUser(user);
      } else {
        setUser("");
      }
    });
  }

  useEffect(() => {
    authListener()
  }, []);


  return (

    <div className="landingPage">
      <Navbar 
        handleLogout={handleLogout}
      />
      <div className="landing-page-background">

        <div className="white-background">
          <div className="app-name">{appName}</div>
          <div className="app-hook">{appHook}</div>
          <div className="app-description">{appDescription}</div>
        </div>
        <Login
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          clearInputsLogin={clearInputsLogin}
          clearInputsSignUp={clearInputsSignUp}
          clearErrors={clearErrors}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
        />

      </div>
    </div>
  );
}

export default Home;