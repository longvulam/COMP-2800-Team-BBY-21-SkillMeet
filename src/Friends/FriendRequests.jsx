import React, { useEffect, useState } from 'react';
import FriendsPageNav from './friendsComponents/friendsPageNav';
import Grid from '@material-ui/core/Grid';
import FriendRequest from '../SearchPage/searchComponents//UserSearchCard';
import UserPendingCard2 from '../PendingRequests/UserPendingCard2.0';

import { db, auth } from '../firebase';

export default function FriendsPage() {
  const [requests, setRequests] = useState([]);
  
  useEffect(async ()=> {
      const currentUserID = await getCurrentUserID();

      getFriendDataFromID(currentUserID, setRequests);
      removeRequestNotifications(currentUserID);
  },[]);
  
  return (
    <>
      <FriendsPageNav/>
      <div
        style={{
          position:'fixed',
          top:'3em',
          width:'100vw',
          overflowY:'scroll',
          height: 'calc(100vh - 7.2em)',
        }}>
        <Grid container direction="column" spacing = {3}
        style={{
          margin: 'auto',
          marginTop: '2vh',
          width: '95vw',
          alignItems: 'center',

        }}>

        {requests.map(request => {
          const { displayName, city, id, avatar} = request;
          return (
            <Grid item xs={12}
            key={id} 
            style={{
              width:'100%',
            }}>
            <UserPendingCard2 
                name={displayName}
                city={city}
                id={id}
                setRequests={setRequests}
                avatar={avatar}
            />
            </Grid>
          );
        })}
        </Grid>
      </div>
    </>
  );

}

async function getFriendDataFromID(currentUserID, setRequests) {
    const friendIDs = await getFriendRequestIDs(currentUserID);
    console.log('FriendRequests', friendIDs);
    const friendDocs = await Promise.all(friendIDs.map(friendID => {
        return db.collection('users').doc(friendID).get().then(doc=> {
            const data = doc.data();
            data.id = doc.id;
            return data;
        });
    }));
    console.log('FriendData', friendDocs);
    setRequests(friendDocs);
}

async function getFriendRequestIDs(currentUserID) {
    const friendRequests = [];
    const requests = 
        await db.collection('users')
        .doc(currentUserID).collection('Friends')
        .where("isPending", "==", true)
        .get();
    requests.forEach(request => {friendRequests.push(request.data().friendID)});
    return (friendRequests);
}

function getCurrentUserID() {
    return new Promise((resolve, reject) =>
        auth.onAuthStateChanged((user) => {
            if (!user) return;
            resolve(user.uid);   
        })
    );
}

async function removeRequestNotifications(userId) {
    db.doc('users/' + userId).set({
        newRequestsNo: 0
    }, {merge: true});
}
