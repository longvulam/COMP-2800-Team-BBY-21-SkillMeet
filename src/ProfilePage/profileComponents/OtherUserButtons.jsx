import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';
import { useStyles } from '../Profile';
import { db, firestore, getCurrentUserDataAsync } from '../../firebase';
import { useHistory } from 'react-router';

/**
 * functional component that contains buttons that are displayed on a
 * friend's profile.
 * @param {*} props 
 * @returns 
 */
export function OtherUserButtons(props) {
    const history = useHistory();
    const { profileData, isFriend, setLoading } = props;
    const [isPendingFriendShip, setIsPendingFriendShip] = useState(profileData.isPending);
    const classes = useStyles();

    async function handleClick(e) {
        addFriend(profileData.id);
        setIsPendingFriendShip(true);
    }

    /**
     * creates a chatroom and then redirects the user to the chatroom page.
     * @param e an event of clicking on the IconButton
     */
    async function createChatroomAndRedirect(e) {
        setLoading(true);
        try {
            let roomId = profileData.chatRoomId;
            if (!roomId) {
                roomId = await createChatRoomInDB(profileData.id, profileData.displayName);
            }

            history.push('/chatRoom/' + roomId);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <div className={classes.buttonsWrap}>
            {isFriend ?
                (<IconButton onClick={createChatroomAndRedirect}>
                    <MessageIcon />
                </IconButton>) :
                (<IconButton
                    onClick={handleClick}
                    disabled={isPendingFriendShip}>
                    <PersonAddIcon />
                </IconButton>)}
        </div>);
}

/**
 * uses queries to create data for a chatroom in the firestore database.
 * @param friendId user id of a friend
 * @param friendName name of a friend
 * @returns 
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

/**
 * request to add a friend by querying firestore and creating documents in both user's
 * 'Friends' collections.
 * @param uid user 
 */
async function addFriend(uid) {
    const currentUserData = await getCurrentUserDataAsync();

    db.collection('users').doc(currentUserData.id).collection('Friends').doc('sent' + uid)
        .set({
            isConfirmed: false,
            friendID: uid,
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    const friendRef = db.collection('users').doc(uid);

    friendRef.set({
        newRequestsNo: firestore.FieldValue.increment(1)
    }, { merge: true });

    friendRef.collection('Friends').doc('received' + currentUserData.id)
        .set({
            isPending: true,
            friendID: currentUserData.id
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}
