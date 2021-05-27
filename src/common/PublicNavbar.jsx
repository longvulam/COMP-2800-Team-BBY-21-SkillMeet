import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SkillMeet from '../img/SkillMeet.png';

export default function PublicNavbar(props) {

    const useStyles = makeStyles({
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        logo: {
            height: '100%',
        },
        logoWrapper: {
            width: '4.5em',
            marginLeft: '.5em',
            height: '2.5em',
        }
    });

    const classes = useStyles();
    return (
        <nav className="navbar" {...classes.navbar}>
            <a className={classes.logoWrapper} href="/">
                <img className={classes.logo} src={SkillMeet} />
            </a>
            <div className="navbar-links">
                <ul>
                    <li>
                        <i className="fa fa-question-circle" aria-hidden="true"></i>
                        <Link className="navbar-active" to="/aboutUs">ABOUT US</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
