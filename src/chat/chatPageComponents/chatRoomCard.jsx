import { Avatar, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    avatar : {
        height:'2.5em',
        width:'2.5em',
        marginRight:'1em',
      },
}));

async function navigateToProfile(event) {
    
}

export default function ChatRoomCard(props) {
    const { room } = props;

    const classes = useStyles();
const location = {
    pathname: "./chatroom/" + room.roomId,
    state: { chatRoomName: room.name }
}
    return (
        <Link to={location} >
            <Paper className={classes.paper} >
                <Avatar className={classes.avatar}/>
                <div>{room.name}</div>
                <div>{room.recentMessage}</div>
            </Paper>
        </Link>
    )
}