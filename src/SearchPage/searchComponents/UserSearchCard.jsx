import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import firebase, { db, auth } from '../../firebase';
import Snackbar from '@material-ui/core/Snackbar';
import React, { useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';


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
  },
  addIcon: {
    width:'0.9em',
    height:'0.9em',
  },
  fab: {
    width:'2.5em',
    height:'2.5em',
  },
  chips : {
    fontSize:'1em',
  },
  infoGrid:{
    width:'95%',
    height:'95%',
    alignItems:'center',
    margin:'auto',
  },
  firstGridItem: {
    marginTop:'0.5em',
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'top',
  },
  skillGridItem: {
    marginTop:'0.5em',
    width:'95%',
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
  const { name, city, skillName, skillLevel, id } = props;

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
      <Paper className={classes.paper}elevation={2} key={id}>
          <Grid container direction="column" 
            spacing={1} className={classes.infoGrid}>

            <Grid item className={classes.firstGridItem}>
                <div className={classes.avatarNameLocation}>
                    <Avatar className={classes.avatar}/>
                    <div className={classes.nameAndLocation}>
                        <Typography variant="h6">{name}</Typography>
                        <Typography variant="subtitle1">{city}</Typography>
                    </div>
                </div>
                <Fab className={classes.fab} color="primary" onClick = { () => handleAddClick()}>
                    <PersonAddIcon className={classes.addIcon}/>
                </Fab>
            </Grid>

            <Grid item className={classes.skillGridItem}>
                <Typography variant="h6" display='inline'>{skillName}</Typography>
                <Typography variant="subtitle1" display='inline' className={classes.skillLevel}>{skillLevel}</Typography>
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


//////////////////////////////////////////////////////////////////
// addFriend(e.target.id){
// 		const CurUserID = firebase.auth().currentUser.uid;
// 		const OtherUserID = e.target.id;

// 		db.collection('users').doc(CurUserID).collection('Friends')
// 		.add({
//           isConfirmed: "false",
//           friendID: OtherUserID,
// 		})
// 		.then(() => {
//     			console.log("Document successfully written!");
// 		})
// 		.catch((error) => {
//     			console.error("Error writing document: ", error);
// 		});
// //3. User B Set() User A.ID in "pending".//
// 		db.collection('users').doc(OtherUserID).collection('Friends').doc("received" + CurUserID)
// 		.add({
//     			isPending: "false",
// 		})
// 		.then(() => {
//     			console.log("Document successfully written!");
// 		})
// 		.catch((error) => {
//     			console.error("Error writing document: ", error);
// 		});

// //4. When User B Accepts, both User's documents boolean fields are set to opposite.//
// 		db.collection('users').doc(CurUserID).collection('Friends').doc("sent" + CurUserID)
// 		.update({
//     			isConfirmed: "true",
// 		})
// 		.then(() => {
//     			console.log("Document successfully written!");
// 		})
// 		.catch((error) => {
//     			console.error("Error writing document: ", error);
// 		});

// 		db.collection('users').doc(OtherUserID).collection('Friends').doc("received" + CurUserID)
// 		.update({
//     			isPending: "false",
// 		})
// 		.then(() => {
//     			console.log("Document successfully written!");
// 		})
// 		.catch((error) => {
//     			console.error("Error writing document: ", error);
// 		});
// 	}