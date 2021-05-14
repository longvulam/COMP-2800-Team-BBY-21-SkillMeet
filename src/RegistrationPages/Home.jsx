import React, {useState, useEffect} from "react";
import firebase from '../firebase';
import Login from './Login';
import Create from './Create';
import Navbar from '../Navbar';

const Home = () => {

    const appName = "SkillMeet";
    const appDescription = "Discover people interested in the same skills as yours, connect and make friends with them, find companions to practice skills together, join groups to expand your friendship circle.";
    const appHook = "Building Connections Based On Skills";

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
    }
  
    const handleLogin = () => {
      clearErrors();
      console.log("A user is logged in!");
  
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code){
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
      console.log("A user is signed up!");
  
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((err) => {
          switch (err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
          }
        });
    };
  
    const handleLogout = () => {
      firebase.auth().signOut();
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
    }, []) ;


    return ( 
      <div className = "landingPage">
          <Navbar handleLogout = {handleLogout} />

          {user ? (
            <Create />
          ): (
            <div className = "landing-page-background">

              <div className="white-background">
                <div className = "app-name">{appName}</div>
                <div className = "app-hook">{appHook}</div>
                <div className = "app-description">{appDescription}</div>
              </div>
            <Login
                email = {email}
                setEmail = {setEmail} 
                firstName = {firstName}
                setFirstName = {setFirstName}
                lastName = {lastName}
                setLastName = {setLastName}
                password = {password} 
                setPassword = {setPassword} 
                handleLogin = {handleLogin} 
                handleSignup = {handleSignup}
                clearInputsLogin = {clearInputsLogin}
                clearInputsSignUp = {clearInputsSignUp}
                clearErrors = {clearErrors}
                hasAccount = {hasAccount}
                setHasAccount = {setHasAccount}
                emailError = {emailError}
                passwordError = {passwordError}
            />

            </div>
          )}
        </div>
     );
}
 
export default Home;