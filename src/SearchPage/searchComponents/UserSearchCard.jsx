import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { db, auth } from '../../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper:{
    width:'100%',
    display:'flex',
    alignItems:'center',
  },
  avatar : {
    height:'2.5em',
    width:'2.5em',
    marginRight:'1em',
    marginLeft:'0.5em',
    backgroundColor:theme.palette.primary.main,
  },
  addIcon: {
    width:'0.9em',
    height:'0.9em',
  },
  fab: {
    width:'2.5em',
    height:'2.5em',
    marginRight:'0.5em',
  },
  chips : {
    fontSize:'1em',
  },
  infoGrid:{
    width:'100%%',
    height:'100%',
    alignItems:'center',
    margin:'auto',
  },
  firstGridItem: {
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'top',
  },
  skillGridItem: {
    marginTop:'0.5em',
    width:'100%',
    backgroundColor:theme.palette.primary.light,
  },
  skills: {
    marginLeft:'0.5em',
  },
  skillLevel: {
      marginLeft:'0.5em',
  },
  nameAndLocation: {
      display:'flex',
      flexDirection:'column',
  },
  avatarNameLocation: {
      display:'flex',
      alignItems:'center',
  }
}));

export default function UserSearchCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { name, city, skillName, skillLevel, id, avatar, isFriending } = props;

  const [requestSent, setRequestSent] = React.useState(false);

  const [snackbarState, setSnackbarState] = React.useState({
    open: false,
    vertical:'bottom',
    horizontal:'center',
    Transition: 'fade',
  });
  const { open, vertical, horizontal, Transition } = snackbarState;

  function handleSnackbarOpen () {
    setSnackbarState({
      open: true,
      vertical:'bottom',
      horizontal:'center',
      Transition: 'fade',
    });

  }
  function handleSnackbarClose() {
    setSnackbarState({
      ...snackbarState, 
      open: false,
    });
  }
  function handleAddClick() {
    setRequestSent(true);
    addFriend();
    handleSnackbarOpen();
  }
  async function addFriend() {
    const currentUserData = await getCurrentUserDataAsync();
    console.log(currentUserData.uid);
    db.collection('users').doc(currentUserData.uid).collection('Friends').doc('sent' + id)
		.set({
          isConfirmed: false,
          friendID: id,
		})
		.then(() => {
    			console.log("Document successfully written!");
		})
		.catch((error) => {
    			console.error("Error writing document: ", error);
		});
    db.collection('users').doc(id).collection('Friends').doc('received' + currentUserData.uid)
		.set({
    			isPending: true,
          friendID: currentUserData.uid
		})
		.then(() => {
    			console.log("Document successfully written!");
		})
		.catch((error) => {
    			console.error("Error writing document: ", error);
		});
  }
  return (
    <>
        <Paper className={classes.paper} elevation={4} key={id}>
            <Grid container direction="column" 
              spacing={1} className={classes.infoGrid}>

              <Grid item className={classes.firstGridItem}>
                  <div className={classes.avatarNameLocation}>
                      <Avatar 
                        className={classes.avatar}
                        alt="Profile Pic"
                        src={avatar}
                        onClick={()=> history.push('/profile/' + id)}
                      />
                      <div className={classes.nameAndLocation}>
                          <Typography variant="h6">{name}</Typography>
                          <Typography variant="subtitle1">{city}</Typography>
                      </div>
                  </div>
                  <Fab 
                    disabled={isFriending}
                    className={classes.fab} 
                    color={requestSent ? "default" : "primary"} 
                    onClick = { () => handleAddClick()}>
                      <PersonAddIcon className={classes.addIcon}/>
                  </Fab>
              </Grid>

              <Grid item className={classes.skillGridItem}>
                <div className={classes.skills}>
                  <Typography variant="h6" display='inline'>{skillName}</Typography>
                  <Typography variant="subtitle1" display='inline' className={classes.skillLevel}>{skillLevel}</Typography>
                </div>
              </Grid>
            </Grid>
        </Paper>
        <Snackbar
          autoHideDuration={1500}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleSnackbarClose}
          TransitionComponent={Transition}
        >
        <Alert severity="info">Added {name}</Alert>
        </Snackbar> 
    </>
  );
}

function getCurrentUserDataAsync() {
    return new Promise((resolve, reject) =>
        auth.onAuthStateChanged((user) => {
            if (!user) return;
            resolve(user);   
        })
    );
}
