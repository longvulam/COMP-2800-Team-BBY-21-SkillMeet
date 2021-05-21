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
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';



import firebase, { db, auth } from '../firebase';

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
  fabYes: {
    width:'2.5em',
    height:'2em',
    marginTop: '-1em',
    marginBottom: '.2em',
    marginLeft: '4em'
  },
  fabNo: {
    width:'2.5em',
    height:'2em',
    marginTop: '-1em',
    marginLeft: '5em',
  },
  bottomButtons: {
    display: 'flex',
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
  }
}));

export default function UserPendingCard2(props) {
  const classes = useStyles();
  const { name, city, id, setRequests } = props;

  async function acceptRequest() {
    const currentUserData = await getCurrentUserDataAsync();
    console.log(currentUserData.uid);
    db.collection('users').doc(currentUserData.uid).collection('Friends').doc(id)
		.update({
          isPending: false
		})
		.then(() => {
    			console.log("Document successfully written!");
		})
		.catch((error) => {
    			console.error("Error writing document: ", error);
		});
    db.collection('users').doc(id).collection('Friends').doc('sent' + currentUserData.uid)
		.update({
    			isConfirmed: true
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
                
            </Grid>
            <Grid item className={classes.skillGridItem}>
              <div className={classes.bottomButtons}>
                <Fab onClick = { (e) => acceptRequest()} variant="extended" className={classes.fabYes} color="primary">
                    <CheckCircleOutlinedIcon className={classes.addIcon}/>
                </Fab>
                <Fab onClick = { (e) => declineRequest()} variant="extended" className={classes.fabNo} color="primary">
                    <CancelOutlinedIcon className={classes.addIcon}/>
                </Fab>
                </div>
            </Grid>
         
          </Grid>
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

          // <IconButton onClick = { (e) => acceptRequest()}	>
          //   <CheckCircleOutlinedIcon className={classes.addIcon}/>
          // </IconButton>
          // <IconButton onClick = { (e) => declineRequest()}	>
          //   <CancelOutlinedIcon className={classes.addIcon}/>
          // </IconButton>
