import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Background from '../img/aboutUsBackground.jpg';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    aboutUs: {
        textAlign: 'center', 
        marginTop:'0.5em',
        color:theme.palette.primary.dark
    },
}));
function HeroImage () {
    const classes = useStyles();

    return (
    <>
    <Paper 
    elevation={4}
    style={{ backgroundImage: "url(" + Background + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '47vh',
    width: '100%'
    }}><Typography className={classes.aboutUs} variant="h3">About Us</Typography></Paper>
    </>);
}
 
export default HeroImage;