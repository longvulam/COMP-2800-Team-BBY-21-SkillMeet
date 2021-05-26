import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../classes/LoadingSpinner";
import { db, waitForCurrentUser } from "../firebase";
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

const ChatRooms = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [chatRooms, setRooms] = useState([{
        uids: []
    }]);

    function updateData(roomsData) {
        setRooms(roomsData);
        setIsLoading(false);
    }

    useEffect(() => loadData(updateData), []);

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

export default ChatRooms;
