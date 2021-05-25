import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../classes/LoadingSpinner";
import { db, waitForCurrentUser } from "../firebase";
import ChatRoomCard from "./chatPageComponents/chatRoomCard";

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

async function loadData(user, callBack) {
    const res = await Promise.all([
        getUserChatRooms(user.uid),
        getRecentMessages(user.uid),
    ]);

    const userRooms = res[0];
    if (userRooms.length === 0) return;

    const roomsColl = res[1];
    userRooms.forEach(userRoom => {
        const room = roomsColl.find(r => r.id === userRoom.roomId);
        userRoom.recentMessage = room ? room.recentMessage : "";
    })
    callBack(userRooms);
}

async function removeMessageNotifications(user) {
    db.doc('users/' + user.uid).set({
        newMessagesNo: 0
    }, {merge: true})
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

    useEffect(async () => {
        const user = await waitForCurrentUser();
        loadData(user, updateData);
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

export default ChatRooms;
