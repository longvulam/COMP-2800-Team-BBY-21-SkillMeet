import Paper from '@material-ui/core/Paper';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import { db, auth } from '../firebase';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';

/**
 * Creats a Mui alert based on what is passed through the props
 * @param {*} props props passed into the function.
 * @returns an alert with the props
 */
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: '2.5em',
    width: '2.5em',
    marginRight: '1em',
  },
  addIcon: {
    width: '1.4em',
    height: '1.4em',
  },
  fabYes: {
    width: '6em',
    height: '2.5em',
  },
  fabNo: {
    width: '6em',
    height: '2.5em',
  },
  chips: {
    fontSize: '1em',
  },
  infoGrid: {
    width: '95%',
    height: '95%',
    alignItems: 'center',
    margin: 'auto',
  },
  firstGridItem: {
    marginTop: '0.5em',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'top',
  },
  skillGridItem: {
    marginTop: '0.5em',
    width: '95%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '0.5em',
  },
  skillLevel: {
    marginLeft: '0.5em',
  },
  nameAndLocation: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatarNameLocation: {
    display: 'flex',
  }
}));

/**
 * functional component that displays the user information of someone who has sent
 * a friend request.  It allows the user to accept or decline the request.
 * @param props props passed to the function
 * 
 */
export default function UserPendingCard2(props) {
  const classes = useStyles();
  const history = useHistory();
  const { name, city, id, setRequests, avatar } = props;
  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
    Transition: 'fade',
  });

  const { open, vertical, horizontal, Transition } = snackbarState;

  /**
     * sets the snackbar state to true, position it, and style it.
     */
  function handleSnackbarOpen() {
    setSnackbarState({
      open: true,
      vertical: 'bottom',
      horizontal: 'center',
      Transition: 'fade',
    });
  }

  /**
  * sets the snackbar state to false.
  */
  function handleSnackbarClose() {
    setSnackbarState({
      ...snackbarState,
      open: false,
    });
  }

  /**
   * runs the handleSnackbarOpen function when the accept button is clicked
   */
  function handleAcceptClick() {
    handleSnackbarOpen();
  }

  /**
   * accepts the friend request therby making the two users friends.  This is 
   * acheived by querying firestore for the previously created documents and 
   * changing the booleans to the opposite values.
   * 
   */
  async function acceptRequest() {
    const currentUserData = await getCurrentUserDataAsync();
    console.log(currentUserData.uid);
    db.collection('users').doc(currentUserData.uid).collection('Friends').doc('received' + id)
      .update({
        isPending: false,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    db.collection('users').doc(id).collection('Friends').doc('sent' + currentUserData.uid)
      .update({
        isConfirmed: true,
      })
      .then(() => {
        setRequests(oldArray => {
          const newArrayOfRequests = oldArray.filter(req => req.id !== id);
          return newArrayOfRequests;
        })
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  /**
   * declines the friend request.  This is acheived by querying firestore for the previously
   *  created documents and deleting them.
   */
  async function declineRequest() {
    const currentUserData = await getCurrentUserDataAsync();
    console.log(currentUserData.uid);
    db.collection('users').doc(currentUserData.uid).collection('Friends').doc('received' + id)
      .delete()
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    db.collection('users').doc(id).collection('Friends').doc('sent' + currentUserData.uid)
      .delete()
      .then(() => {
        setRequests(oldArray => {
          const newArrayOfRequests = oldArray.filter(req => req.id !== id);
          return newArrayOfRequests;
        })
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return (
    <>
      <Paper className={classes.paper} elevation={2} key={id}>
        <Grid container direction="column"
          spacing={1} className={classes.infoGrid}>
          <Grid item className={classes.firstGridItem}>
            <div className={classes.avatarNameLocation}>
              <Avatar
                onClick={(event) => history.push('/profile/' + id)}
                className={classes.avatar}
                src={avatar}
                alt="Profile Pic" />
              <div className={classes.nameAndLocation}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="subtitle1">{city}</Typography>
              </div>
            </div>

          </Grid>
          <Grid item className={classes.skillGridItem}>
            <Button
              variant="contained"
              className={classes.fabNo}
              color="secondary"
              onClick={(e) => declineRequest()}
            >
              <CancelOutlinedIcon className={classes.addIcon} />
            </Button>
            <Button
              variant="contained"
              className={classes.fabYes}
              color="primary"
              onClick={(e) => acceptRequest()}>
              <CheckCircleOutlinedIcon className={classes.addIcon} />
            </Button>
          </Grid>

        </Grid>
      </Paper>
      <Snackbar
        autoHideDuration={1500}
        anchorOrigin={{ vertical, horizontal }}
        open={true}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success">{name}'s request accepted</Alert>
      </Snackbar>
    </>
  );
}

/**
 * gets the current user's data from their firestore 'users' document
 * @returns user an object with key value pairs representing user information
 */
function getCurrentUserDataAsync() {
  return new Promise((resolve, reject) =>
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      resolve(user);
    })
  );
}
