import { Avatar, makeStyles, Paper, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 'calc(100vw - 1em)',
        display: 'flex',
        alignItems: 'center',
        margin: '0em .5em .1em .5em',
    },
    avatar: {
        height: '2.5em',
        width: '2.5em',
        marginRight: '1em',
    },
    nameAndLocation: {
        display:'flex',
        flexDirection:'column',
    },
    avatarNameLocation: {
        display:'flex',
        alignItems:'center',
    },
    infoGrid:{
        width:'100%%',
        height:'100%',
        alignItems:'center',
        margin:'auto',
        backgroundColor:theme.palette.primary.dark,
      },
      firstGridItem: {
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'top',
      },
      avatar : {
        height:'3.5em',
        width:'3.5em',
        marginRight:'2em',
        marginLeft:'0.5em',
        backgroundColor:theme.palette.primary.main,
      },
      friendName: {
        color: 'white',
      },
      recentMsg: {
        color: 'lightGrey',
        fontSize: '.7em',
      },
      link: {
        textDecoration: 'none',
      },
}));

export default function ChatRoomCard(props) {
    const { room, index } = props;

    const classes = useStyles();
    const chatroomLocation = generateLocation(room);
    console.log(room.avatar);
    return (
        <Link className={classes.link} to={chatroomLocation} >
            <Paper className={classes.paper} elevation={6} >
            <Grid container direction="column" 
              spacing={1} className={classes.infoGrid}>
                    <Grid item className={classes.firstGridItem}>
                  <div className={classes.avatarNameLocation}>
                        <Avatar src={room.avatar} alt='Profile Pic' className={classes.avatar} />
                        <div className={classes.nameAndLocation}>
                        <Typography 
                            className={classes.friendName} 
                            variant='h6'
                        >
                            {room.name + ": "} 
                        </Typography>
                        <Typography 
                            id={"recent_" + index}
                            className={classes.recentMsg} 
                            variant='subtitle2'
                        >
                            {room.recentMessage ? room.recentMessage.content : ""}
                        </Typography>
                        </div>
                    </div>
                    </Grid>
                </Grid>
            </Paper>
        </Link>
    )
}

function generateLocation(room) {
    return {
        pathname: "./chatroom/" + room.roomId,
        state: { chatRoomName: room.name }
    };
}
