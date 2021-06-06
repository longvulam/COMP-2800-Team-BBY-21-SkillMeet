/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { db, firestore, waitForCurrentUser } from "../firebase";
import ChatRoomCard from "./chatPageComponents/ChatRoomCard";
import firebase from 'firebase';
import Grid from '@material-ui/core/Grid';

/**
 * Functional component built using Material UI components to create a chat-rooms list, 
 * Uses firestore to retrieve the chat rooms associated with currently logged in user.
 */
export default function ChatRoomsList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [chatRooms, setRooms] = useState([]);

    /** Runs after chat rooms data are loaded */
    async function afterLoaded(newRooms) {
        setRooms(prevValues => [...prevValues, ...newRooms]);
        setIsLoading(false);
    }

    /** Gets user and listen to changes on chat rooms. 
     * Also zero-out message notification numbers from current user.
     * Runs only once. */
    useEffect(async () => {
        const user = await waitForCurrentUser();
        subscribeToChanges(user, afterLoaded);
        removeMessageNotifications(user);
    }, []);

    const sortedRooms = getSortedChatrooms(chatRooms);
    return (
        isLoading ? <LoadingSpinner /> :
            <Grid container
            style={{
                marginTop:'1em',
            }}
            spacing={1}>
                {sortedRooms.length === 0 ? EmptyListMessage() :
                    sortedRooms.map((room, index) =>
                        <Grid item xs={12} key={index}>
                        <ChatRoomCard
                            room={room}
                            index={index}
                             />
                        </Grid>
                    )}
            </Grid>
    );
}

/** Creates a new array of sorted rooms */
function getSortedChatrooms(chatRooms) {
    const newRooms = chatRooms.filter(room => !room.hasOwnProperty('recentMessage'));
    const sortedRooms = chatRooms.filter(room => room.recentMessage)
        .sort((a, b) => a.recentMessage.timeStamp < b.recentMessage.timeStamp ? 1 : -1);
    return [ ...newRooms, ...sortedRooms ];
}

/** Message stateless component for empty chat rooms list. */
function EmptyListMessage() {

    /** @type {CSSStyleDeclaration} */
    const emptyChatListStyle = {
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (
        <div style={emptyChatListStyle}>
            <div>You have no messages</div>
        </div>
    );
}

/** Subscribes to chat room and recent message changes. */
async function subscribeToChanges(user, callback) {
    db.collection('users/' + user.uid + '/chatrooms')
        .onSnapshot(updateChatrooms);

    let unsubscribe = () => '';
    async function updateChatrooms(userRoomsSs) {
        const newRooms = [];

        userRoomsSs.docChanges().forEach(change => {
            if (change.type === "added") {
                newRooms.push(change.doc.data());
            }
        });

        if (newRooms.length === 0) {
            callback(newRooms);
            return;
        }

        unsubscribe();
        const roomIds = newRooms.map(uRoom => uRoom.roomId);

        unsubscribe = db.collection('chatrooms')
            .where(firestore.FieldPath.documentId(), 'in', roomIds)
            .onSnapshot(async chatroomsSs => {
                const changes = [];
                chatroomsSs.docChanges().forEach(async change => {
                    if (change.type === "delete") return;
                    const room = change.doc.data();
                    room.id = change.doc.id;
                    changes.push(room);
                });
                const friendIds = changes.map(change => change.uids.find(uid => uid !== user.uid))
                const friendsRef = db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', friendIds);
                const friendsData = await friendsRef.get()
                    .then(snapshot => snapshot.docs.map(doc => {
                        const data = doc.data();
                        data.id = doc.id;
                        return data;
                    }));
                await Promise.all(changes.map(async chatRoom => {
                    const uRoom = await newRooms.find(uRoom => uRoom.roomId === chatRoom.id);
                    const friendId = chatRoom.uids.find(uid => uid !== user.uid);
                    const friend = friendsData.find(fr => fr.id === friendId);
                    if (chatRoom.recentMessage) {
                        const messageRef = await chatRoom.recentMessage.get();
                        const message = messageRef.data();
                        /** @type {String}*/
                        let content = message.content;
                        message.content = content.length > 40 ? content.slice(0, 40) : content;
                        uRoom.recentMessage = message;
                    }

                    uRoom.avatar = friend ? friend.avatar : "";
                }));

                callback(newRooms);
            });
    };
}

async function removeMessageNotifications(user) {
    db.doc('users/' + user.uid).set({
        newMessagesNo: 0
    }, { merge: true })
}
