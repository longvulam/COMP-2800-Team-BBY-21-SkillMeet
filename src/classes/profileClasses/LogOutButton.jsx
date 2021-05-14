import React from 'react';
import Fab from '@material-ui/core/Fab';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function LogoutButton (props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Logout Function Here
  function handleLogout() {
    console.log('loggingOut');
  }

  return (
    <>
    <Fab
      style={props.style}
      onClick={handleClickOpen}
      >
      <LogoutIcon/>
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
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleLogout} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}