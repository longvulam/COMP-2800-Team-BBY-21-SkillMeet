import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../Profile';

export function PersonalInfo(props) {
    const { userProfile } = props;
    const classes = useStyles();
    return (
        <Grid key="userProfile"
            container
            direction="column"
            spacing={1}
            style={{
                margin: 'auto',
                marginTop: '2vh',
                alignItems: 'center',
            }}>
            <Grid item xs={12}
                key="userName"
            >
                <Typography
                    variant='h6'
                    className={classes.name}
                >
                    {userProfile.displayName}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant='subtitle1'
                >
                    {userProfile.city}
                </Typography>
            </Grid>
        </Grid>);
}
