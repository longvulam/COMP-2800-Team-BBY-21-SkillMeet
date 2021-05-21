import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Message from './Message';
import { auth, db } from '../firebase';
import { Button, InputBase, Paper } from '@material-ui/core';

let collRef = db.collection('chatrooms')
    .doc()
    .collection('messages');

async function enableListening(updateMessages) {
    collRef.onSnapshot(querySnapshot => {
        const arr = [];
        querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                arr.push(change.doc.data());
            }
        });
        updateMessages(oldArray => {
            return [...oldArray, ...arr];
        })
    });
}
function setDbRef(chatRoomId) {
    collRef = db.collection('chatrooms')
        .doc(chatRoomId)
        .collection('messages');
}

function sendMessageToDB(newMessage) {
    newMessage = newMessage.replace('\n', '\\n');
    collRef.add({
        from: auth.currentUser.uid,
        content: newMessage,
        timeStamp: new Date().getTime()
    });
}

const ChatRoom = () => {

    const { chatRoomId } = useParams();
    const [messages, updateMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState([]);

    useEffect(() => {
        setDbRef(chatRoomId);
        enableListening(updateMessages);
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
        <div style={styles.pageContainer}>
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
                <Button onClick={sendMessage}
                >Send message</Button>
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

export default ChatRoom;
