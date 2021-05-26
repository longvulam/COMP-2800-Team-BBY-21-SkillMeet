import { Avatar, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
}));

export default function ChatRoomCard(props) {
    const { room } = props;

    const classes = useStyles();
    const chatroomLocation = generateLocation(room);

    return (
        <Link to={chatroomLocation} >
            <Paper className={classes.paper} >
                <Avatar src={room.avatar} alt='Profile Pic' className={classes.avatar} />
                <div>{room.name}</div>
                <div>{room.recentMessage}</div>
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
