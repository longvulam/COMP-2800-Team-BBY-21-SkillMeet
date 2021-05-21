import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
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
    height:'11.5em',
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
  chips : {
    fontSize:'1em',
  },
  infoGrid:{
    width:'calc(100% - 8em)',
    height:'10em',
    alignItems:'center',
  },
  gridItem: {
    marginTop:'0.5em',
  }
}));

export default function UserPendingCard(props) {
  const classes = useStyles();
  const { name, city, skillName, skillLevel, id } = props;
  async function acceptRequest() {
    const currentUserData = await getCurrentUserDataAsync();
    console.log(currentUserData.uid);
    db.collection('users').doc(currentUserData.uid).collection('Friends')
		.add({
          isConfirmed: "false",
          friendID: id,
		})
		.then(() => {
    			console.log("Document successfully written!");
		})
		.catch((error) => {
    			console.error("Error writing document: ", error);
		});
    db.collection('users').doc(id).collection('Friends')
		.add({
    			isPending: "true",
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
          <Avatar className={classes.avatar}/>
          <Grid container direction="column" 
            spacing={1} className={classes.infoGrid}>
            <Grid Item className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chips} label={name}/>
              </div>
            </Grid>
            <Grid Item className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chips} label={skillName}/>
              </div>
            </Grid>
            <Grid Item className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chips} label={skillLevel}/>
              </div>
            </Grid>
            <Grid Item className={classes.gridItem}>
              <div className={classes.infoContain}>
                <Chip className={classes.chips} label={city}/>
              </div>
            </Grid>
          </Grid>
          <IconButton onClick = { (e) => acceptRequest()}	>
            <CheckCircleOutlinedIcon className={classes.addIcon}/>
          </IconButton>
          <IconButton onClick = { (e) => declineRequest()}	>
            <CancelOutlinedIcon className={classes.addIcon}/>
          </IconButton>

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


