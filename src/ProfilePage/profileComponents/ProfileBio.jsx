import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

const defaultBioText = `Bio Loading`;

export default function ProfileBio(props) {
    const { bio, editable, changeState } = props;

    const bioInfo = bio ? bio : defaultBioText;

    return (
        <Paper
            elevation={2}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <InputBase
                value={bioInfo}
                onChange={(event) => changeState(event.target.value, "bio")}
                readOnly={!editable}
                multiline
                style={{
                    textAlign: 'center',
                    width: '92.5%',
                }}>
            </InputBase>
        </Paper>
    );
}