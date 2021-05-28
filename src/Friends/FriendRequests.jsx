/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import React, { useEffect, useState } from 'react';
import FriendsPageNav from './friendsComponents/FriendsPageNav';
import Grid from '@material-ui/core/Grid';
import UserPendingCard2 from '../PendingRequests/UserPendingCard2.0';
import { db, auth } from '../firebase';

/**
 * functional component that makes up the friends request page.   This page displays
 * all of your friend requests, with buttons for accept and decline. It also has a 
 * top navbar to navigate from friends requests to friends list.
 * 
 */
export default function FriendsPage() {
  const [requests, setRequests] = useState([]);

  /**
   * set a var to the current user ID from firestore auth and runs 2 other functions.
   */
  useEffect(async () => {
    const currentUserID = await getCurrentUserID();

    getFriendDataFromID(currentUserID, setRequests);
    removeRequestNotifications(currentUserID);
  }, []);

  return (
    <>
      <FriendsPageNav />
      <div
        style={{
          position: 'fixed',
          top: '3em',
          width: '100vw',
          overflowY: 'scroll',
          height: 'calc(100vh - 7.2em)',
        }}>
        <Grid container direction="column" spacing={3}
          style={{
            margin: 'auto',
            marginTop: '2vh',
            width: '95vw',
            alignItems: 'center',

          }}>

          {requests.map((request, index) => {
            const { displayName, city, id, avatar } = request;
            return (
              <Grid id={"pendingUser_" + index} item xs={12}
                key={id}
                style={{
                  width: '100%',
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

/**
 * gets friends ids by querying firestore 
 * @param currentUserID the doc id of the current user from firebase auth
 * @param setRequests used to update the requests array in state
 */
async function getFriendDataFromID(currentUserID, setRequests) {
  const friendIDs = await getFriendRequestIDs(currentUserID);
  console.log('FriendRequests', friendIDs);
  const friendDocs = await Promise.all(friendIDs.map(friendID => {
    return db.collection('users').doc(friendID).get().then(doc => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
  }));
  console.log('FriendData', friendDocs);
  setRequests(friendDocs);
}

/**
 * gets array of ids of users that sent you a friend request by querying firestore
 * @param currentUserID  the doc id of the current user from firebase auth
 * @returns friendRequests an array of ids of users that sent you a friend request
 */
async function getFriendRequestIDs(currentUserID) {
  const friendRequests = [];
  const requests =
    await db.collection('users')
      .doc(currentUserID).collection('Friends')
      .where("isPending", "==", true)
      .get();
  requests.forEach(request => { friendRequests.push(request.data().friendID) });
  return (friendRequests);
}

/**
 * gets the current user id from firestore auth on change
 * @returns current user id
 */
function getCurrentUserID() {
  return new Promise((resolve, reject) =>
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      resolve(user.uid);
    })
  );
}

/**
 * removes the request notification showing on the badge element
 * @param userId the doc id of the current user from firebase auth
 */
async function removeRequestNotifications(userId) {
  db.doc('users/' + userId).set({
    newRequestsNo: 0
  }, { merge: true });
}
