import React from 'react';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  saveButton: {
    marginRight: '4vw',
    marginTop: '2vw',
    height: '2.5em',
    width: '2.5em',
    backgroundColor:theme.palette.primary.main,
    color:'white',
}
}));

export default function SaveButton(props) {
    const { style, onClick } = props;
    const classes = useStyles();
    return (
        <Fab
            className={classes.saveButton}
            onClick={onClick}
        >
            <SaveIcon />
        </Fab>
    );
}