/**
 * @author Team21 Bcit 
 * @version May 2021
 */

import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, InputBase, Paper } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LoadingSpinner from '../common/LoadingSpinner';
import Message from './chatPageComponents/Message';
import { auth, db, waitForCurrentUser, firestore, getCurrentUserDataAsync } from '../firebase';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';

/**
 * Functional component built using Material UI components to create a chat-room, 
 * Uses firestore to retrieve the messages associated with the current chat room.
 */
export default function ChatRoom(props) {
    const { chatRoomId } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [messages, updateMessages] = useState([]);
    const [currentMsg, setCurrentMsg] = useState("");
    const [chatRoomName, setChatRoomName] = useState("");
    const [currentUserAvatar, setCurrentUserAvatar] = useState("");
    const [otherUserAvatar, setOtherUserAvatar] = useState("");
    const [friendId, setFriendId] = useState("");

    /** Loads initial data. */
    useEffect(async () => {
        const currentUser = await waitForCurrentUser();
        const currentUserDocData = await getCurrentUserDataAsync(currentUser.uid);
        const friendUid = await setDbRefsAndGetFriendId(currentUser, chatRoomId);
        const friendData = await getFriend(friendUid);
        setCurrentUserAvatar(currentUserDocData.avatar);
        setFriendId(friendData.id);
        setOtherUserAvatar(friendData.avatar);
        subscribeToChanges(updateMessages);

        setChatRoomName(friendData.displayName);
        setIsLoading(false);
    }, []);

    /** Updates the current message state from input. */
    function handleChange(event) {
        const value = event.target.value;
        setCurrentMsg(value);
    }

    /** Sends the input text when user presses ctrl+enter keys. */
    function submitOnCtrlEnter(event) {
        if (!event.ctrlKey || !event.key === 'Enter') return;
        sendMessage(event);
    }

    /** Insert new message to db and send notification to other user. */
    function sendMessage(event) {
        sendMessageToDB(currentMsg);
        setCurrentMsg("");
        db.collection('users').doc(friendId).set({
            newMessagesNo: firestore.FieldValue.increment(1)
        }, {merge: true});
    }

    return (
        isLoading ? <LoadingSpinner /> :
            <div className={classes.pageContainer}>

                <div className={classes.chatRoomHeader}>
                    <Typography variant="h4" 
                    className={classes.chatRoomHeaderText}>
                      {chatRoomName}
                    </Typography>
                    <Button 
                        id="backBtn"
                        className={classes.backButton} 
                        variant="contained"
                        color="secondary"
                        onClick={(event) => history.goBack()}>
                            <ArrowBackIcon className={classes.backArrowIcon} />
                    </Button>
                </div>

                <div className={classes.msgContainer}>
                    {messages.map((msg, index) =>
                        <Message
                            key={index}
                            content={msg.content}
                            from={msg.from}
                            timeStamp={msg.timeStamp}
                            avatar={msg.from === auth.currentUser.uid ? currentUserAvatar : otherUserAvatar}
                        />)}
                </div>
                <Paper 
                elevation={5}
                className={classes.messagePaper}>
                    <InputBase 
                        id="messageField"
                        value={currentMsg}
                        multiline
                        className={classes.inputMessage}
                        placeholder='type message. . .'
                        onChange={handleChange}
                        onKeyPress={submitOnCtrlEnter}
                    />
                    <Button
                      id="sendMsgBtn"
                      variant="contained"
                      color="primary"
                      className={classes.sendButton} 
                      onClick={sendMessage}>
                        <SendIcon className={classes.sendIcon} />
                      </Button>
                </Paper>
            </div>
    );
}

const useStyles = makeStyles((theme) => ({
    msgContainer: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        flex: 1,
        paddingBottom:'2em',
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100vh',
    },
    messagePaper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        minHeight:'4.5em',
    },
    sendButton: {
        color: 'white',
        marginRight: '1.5em',
        height:'3em',
        width:'4em',
    },
    inputMessage: {
        width: 'calc(100vw - 7em)',
        backgroundColor: theme.palette.primary.main,
        color:'white',
        borderRadius: '.5em',
        marginLeft: '0.5em',
        overflowY:'scroll',
        verticalAlign: 'textBottom',
        minHeight:'3em',
        marginTop:'1em',
        marginBottom:'1em',
        padding:'0.5em',
    },
    chatRoomHeader: {
      margin:'auto',
      marginBottom: '1em', 
      display:'flex', 
      justifyContent:'space-between',
      alignItems:'flex-end',
      paddingTop:'0.25em',
      width:'100vw',
      height:'3em',
      backgroundColor:theme.palette.primary.dark,
    },
    chatRoomHeaderText:{
      marginLeft:'0.5em',
      color:'white',
    },
    backButton: {
      height:'2.5em',
      width:'1.5em',
      marginBottom:'0.5em',
      marginRight:'0.5em',
      backgroundColor: 'darkOrange',
    },
    backArrowIcon:{
        color:'white',
        height:'1.25em',
        width:'1.5em',
    },
}));

let collRef = db.collection('chatrooms')
    .doc()
    .collection('messages');
let chatroomRef = db.collection('chatrooms')
    .doc();

/** 
 * Listen to new messages and updates the state via the callback function
 * @param {*} updateMessages
 */
async function subscribeToChanges(updateMessages) {
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

/** Updates the db ref to the new chat room id and returns with the friend uid. */
async function setDbRefsAndGetFriendId(currentUser, chatRoomId) {
    chatroomRef = db.collection('chatrooms').doc(chatRoomId);
    collRef = chatroomRef.collection('messages');
    const chatroom = await chatroomRef.get().then(doc => doc.data());
    return chatroom.uids.find(id => id !== currentUser.uid);
}

/** Retrieves the friend doc from Firestore. */
async function getFriend(friendId) {
    const friendDoc = await db.collection('users').doc(friendId).get();
    const friendData = friendDoc.data();
    friendData.id = friendDoc.id;
    return friendData;
}

/** 
 * Sends the new message to the db..
 * @param {String} newMessage 
 */
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
