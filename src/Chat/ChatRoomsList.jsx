import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { db, waitForCurrentUser } from "../firebase";

async function getUserId() {
    return await waitForCurrentUser();
}

const ChatRooms = () => {

    const [user, setUser] = useState();
    const [chatRooms, setRooms] = useState([{
        uids: []
    }]);

    useEffect(() => getUserId().then(user => {
        setUser(user);
        db.collection('users').doc(user.uid)
            .collection('chatrooms')
            .get()
            .then(qSnapshot => {
                const arr = [];
                qSnapshot.forEach(doc => arr.push(doc.data()));
                setRooms(arr);
            });
    }), []);

    return (
        !user ?
        <LoadingSpinner /> :
        <div>
            {chatRooms.map((room, index) =>
                <ChatroomCard room={room} key={index} />
            )}
        </div>
    );
}

function LoadingSpinner() {

    /** @type {CSSStyleDeclaration} */
    const wrapper = {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
    return (
        <div style={wrapper}>
            <CircularProgress />
        </div>
    )
}

function ChatroomCard(props) {
    const { room } = props;
    return (
        <div>
            {room.name}
        </div>
    )
}

export default ChatRooms;
