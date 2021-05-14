import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function ProfileBio(props) {
  const defaultBioText = "Bio Loading"
  const bioInfo = props.bio? props.bio : defaultBioText;
  return (
    <Paper 
    elevation={2}
    style={{
      width: '100%',
    }}
    >
      <Typography style={{
        textAlign: 'center',
        width:'95%',
      }}>
        {bioInfo}
      </Typography>
    </Paper>
  );
}