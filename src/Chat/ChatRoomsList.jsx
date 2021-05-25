import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../classes/LoadingSpinner";
import { db, firestore, waitForCurrentUser } from "../firebase";
import ChatRoomCard from "./chatPageComponents/chatRoomCard";

export default function ChatRooms (props) {
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

    return (
        isLoading ? <LoadingSpinner /> :
            <div>
                {chatRooms.map((room, index) =>
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
                    uRoom.recentMessage = messageRef.data().content;
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
