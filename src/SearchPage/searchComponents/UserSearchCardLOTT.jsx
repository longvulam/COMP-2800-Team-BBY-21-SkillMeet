import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { render } from '@testing-library/react';
import { makeStyles } from '@material-ui/core/styles';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import Grid from '@material-ui/core/Grid';


import firebase, { db, auth } from '../../firebase';
const useStyles = makeStyles((theme) => ({
  paper:{
    width:'100%',
    height:'9.5em',
  },
  cardContain:{
    width:'95%',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    height:'11.5em',
    margin:'auto',
  },
  avatar : {
    height:'3em',
    width:'3em',
  },
  infoContain: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-evenly',
    width:'100%',
  },
  addIcon: {
    width:'1.5em',
    height:'1.5em',
  },
  chipsSkillName : {
    fontSize:'1em',
  },
  chipsSkillLevel : {
    fontSize:'.9em',
    height: '2em',
  },
  chipsName : {
    fontSize:'1.2em',
  },
  chipsCity : {
    fontSize:'.7em',
    height: '2em',
  },
  infoGrid:{
    width:'calc(100% - 8em)',
    height:'4em',
    alignItems:'center',
  },
  gridItem: {
    marginTop:'0.5em',
  }
}));

export default function UserSearchCard(props) {
  const classes = useStyles();
  const { name, city, skillName, skillLevel, id } = props;
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
        <div className={classes.cardContain}>
          <Grid container alignContent='center' justify='center'  spacing={1} >
          <Grid item xs={3}>
          <Avatar className={classes.avatar}/>
          </Grid>
          <Grid item xs={9} container direction="column" 
            spacing={1}  className={classes.infoGrid}>
            <Grid Item xs={3} container justify="center" className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chipsName} label={name}/>
              </div>
            </Grid>
            <Grid Item xs={3} className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chipsCity} label={city}/>
              </div>
            </Grid>
          </Grid>
          <Grid Item xs={5} className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chipsSkillName} label={skillName}/>
              </div>
            </Grid>
            <Grid Item xs={4} className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chipsSkillLevel} label={skillLevel}/>
              </div>
            </Grid>
          <Grid item xs={3}>
          <IconButton onClick = { (e) => addFriend()}	>
            <PersonAddIcon className={classes.addIcon}/>
          </IconButton>
          </Grid>
          </Grid>
        </div>
      </Paper>
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