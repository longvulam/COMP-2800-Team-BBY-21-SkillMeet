import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

const defaultBioText = `Bio Loading`;


const useStyles = makeStyles((theme) => ({
 bioTypography: {
   backgroundColor:theme.palette.primary.main,
   color:'white',
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
 },
}));

export default function ProfileBio(props) {
    const { bio, editable, changeState } = props;
    const classes = useStyles();
    const bioInfo = bio;

    function handleChange(event) {
        const newValue = event.target.value;
        changeState(newValue, 'bio');
    }

    return (
        <Paper
            elevation={2}
            className={classes.bioTypography}
        >
            {editable ? 
            <InputBase
                id="profileBio"
                value={bioInfo}
                multiline
                onChange={handleChange}
                style={{
                    width:'95%',
                    marginTop:'0.25em',
                    marginBottom:'0.25em',
                    color: 'white'
                }} /> 
            : <Typography
                id="profileBio"
                variant="body1"
                style={{
                    width:'95%',
                    marginTop:'0.25em',
                    marginBottom:'0.25em',
                }}>
              {bioInfo}
            </Typography>}
        </Paper>
    );
}