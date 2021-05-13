import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navbar from './classes/Navbar';
import Profile from './classes/Profile';

function fetchCallExample() {
    fetch("/fetchExampleApi")
        .then(async response => console.log(await response.json()));
};

function App() {
    // fetchCallExample();

    return (
      <div className="App">
      <Profile/>
      <Navbar/>
     </div>
    );
}

export default App;
