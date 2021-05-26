import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../classes/LoadingSpinner";
import { db, firestore, waitForCurrentUser } from "../firebase";
import ChatRoomCard from "./chatPageComponents/chatRoomCard";
import firebase from 'firebase';

async function getUserChatRooms(uid) {
    const qSnapshot = await db.collection('users').doc(uid)
        .collection('chatrooms')
        .get()
    return qSnapshot.docs.map(doc => doc.data());
};

async function getRecentMessages(uid) {
    const qSnapshot = await db.collection('chatrooms')
        .where('uids', 'array-contains', uid).get();
    return qSnapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });
};

async function loadData(callBack) {
    const user = await waitForCurrentUser();

    const res = await Promise.all([
        getUserChatRooms(user.uid),
        getRecentMessages(user.uid),
    ]);

    const userRooms = res[0];
    if (userRooms.length === 0) return;

    const roomsColl = res[1];
    const friendIds = roomsColl.map(room => room.uids.find(uid => uid !== user.uid));

    const friendsRef = db.collection('users').where(firebase.firestore.FieldPath.documentId(), 'in', friendIds);
    const friendsData = await friendsRef.get()
        .then(querySs => querySs.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }));
    userRooms.forEach(userRoom => {
        const room = roomsColl.find(ur => ur.id === userRoom.roomId);
        const friendId = room.uids.find(uid => uid !== user.uid);
        const friend = friendsData.find(fr => fr.id === friendId);
        userRoom.recentMessage = room ? room.recentMessage : "";
        userRoom.avatar = friend ? friend.avatar : "";
    })

    callBack(userRooms);
}


export default function ChatRooms(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [chatRooms, setRooms] = useState([]);

    async function afterLoaded(newRooms) {
        setRooms(prevValues => [...prevValues, ...newRooms]);
        setIsLoading(false);
    }

    useEffect(async () => {
        const user = await waitForCurrentUser();
        subscribeToChanges(user, afterLoaded);
        removeMessageNotifications(user);
    }, []);

    const sortedRooms = chatRooms.sort((a, b) =>
        a.recentMessage.timeStamp < b.recentMessage.timeStamp ? 1 : -1);
    return (
        isLoading ? <LoadingSpinner /> :
            <div>
                {sortedRooms.map((room, index) =>
                    <ChatRoomCard
                        room={room}
                        key={index} />
                )}
            </div>
    );
}

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

        if (newRooms.length === 0) return;

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

                await Promise.all(changes.map(async chatRoom => {
                    const messageRef = await chatRoom.recentMessage.get();
                    const uRoom = newRooms.find(uRoom => uRoom.roomId === chatRoom.id);
                    const message = messageRef.data();
                    /** @type {String}*/
                    let content = message.content;
                    message.content = content.length > 40 ? content.slice(0, 40) : content;
                    uRoom.recentMessage = message;
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
