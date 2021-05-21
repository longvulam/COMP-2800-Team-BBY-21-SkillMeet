import ChatRoomCard from './chatPageComponents/chatRoomCard';
import firebase, { db, auth } from '../firebase';

async function getUserUID() {
    const curUserID = await getCurrentUserDataAsync();
    console.log('currentUserID', curUserID);
}

function getCurrentUserDataAsync() {
    return new Promise((resolve, reject) =>
        auth.onAuthStateChanged((user) => {
            if (!user) return;
            resolve(user.uid);
        })
    );
}

getUserUID();

export default function ChatRooms (props) {
    return ( 
    <>
        <ChatRoomCard/>
    </>
  );

}
 
