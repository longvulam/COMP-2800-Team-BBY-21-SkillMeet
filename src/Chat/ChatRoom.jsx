import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, InputBase, Paper, Fab } from '@material-ui/core';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import LoadingSpinner from '../classes/LoadingSpinner';
import Message from './chatPageComponents/message';
import { auth, db, waitForCurrentUser } from '../firebase';
import { GolfCourseRounded } from '@material-ui/icons';

export default function ChatRoom(props) {
    const { chatRoomId } = useParams();
    const history = useHistory();
    const classes = useStyles();
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
