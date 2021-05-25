import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import LoadingSpinner from '../classes/LoadingSpinner';
import Message from './chatPageComponents/message';
import { auth, db, waitForCurrentUser, firestore } from '../firebase';

export default function ChatRoom(props) {
    const { chatRoomId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, updateMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState("");
    const [chatRoomName, setChatRoomName] = useState("");

    useEffect(async () => {
        const currentUser = await waitForCurrentUser();
        await setDbRefs(currentUser, chatRoomId);
        enableListening(updateMessages);

        const name = await getChatRoomName(currentUser, chatRoomId);
        setChatRoomName(name);
        setIsLoading(false);
    }, []);

    function handleChange(event) {
        const value = event.target.value;
        setCurrentMsg(value);
    }

    function submitOnCtrlEnter(event) {
        if (!event.ctrlKey || !event.key === 'Enter') return;
        sendMessage(event);
    }

    function sendMessage(event) {
        sendMessageToDB(currentMsg);
        setCurrentMsg("");
        friendRef.set({
            newMessagesNo: firestore.FieldValue.increment(1)
        }, {merge: true});
    }

    return (
        isLoading ? <LoadingSpinner /> :
            <div style={styles.pageContainer}>
                <IconButton onClick={(event) => history.goBack()}>
                    <ArrowBackSharpIcon />
                </IconButton>
                <Paper>
                    <div>{chatRoomName}</div>
                </Paper>

                <div style={styles.msgContainer}>
                    {messages.map((msg, index) =>
                        <Message
                            key={index}
                            content={msg.content}
                            from={msg.from}
                            timeStamp={msg.timeStamp}
                        />)}
                </div>
                <Paper>
                    <InputBase value={currentMsg}
                        multiline
                        onChange={handleChange}
                        onKeyPress={submitOnCtrlEnter}
                    />
                    <Button onClick={sendMessage}>Send message</Button>
                </Paper>
            </div>
    );
}

const styles = {
    msgContainer: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        flex: 1,
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100vh',
    }
}

let collRef = db.collection('chatrooms')
    .doc()
    .collection('messages');
let chatroomRef = db.collection('chatrooms')
    .doc();

let friendRef = db.collection('users');

async function enableListening(updateMessages) {
    collRef.onSnapshot(querySnapshot => {
        const arr = [];
        querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                arr.push(change.doc.data());
            }
        });
        arr.sort((a, b) => a.timeStamp > b.timeStamp ? 1 : -1);
        updateMessages(oldArray => {
            return [...oldArray, ...arr];
        });
    });
}

async function setDbRefs(currentUser, chatRoomId) {
    chatroomRef = db.collection('chatrooms').doc(chatRoomId);
    collRef = chatroomRef.collection('messages');
    const chatroom = await chatroomRef.get().then(doc => doc.data());
    const friendId = chatroom.uids.find(id => id !== currentUser.uid);
    friendRef = friendRef.doc(friendId);
}

/** @param {String} newMessage */
async function sendMessageToDB(newMessage) {
    if (newMessage.length === 0) return;

    const uid = auth.currentUser ? auth.currentUser.uid : await waitForCurrentUser();

    newMessage = newMessage.replace('\n', '\\n');
    const messageRef = await collRef.add({
        from: uid,
        content: newMessage,
        timeStamp: new Date().getTime()
    });

    // const recentMessage = newMessage.length > 40 ? newMessage.slice(0, 40) + "..." : newMessage;
    chatroomRef.set({
        recentMessage: messageRef
    }, { merge: true });
}

async function getChatRoomName(currentUser, roomId) {
    const userChatRoom = await db.collection('users').doc(currentUser.uid)
        .collection('chatrooms').where('roomId', '==', roomId).get();
    return userChatRoom.docs[0].data().name;
}
