import firebase from 'firebase';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCbw_obCsHkJLB4ZMMAzzTkqj4K2mH3Rx4",
    authDomain: "skillmeet-4c737.firebaseapp.com",
    projectId: "skillmeet-4c737",
    storageBucket: "skillmeet-4c737.appspot.com",
    messagingSenderId: "383981362110",
    appId: "1:383981362110:web:51ec2a385d20db147ab7ef",
    measurementId: "G-NE6BPLMNP9"
};

const fire = firebase.initializeApp(firebaseConfig);


export default fire;
export const auth = firebase.auth();
export const db = firebase.firestore();

let isRetrievingData = false;

async function getProfileDataFromDb(uid) {

    if (isRetrievingData) return;
    isRetrievingData = true;

    const ref = db.collection('users').doc(uid);

    const data = await Promise.all([
        ref.get().then(doc => doc.data()),
        ref.collection('Skills')
        .get().then(querySnapshot => {
            const arr = [];
            querySnapshot.forEach(doc => arr.push(doc.data()));
            return arr;
        }),
    ]);

    const profileData = data[0];
    profileData.skills = data[1];
    isRetrievingData = false;
    return profileData;
}

export function getCurrentUserDataAsync() {
    return new Promise((resolve, reject) =>
        auth.onAuthStateChanged((user) => {
            if (!user) return;

            let userData = getProfileDataFromDb(user.uid);
            resolve(userData);
        })
    );
}

async function retrieveUserProfileDataExample(){
    const userData = await getCurrentUserDataAsync();
    console.log(userData);
}

// retrieveUserProfileDataExample();