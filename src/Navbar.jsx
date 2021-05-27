import $ from 'jquery';
import firebase from './firebase';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SkillMeet from './img/SkillMeet.png';

const Navbar = (props) => {

    const {
        handleLogout,
    } = props;

    return ( 
        <nav className="navbar">
        <Link className="brand-title" to="/">SkillMeet</Link>
        <div className="navbar-links">
            <ul>
                <li>
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <Link className="navbar-active" to="/aboutUs">ABOUT US</Link>
                </li>
                {/* <li id = "logout-btn">
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                    <a className="navbar-active" onClick = {() => handleLogout()}> LOGOUT</a>
                </li> */}
            </ul>
        </div>
    </nav>
     );
}
 
export default Navbar;

