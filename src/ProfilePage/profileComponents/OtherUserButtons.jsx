import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';
import { useStyles } from '../Profile';
import { db, firestore, getCurrentUserDataAsync } from '../../firebase';

export function OtherUserButtons(props) {
    const { isFriend, isPending, friendId } = props;
    const [isPendingFriendShip, setIsPendingFriendShip] = useState(isPending);
    const classes = useStyles();

    async function handleClick(e) {
        addFriend(friendId);
        setIsPendingFriendShip(true);
    }

    return (
        <div className={classes.buttonsWrap}>
            {isFriend ?
                (<IconButton>
                    <MessageIcon />
                </IconButton>
                ) :
                (<IconButton 
                  onClick={handleClick}
                  disabled={isPendingFriendShip}>
                    <PersonAddIcon />
                </IconButton>)}
        </div>);
}

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
