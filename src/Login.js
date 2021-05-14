import { Link } from 'react-router-dom';

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
        passwordError
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
                                autoFocus 
                                required 
                                placeholder = "johnShelby@gmail.com"
                                value = {email} 
                                onChange = {(e) => setEmail(e.target.value)} 
                            />
                            <p className = "errorMsg">{emailError}</p>

                            <label>Password:</label>
                            <input 
                                type = "password" 
                                required 
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
                                autoFocus 
                                required 
                                placeholder = "johnShelby@gmail.com"
                                value = {email} 
                                onChange = {(e) => setEmail(e.target.value)} 
                            />
                            <p className = "errorMsg">{emailError}</p>

                            <label>FirstName:</label>
                            <input 
                                type = "text" 
                                required 
                                value = {firstName} 
                                placeholder = "John"
                                onChange = {(e) => setFirstName(e.target.value)} 
                            />

                            <label>LastName:</label>
                            <input 
                                type = "text" 
                                required 
                                value = {lastName} 
                                placeholder = "Shelby"
                                onChange = {(e) => setLastName(e.target.value)} 
                            />

                            <label>Create Password:</label>
                            <input 
                                type = "password" 
                                required 
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