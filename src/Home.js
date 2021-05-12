const home = (props) => {

    const appName = "SkillMeet";
    const appDescription = "Blah blah blah Blah blah blahBlah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blahBlah Blah blah blah Blah blah blah Blah blah blah blah blah";
    const appHook = "Blah blah blah Blah blah blahBlah blah blah Blah blah";

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
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError
    } = props;

    return ( 
        <div className = "landing-page-background">
            <div className="white-background">
                <div className = "app-name">{appName}</div>
                <div className = "app-description">{appDescription}</div>
                <div className = "app-hook">{appHook}</div>
            </div>


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
                                value = {email} 
                                onChange = {(e) => setPassword(e.target.value)} 
                            />
                            <p className = "errorMsg">{passwordError}</p>

                            <button onClick = {handleLogin}>Sign In</button>
                            <p className = "signUpLine"> 
                                Don't have an Account? 
                                <button className = "signUpReDirect" onClick = {() => setHasAccount(!hasAccount)}>Sign Up</button>
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

                            <label>FirstName:</label>
                            <input 
                                type = "text" 
                                required 
                                value = {lastName} 
                                placeholder = "Shelby"
                                onChange = {(e) => setLastName(e.target.value)} 
                            />

                            <label>Password:</label>
                            <input 
                                type = "password" 
                                required 
                                value = {email} 
                                onChange = {(e) => setPassword(e.target.value)} 
                            />
                            <p className = "errorMsg">{passwordError}</p>

                            <button onClick = {handleSignup}>Sign Up</button>
                            <p className = "signInLine">
                                Have an Account? 
                                <button className = "signInReDirect" onClick = {() => setHasAccount(!hasAccount)}>Sign In</button>
                            </p>
                        </>
                    )}
            </div>
            </div>
        </div>

     );
}
 
export default home;