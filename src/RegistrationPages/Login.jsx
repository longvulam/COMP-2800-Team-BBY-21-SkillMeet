import '../../src/LandingPageStyles/Landing_Page_Styles.css';
import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { db } from '../firebase';
import { useHistory } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


function Login() {

    // Setting an initial value for the inputs used on the page.
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

                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                //------------------------------------------------------------------------------------------
                // The code below is modified from default snippet provided by the FB documentation.
                //
                // If the user is a "brand new" user, then create a new "user" in your own database.
                // Assign this user with the name and email provided.
                // Before this works, you must enable "Firestore" from the firebase console.
                // The Firestore rules must allow the user to write. 
                //------------------------------------------------------------------------------------------

                var user = authResult.user;
                if (authResult.additionalUserInfo.isNewUser) { //if new user
                    db.collection("users").doc(user.uid).set({ //write to firestore
                        name: user.displayName, //"users" collection
                        email: user.email //with authenticated user's ID (user.uid)
                    }).then(function () {
                        console.log("New user added to firestore");
                        history.push("/create"); //direct the user to /create route
                    })
                        .catch(function (error) {
                            console.log("Error adding new user: " + error);
                        });
                } else if (!authResult.additionalUserInfo.isNewUser) { //if not new user
                    history.push("/profile"); //direct the user to /profiile route
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
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
    };

    /** Clears Sign In Inputs */
    const clearInputsLogin = () => {
        setEmail("");
        setPassword("");
    }

    /** Clears Sign Up Inputs */
    const clearInputsSignUp = () => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }

    /** Clears the error fields */
    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
        setFirstNameError("");
        setLastNameError("");
    }

    /**
     * Handles the Login authentication for the app.
     * First, clears the errors that may be displayed previously,
     * Then, Uses the firebase built in login method
     * Then, directs the user to /profile route (profile page)
     * Catches any error that may occur while doing th above tasks 
     * and shows it to the user.
     */
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

    /**
     * Handles the Sign Up authentication for the app.
     * First, clears the errors that may be displayed previously, then
     * Uses the firebase built-in create user method to enter the suer in authentication table, then
     * Creates the user in the the firestore users collection. then
     * directs the user to /create route (2nd ste of setting up an account).
     * 
     * Checks for validation error for both first and last names.
     * Checks in depth for validation wrrors for the email and password entered.
     * displays a message in error field when an error occurs.
     */
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

    /** 
     * Handles the Logout from the app
     * First, logs out the user
     * ,waits for the user to be signed out and then
     *  redirects user to the Landing page of SkillMeet
     */
    const handleLogout = () => {

        var promise = firebase.auth().signOut(); 
        promise.then(function () {              
            window.location.href = '/';
        });
    }

    /**
     * Checks the authentication status of the user.
     */
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
    /**
     * Checks authentication status after the render and every update.
     */
    useEffect(() => {
        authListener()
    }, []);

    return (

        <div className="form-background">
            <div className="loginContainer">

                {hasAccount ? (
                    //==================================================Sign In Form Starts Here=======================================//
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
                    //==================================================Sign In Form Ends Here=======================================//
                ) : (
                    //===================================================Sign Up Form Starts Here====================================//
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
                    //===================================================Sign Up FormEnds Here====================================//

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