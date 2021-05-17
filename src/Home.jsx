import React, { Component } from 'react';


class Home extends Component {

    counter = 1;

    constructor(props){
        super(props);

        setTimeout(() => this.counter += 1, 1000);
    }

    render() {
        const appName = "SkillMeet";
        const appDescription = "Blah blah blah Blah blah blahBlah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blahBlah Blah blah blah Blah blah blah Blah blah blah blah blah";
        const appHook = "Blah blah blah Blah blah blahBlah blah blah Blah blah";


        // const [user, setUser] = useState('');
        // const [email, setEmail] = useState('');
        // const [password, setPassword] = useState('');
        // const [firstName, setFirstName] = useState('');
        // const [lastName, setLastName] = useState('');
        // const [emailError, setEmailError] = useState('');
        // const [passwordError, setPasswordError] = useState('');
        // const [hasAccount, setHasAccount] = useState(false);

        function clearErrors() {

        }

        function handleLogin() {

        }

        const handleSignup = () => {
            clearErrors();
            console.log("A user is signed up!");
        }

        const handleLogout = () => {
            console.log("USer wants to Log out");
            // fire.auth().signOut();
        }

        function changeAppName() {

        }

        return (
            <div className="landing-page-background">
                <div className="white-background">
                    <div className="app-name">{appName}</div>
                    <div className="app-description">{appDescription}</div>
                    <div className="app-hook">{appHook}</div>
                </div>
                <div>Name: {this.counter}</div>
                <input type="button" value="ChangeAppName" onClick={changeAppName} />

                <div className="form-background">

                </div>
            </div>
        );
    }
}

export default Home;