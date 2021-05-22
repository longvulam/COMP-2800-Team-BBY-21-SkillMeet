import React, { useEffect, useState } from 'react';
import FriendsPageNav from './friendsComponents/friendsPageNav';
import Grid from '@material-ui/core/Grid';

import Friend from './friendsComponents/FriendCard';
import LoadingSpinner from '../classes/LoadingSpinner';
import { db, waitForCurrentUser } from '../firebase';
import firebase from 'firebase';

export default function FriendsPage() {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [friendsList, setFriendsList] = useState([]);

    function loadFriendsData(friendIds) {
        db.collection('users')
            .where(firebase.firestore.FieldPath.documentId(), 'in', friendIds)
            .get()
            .then(querySs => {
                if (!querySs.empty) {
                    const friendsData = querySs.docs.map(doc => doc.data());
                    console.log(friendsData);
                    setFriendsList(friendsData);
                }
                setIsLoadingData(false);
            });
    }

    useEffect(
        () => waitForCurrentUser()
            .then((currentUser) => {
                const friendsRef = db.collection('users').doc(currentUser.uid)
                    .collection('Friends');

                Promise.all([
                    friendsRef
                    .where('isPending', '==', false)
                    .get()
                    .then(querySs => {
                        const arr = [];
                        querySs.forEach(doc => arr.push(doc.data()));
                        return arr;
                    }),
                    friendsRef.where('isConfirmed', '==', true)
                    .get()
                    .then(querySs => {
                        const arr = [];
                        querySs.forEach(doc => arr.push(doc.data()));
                        return arr;
                    })
                ]).then(res => {
                    const friends = [...res[0], ...res[1]];
                    if (friends.length == 0) {
                        setIsLoadingData(false);
                        return;
                    }
                    const friendIds = friends.map(item => item.friendID);
                    loadFriendsData(friendIds);
                });
            }).catch((err) => {
                console.log(err);
            })
        , []);

    const data = friendData;
    return (
        isLoadingData ? <LoadingSpinner /> :
            <>
                <FriendsPageNav />
                <div
                    style={{
                        position: 'fixed',
                        top: '3em',
                        width: '100vw',
                        overflowY: 'scroll',
                        overFlowX: 'hidden',
                    }}>
                    <Grid container direction="column" spacing={3}
                        style={{
                            margin: 'auto',
                            marginTop: '2vh',
                            width: '95vw',
                            alignItems: 'center',
                        }}>
                        {friendsList.map(friendInfo => {
                            const { displayName, id } = friendInfo;
                            return (
                                <Grid item
                                    xs={12}
                                    key={id}
                                    style={{
                                        width: '100%',
                                    }}>
                                    <Friend name={displayName} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </>
    );

}

const friendData = [
    { Name: 'Carly Orr' },
    { Name: 'Chrstopher Thompson' },
    { Name: 'Owen Arando' },
    { Name: 'Dustin Lott' },
    { Name: 'Arunab Singh' },
    { Name: 'Lam Long Vu' },
];
