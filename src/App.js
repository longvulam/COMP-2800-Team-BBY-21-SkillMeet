// import './App.css';
import React, {useState, useEffect} from "react";
import Navbar from './Navbar';
import Home from './Home';

function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }

  const handleLogin = () => {
    clearErrors();
    console.log("A user is logged in!");

    // fire
    //   .with()
    //   .signInWithEmailAndPassword(email, password)
    //   .catch((err) => {
    //     switch (err.code){
    //       case "auth/invalid-email":
    //       case "auth/user-disabled":
    //       case "auth/user-not-found":
    //         setEmailError(err.message);
    //         break;
    //       case "auth/wrong-password":
    //         setPasswordError(err.message);
    //         break;
    //     }
    //   });
  }

  const handleSignup = () => {
    clearErrors();
    console.log("A user is signed up!");

    // fire
    //   .with()
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch((err) => {
    //     switch (err.code){
    //       case "auth/email-already-in-use":
    //       case "auth/invalid-email":
    //         setEmailError(err.message);
    //         break;
    //       case "auth/weak-password":
    //         setPasswordError(err.message);
    //         break;
    //     }
    //   });
  }

  const handleLogout = () => {
    console.log("USer wants to Log out");
    // fire.auth().signOut();
  }

  // const authListener = () => {
  //   fire.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       ("");
  //     }
  //   });
  // }

  // useEffect(() => {
  //   authListener()
  // }, []) ;

  return (
    <div className="App">
      <Navbar />
        <Home
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
          hasAccount = {hasAccount}
          setHasAccount = {setHasAccount}
          emailError = {emailError}
          passwordError = {passwordError}
        />

         {/* <ProfileForm handleLogout = {handleLogout} /> */}
      </div>
  );
}

export default App;
