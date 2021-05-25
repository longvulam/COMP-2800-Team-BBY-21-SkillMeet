import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import LoadingSpinner from '../classes/LoadingSpinner';
import Message from './chatPageComponents/message';
import { auth, db, waitForCurrentUser } from '../firebase';

export default function ChatRoom(props) {
    const { chatRoomId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, updateMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState("");
    const [chatRoomName, setChatRoomName] = useState("");

    useEffect(async () => {
        setDbRef(chatRoomId);
        enableListening(updateMessages);
        const name = await getChatRoomName(chatRoomId);
        setChatRoomName(name);
        setIsLoading(false);
    }, []);

    function handleChange(event) {
        const value = event.target.value;
        setCurrentMsg(value);
    }

    function submitOnCtrlEnter(event) {
        if (!event.ctrlKey || !event.key === 'Enter') return;
        sendMessageToDB(currentMsg);
        setCurrentMsg("");
    }

    function sendMessage(event) {
        sendMessageToDB(currentMsg);
        setCurrentMsg("");
    }

    return (
        isLoading ? <LoadingSpinner /> :
            <div style={styles.pageContainer}>
                <IconButton onClick={(event) => history.goBack()}>
                    <ArrowBackSharpIcon/>
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

function setDbRef(chatRoomId) {
    chatroomRef = db.collection('chatrooms').doc(chatRoomId);
    collRef = chatroomRef.collection('messages');
}

/** @param {String} newMessage */
function sendMessageToDB(newMessage) {

    if (newMessage.length === 0) return;

    newMessage = newMessage.replace('\n', '\\n');
    collRef.add({
        from: auth.currentUser.uid,
        content: newMessage,
        timeStamp: new Date().getTime()
    });
    const recentMessage = newMessage.length > 40 ? newMessage.slice(0, 40) + "..." : newMessage;
    chatroomRef.set({
        recentMessage: recentMessage
    }, { merge: true });
}

async function getChatRoomName(roomId) {
    const currentUser = await waitForCurrentUser();
    const userChatRoom = await db.collection('users').doc(currentUser.uid)
        .collection('chatrooms').where('roomId', '==', roomId).get();
    return userChatRoom.docs[0].data().name;
}
