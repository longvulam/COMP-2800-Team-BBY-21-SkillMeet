import React, { useEffect, useState } from 'react';
import FriendsPageNav from './friendsComponents/friendsPageNav';
import Grid from '@material-ui/core/Grid';

import FriendCard from './friendsComponents/FriendCard';
import LoadingSpinner from '../classes/LoadingSpinner';
import { db, waitForCurrentUser } from '../firebase';
import firebase from 'firebase';

export default function FriendsPage() {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [friendsList, setFriendsList] = useState([]);

    useEffect(async () => {
        const friends = await getAllFriendsOnUser();
        if (friends.length == 0) {
            setIsLoadingData(false);
            return;
        }
        const friendIds = friends.map(item => item.friendID);
        const profiles = await loadFriendsProfile(friendIds);
        setFriendsList(profiles);
        setIsLoadingData(false);
    }, []);

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
                            const { displayName, id, chatRoomId } = friendInfo;
                            return (
                                <Grid item
                                    xs={12}
                                    key={id}
                                    style={{
                                        width: '100%',
                                    }}>
                                    <FriendCard
                                        friendId={id}
                                        chatRoomId={chatRoomId}
                                        friendName={displayName} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </>
    );
}

const mapDocsToData = querySs => querySs.empty ? [] :
    querySs.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });

async function getAllFriendsOnUser() {
    const currentUser = await waitForCurrentUser();
    const friendsRef = db.collection('users').doc(currentUser.uid)
        .collection('Friends');

    const res = await Promise.all([
        friendsRef.where('isPending', '==', false).get().then(mapDocsToData),
        friendsRef.where('isConfirmed', '==', true).get().then(mapDocsToData)
    ]);
    const friends = [...res[0], ...res[1]];
    return friends;
}

async function loadFriendsProfile(friendIds) {
    const res = await Promise.all([
        db.collection('users')
            .where(firebase.firestore.FieldPath.documentId(), 'in', friendIds)
            .get().then(mapDocsToData),
        db.collection('chatrooms')
            .where('uids', 'array-contains-any', friendIds)
            .get().then(mapDocsToData)
    ])

    return matchProfilesToChatRooms(res);
}

function matchProfilesToChatRooms(results) {
    const friendsProfile = results[0];
    const chatRooms = results[1];
    friendsProfile.forEach(profile => {
        const chatroom = chatRooms.find(room => room.uids.find(uid => uid === profile.id));
        profile.chatRoomId = chatroom ? chatroom.id : undefined;
    });
    return friendsProfile;
}