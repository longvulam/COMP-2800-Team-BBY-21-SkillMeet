import React from 'react';
import Fab from '@material-ui/core/Fab';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";
import firebase from '../../firebase';

const useStyles = makeStyles((theme) => ({
  LogoutButton: {
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    marginRight: '6vw',
    marginTop: '2vw',
    height: '2.5em',
    width: '2.5em',
  },
}));

/**
 * functional component for a logout button along with it's functionality of
 * logging a user out, and a diaolgue that confirms with users before logging out.
 * @param props props passed to the function
 * 
 */
export default function LogoutButton(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Logout Function Here
  function handleLogout() {
    console.log('loggingOut');

    var promise = firebase.auth().signOut();
    promise.then(function () {
      window.location.href = '/';
    });
  }

  return (
    <>
      <Fab
        id="logoutBtn"
        className={classes.LogoutButton}
        onClick={handleClickOpen}
        id="logoutBtn"
      >
        <LogoutIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You Want To Logout?
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="noConfirmBtn" onClick={handleClose} color="primary">
            No
        </Button>
          <Button id="yesConfirmBtn" onClick={handleLogout} color="primary" autoFocus>
            Yes
        </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}