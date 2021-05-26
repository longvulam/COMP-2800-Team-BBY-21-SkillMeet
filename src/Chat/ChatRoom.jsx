import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import LoadingSpinner from '../common/LoadingSpinner';
import Message from './chatPageComponents/message';
import { auth, db, waitForCurrentUser, firestore } from '../firebase';

export default function ChatRoom(props) {
    const { chatRoomId } = useParams();
    const history = useHistory();
    const classes = useStyles();
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
            <div className={classes.pageContainer}>

                <Paper style={{ marginBottom: '1em', display:'flex', justifyContent:'space-between' }}>
                    <div style={{ fontSize: '32pt', backgroundColor: 'cyan', width: '100%' }}>{chatRoomName}
                    </div>
                    <Button size='small'  style={{ backgroundColor: 'cyan' }} onClick={(event) => history.goBack()}>
                            <ArrowBackSharpIcon />
                        </Button>
                </Paper>

                <div className={classes.msgContainer}>
                    {messages.map((msg, index) =>
                        <Message
                            key={index}
                            content={msg.content}
                            from={msg.from}
                            timeStamp={msg.timeStamp}
                        />)}
                </div>
                <Paper className={classes.messagePaper}>
                    <InputBase value={currentMsg}
                        multiline
                        className={classes.inputMessage}
                        placeholder='type message. . .'
                        onChange={handleChange}
                        onKeyPress={submitOnCtrlEnter}
                    />
                    <Button className={classes.sendButton} onClick={sendMessage}>Send message</Button>
                </Paper>
            </div>
    );
}

const useStyles = makeStyles((theme) => ({
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
    },
    inputMessage: {
        width: '60vw',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '.5em',
        margin: '1em',
        padding: '.5em',
    },
    sendButton: {
        color: 'goldenRod',
        marginLeft: '5vw',
        marginRight: '1vw',
    },
    messagePaper: {
        display: 'flex',
        alignItems: 'center',
    }
}));

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

    chatroomRef.set({
        recentMessage: messageRef
    }, { merge: true });
}

async function getChatRoomName(currentUser, roomId) {
    const userChatRoom = await db.collection('users').doc(currentUser.uid)
        .collection('chatrooms').where('roomId', '==', roomId).get();
    return userChatRoom.docs[0].data().name;
}
