/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import React, { useEffect, useState } from 'react';
import FriendsPageNav from './friendsComponents/FriendsPageNav';
import Grid from '@material-ui/core/Grid';
import FriendCard from './friendsComponents/FriendCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { db, waitForCurrentUser } from '../firebase';
import firebase from 'firebase';

/**
 * functional component that makes the friends page that displays a user's
 * list of current friends. It is made up of a LoadingCpinner, top navbar 
 * for navigating and FriendCard.
 */
export default function FriendsPage() {
    const [isLoadingData, setLoading] = useState(true);
    const [friendsList, setFriendsList] = useState([]);

    useEffect(async () => {
        const friends = await getAllFriendsOnUser();
        if (friends.length == 0) {
            setLoading(false);
            return;
        }
        const friendIds = friends.map(item => item.friendID);
        const profiles = await loadFriendsProfile(friendIds);
        setFriendsList(profiles);
        setLoading(false);
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
                            width: '97.5vw',
                            alignItems: 'center',
                        }}>
                        {friendsList.map((friendInfo, index) => {
                            const { displayName, id, avatar, chatRoomId } = friendInfo;
                            return (
                                <Grid item
                                    id={"friendUser_" + index}
                                    xs={12}
                                    key={id}
                                    style={{
                                        width: '100%',
                                    }}>
                                    <FriendCard
                                        setLoading={setLoading}
                                        friendId={id}
                                        chatRoomId={chatRoomId}
                                        friendName={displayName}
                                        avatar={avatar} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </>
    );
}

/**
 * gets the doc data of a firestore snapshot
 * @param querySs a snapshot from firestore database
 * @returns the doc data from the snapshot
 */
const mapDocsToData = querySs => querySs.empty ? [] :
    querySs.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });

/**
 * gets all the friends firestore doc refs.
 * @returns an array of friend's firestore doc 
 */
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

/**
 * gets the information from all the friends firestore doc refs.
 * @param friendIds an array of friend Ids
 * @returns the doc data from the snapshot
 */
async function loadFriendsProfile(friendIds) {
    const res = await Promise.all([
        db.collection('users')
            .where(firebase.firestore.FieldPath.documentId(), 'in', friendIds)
            .get().then(mapDocsToData),
        db.collection('chatrooms')
            .where('uids', 'array-contains-any', friendIds)
            .get().then(mapDocsToData)
    ])

    return await matchProfilesToChatRooms(res);
}

/**
 * matches a user with the chatroom info from firstore
 * @param results a snapshot from firebase
 * @returns friends profile with room ids
 */
async function matchProfilesToChatRooms(results) {
    const currentUser = await waitForCurrentUser();
    const friendsProfile = results[0];
    const chatRooms = results[1];
    friendsProfile.forEach(profile => {
        const uids = [profile.id, currentUser.uid];
        const chatroom = chatRooms.find(room =>
            room.uids.every(uid => uids.includes(uid))
        );
        profile.chatRoomId = chatroom ? chatroom.id : undefined;
    });
    console.log(friendsProfile);
    return friendsProfile;
}