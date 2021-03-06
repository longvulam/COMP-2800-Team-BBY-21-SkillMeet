import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MessageIcon from '@material-ui/icons/Message';
import { useHistory } from 'react-router';
import { db, getCurrentUserDataAsync } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        margin: 'auto',
        height: '4em',
        backgroundColor: theme.palette.primary.dark,
    },
    friendName: {
        color: 'white',
    },
    messageFab: {
        backgroundColor: 'white',
        height: '3em',
        width: '3em',
        color: theme.palette.primary.main,
    }
}));

/**
 * functional component that displays a user's friends' information, and allows
 * you to access your chat with them.
 * @param props props passed to the function
 * 
 */
export default function FriendCard(props) {
    const history = useHistory();
    const { friendId, friendName, chatRoomId, setLoading, avatar } = props;
    const classes = useStyles();
    async function createChatroomAndRedirect() {
        setLoading(true);
        try {
            console.log("chatRoomId: " + chatRoomId);
            let roomId = chatRoomId;
            if (!roomId) {
                roomId = await createChatRoomInDB(friendId, friendName);
            }

            history.push('/chatRoom/' + roomId);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Avatar
                    onClick={() => history.push('/profile/' + friendId)}
                    src={avatar}
                    style={{
                        width: '2.5em',
                        height: '2.5em',
                    }}
                    alt={friendName}
                />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Typography
                        className={classes.friendName}
                        align='center'
                        variant='h6'>
                        {friendName}
                    </Typography>
                </div>
                <Fab
                    id={friendId}
                    className={classes.messageFab}
                    onClick={event => createChatroomAndRedirect(chatRoomId)}>
                    <MessageIcon />
                </Fab>
            </Paper>
        </>
    );
}

/**
 * creates a chatroom in the database when two users start a chat for the first time.
 * @param friendId friend doc ID from firestore
 * @param friendName friend name from their user doc
 * @returns roomId, the Id of the chatroom that the two users share
 */
async function createChatRoomInDB(friendId, friendName) {
    const currentUser = await getCurrentUserDataAsync();
    const uids = [currentUser.id, friendId];
    const res = await db.collection('chatrooms').add({
        uids
    });

    const roomId = res.id;
    db.collection('users').doc(currentUser.id)
        .collection('chatrooms').add({
            name: friendName,
            roomId
        })
    db.collection('users').doc(friendId)
        .collection('chatrooms').add({
            name: currentUser.displayName,
            roomId
        })
    return roomId;
}
