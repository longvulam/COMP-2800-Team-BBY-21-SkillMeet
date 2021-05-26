import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../classes/LoadingSpinner";
import { db, firestore, waitForCurrentUser } from "../firebase";
import ChatRoomCard from "./chatPageComponents/chatRoomCard";
import firebase from 'firebase';

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
    
    const newRooms = chatRooms.filter(room=> !room.hasOwnProperty('recentMessage'));
    const sortedRooms = chatRooms.filter(room => room.recentMessage).sort((a, b) =>
        a.recentMessage.timeStamp < b.recentMessage.timeStamp ? 1 : -1);
    return (
        isLoading ? <LoadingSpinner /> :
            <div>
                {[...newRooms, ...sortedRooms].map((room, index) =>
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
                console.log("hi");
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
                    console.log('hi2' + uRoom);
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
