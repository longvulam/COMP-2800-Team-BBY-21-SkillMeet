import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './classes/Navbar';
import Profile from './classes/Profile';
import EditProfile from './classes/WIP/EditProfile'
import firebase from './firebase';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	useHistory
} from 'react-router-dom';

function fetchCallExample() {
    fetch("/fetchExampleApi")
        .then(async response => console.log(await response.json()));
};



function GetUserData() {
  const [user, setUser] = React.useState([]);
 
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('users').get('Paul');
      setUser([data.docs]);
      // setUser(data.docs.map(doc => doc.data()));
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        {console.log('User', user[0])}
      </div>
    </>
  );
}


function App() {
    // fetchCallExample();

    return (
      <div className="App">
      <GetUserData/>
      <Profile/>
      <Router>
        <Navbar/>
      </Router>
     </div>
    );
}

export default App;
