import React from 'react';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cancelButton: {
    marginRight: '4vw',
    marginTop: '2vw',
    height: '2.5em',
    width: '2.5em',
    backgroundColor:'darkRed',
    color:'white',
}
}));


function CancelButton (props) {
  const classes = useStyles();
  return (
    <Fab
      className={classes.cancelButton}
      onClick={() => props.history.push("/profile")}
      color='default'
      >
      <CancelIcon/>
    </Fab>
  );
}

export default withRouter(CancelButton);