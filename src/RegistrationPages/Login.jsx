import '../../src/LandingPageStyles/Landing_Page_Styles.css';
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { db } from '../firebase';
import { useHistory } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


function Login() {

    const history = useHistory();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [firstNameError, setFirstNameError] = useState();
    const [lastNameError, setLastNameError] = useState();
    const [hasAccount, setHasAccount] = useState(false);


    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {

                var user = authResult.user;
                if (authResult.additionalUserInfo.isNewUser) { //if new user
                    db.collection("users").doc(user.uid).set({ //write to firestore
                        name: user.displayName, //"users" collection
                        email: user.email //with authenticated user's ID (user.uid)
                    }).then(function () {
                        console.log("New user added to firestore");
                        history.push("/create");
                    })
                        .catch(function (error) {
                            console.log("Error adding new user: " + error);
                        });
                } else if (!authResult.additionalUserInfo.isNewUser) {
                    history.push("/profile");
                } else {
                    return true;
                }
                return false;
            }
        },
        signInFlow: 'popup',
        signInSuccessUrl: '/profile',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
    };

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
                setFirstNameError("Please fill your first name.");
            }
            if (lastName.trim().length == 0) {
                setLastNameError("Please fill your last name.");
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
        <div className="form-background">
            <div className="loginContainer">

                {hasAccount ? (
                    <div>
                        <h3 className="formHeading">Sign In Form</h3>

                        <label>Email:</label>
                        <input
                            id="userEmailField"
                            type="email"
                            className="userEmailID"
                            autoFocus
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <ErrorMessage errorValue={emailError} id="emailError" />

                        <label>Password:</label>
                        <input
                            id="passwordField"
                            type="password"
                            required
                            className="userPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ErrorMessage errorValue={passwordError} id="passwordError" />

                        <input id="loginBtn" className="mainBtn" type="submit" onClick={handleLogin} value="Sign In"></input>

                        <p className="signUpLine">
                            Don't have an Account?
                                <button className="signUpReDirect" onClick={() => {
                                setHasAccount(!hasAccount)
                                clearInputsSignUp()
                                clearErrors()
                            }
                            }>Sign Up</button>
                        </p>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </div>
                ) : (
                    <>
                        <h3 className="formHeading">Sign Up Form</h3>
                        <label>Email:</label>
                        <input
                            id="userEmailField"
                            type="email"
                            className="userEmailID"
                            autoFocus
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <ErrorMessage errorValue={emailError} id="emailError" />

                        <label>FirstName:</label>
                        <input
                            id="firstNameField"
                            type="text"
                            className="otherInputs"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <ErrorMessage errorValue={firstNameError} id="firstNameError" />

                        <label>LastName:</label>
                        <input
                            id="lastNameField"
                            type="text"
                            required
                            className="otherInputs"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <ErrorMessage errorValue={lastNameError} id="lastNameError" />

                        <label>Create Password:</label>
                        <input
                            id="passwordField"
                            type="password"
                            required
                            className="userPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <ErrorMessage errorValue={passwordError} id="passwordError" />

                        <input id="registerBtn" className="mainBtn" type="submit" onClick={handleSignup} value="Sign Up" />

                        <p className="signInLine">
                            Have an Account?
                            <button 
                              id="toLoginBtn" 
                              className="signInReDirect" 
                              onClick={() => {
                                setHasAccount(!hasAccount);
                                clearInputsLogin()
                                clearErrors();
                            }
                            }>Sign In</button>
                        </p>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </>
                )}
            </div>



        </div>
    );
}

function ErrorMessage(props) {
    const { errorValue, ...rest } = props;
    return errorValue ?
        <p {...rest} className="errorMsg">{errorValue}</p>
        : <p />
}

export default Login;