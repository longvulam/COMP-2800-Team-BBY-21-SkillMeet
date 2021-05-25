import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';
import { useHistory } from 'react-router';
import { db, getCurrentUserDataAsync } from '../../firebase';

export default function FriendCard(props) {
    const history = useHistory();
    const { friendId, friendName, chatRoomId, setLoading } = props;

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
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '95%',
                margin: 'auto',
            }}>
                <Avatar
                    onClick={() => history.push('/profile/' + friendId)}
                    style={{
                        width: '3em',
                        height: '3em',
                    }}
                    alt={friendName}
                />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Typography variant="body1"
                        style={{
                            textAlign: 'center',
                            width: '30vw',
                        }}>
                        {friendName}
                    </Typography>
                </div>
                <IconButton onClick={event => createChatroomAndRedirect(chatRoomId)}>
                    <MessageIcon />
                </IconButton>
            </div>
        </>
    );
}

async function createChatRoomInDB(friendId, friendName) {
    const currentUser = await getCurrentUserDataAsync();
    const uids = [currentUser.id, friendId];
    const res = await db.collection('chatrooms').add({
        recentMessage: "",
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
