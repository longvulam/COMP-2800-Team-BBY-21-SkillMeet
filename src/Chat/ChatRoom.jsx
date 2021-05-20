import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { db } from '../firebase';
import Message from './Message';

async function enableListening(updateMessages) {
    await db.collection('chatrooms')
        .doc("0z5YzhMAXwJGPvgb6RxQ")
        .collection('messages')
        .onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    updateMessages(prevState => {
                        prevState.push(change.doc.data());
                        return prevState;
                    })
                }
            });
        });
}


const ChatRoom = () => {

    const { chatRoomId } = useParams();
    const [messages, updateMessages] = useState([]);
    console.log(chatRoomId);
    enableListening(updateMessages);
    return (
        <div>
            {messages.map((msg, index) => <Message key={index} content={msg.content} />)}
        </div>
    );
}

export default ChatRoom;