import { Link } from 'react-router-dom';
import '../../src/LandingPageStyles/Landing_Page_Styles.css';

const Login = (props) => {

    const { 
        email,
        setEmail, 
        password, 
        firstName,
        setFirstName,
        lastName,
        setLastName,
        setPassword, 
        handleLogin, 
        handleSignup,
        clearInputsLogin,
        clearInputsSignUp, 
        clearErrors,
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError,
        firstNameError,
        lastNameError
    } = props;

    return ( 
        <div className="form-background">
            <div className = "loginContainer">

            {hasAccount ? (
                        <>
                            <h3 className = "formHeading">Sign In Form</h3>

                            <label>Email:</label>
                            <input 
                                type = "email" 
                                className = "userEmailID"
                                autoFocus 
                                required 
                                value = {email} 
                                onChange = {(e) => setEmail(e.target.value)} 
                            />
                            <p className = "errorMsg">{emailError}</p>

                            <label>Password:</label>
                            <input 
                                type = "password" 
                                required 
                                className = "userPassword"
                                value = {password} 
                                onChange = {(e) => setPassword(e.target.value)} 
                            />
                            <p className = "errorMsg">{passwordError}</p>

                            <input className = "mainBtn" type = "submit" onClick = {handleLogin} value = "Sign In"></input>

                            <p className = "signUpLine"> 
                                Don't have an Account? 
                                <button className = "signUpReDirect" onClick = {() => {
                                    setHasAccount(!hasAccount)
                                    clearInputsSignUp()
                                    clearErrors()
                                    }
                                    }>Sign Up</button>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className = "formHeading">Sign Up Form</h3>
                            <label>Email:</label>
                            <input 
                                type = "email" 
                                className = "userEmailID"
                                autoFocus 
                                required 
                                value = {email} 
                                onChange = {(e) => setEmail(e.target.value)} 
                            />
                            <p className = "errorMsg">{emailError}</p>

                            <label>FirstName:</label>
                            <input 
                                type = "text" 
                                className = "otherInputs"
                                required 
                                value = {firstName} 
                                onChange = {(e) => setFirstName(e.target.value)} 
                            />
                            <p className = "errorMsg">{firstNameError}</p>

                            <label>LastName:</label>
                            <input 
                                type = "text" 
                                required 
                                className = "otherInputs"
                                value = {lastName} 
                                onChange = {(e) => setLastName(e.target.value)} 
                            />
                            <p className = "errorMsg">{lastNameError}</p>

                            <label>Create Password:</label>
                            <input 
                                type = "password" 
                                required 
                                className = "userPassword"
                                value = {password} 
                                onChange = {(e) => setPassword(e.target.value)} 
                            />
                            <p className = "errorMsg">{passwordError}</p>

                            <input className = "mainBtn" type = "submit" onClick = {handleSignup} value = "Sign Up"></input>
                            
                            <p className = "signInLine">
                                Have an Account? 
                                <button className = "signInReDirect" onClick = {() => {
                                    setHasAccount(!hasAccount);
                                    clearInputsLogin()
                                    clearErrors();
                                }
                                }>Sign In</button>
                            </p>
                        </>
                    )}
            </div>
            </div>
     );
}
 
export default Login;