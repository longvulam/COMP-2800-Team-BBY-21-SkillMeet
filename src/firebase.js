import firebase from 'firebase';

// Web app's Firebase configuration
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
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore;

let isRetrievingData = false;
async function getProfileDataFromDb(uid) {

    if (isRetrievingData) return;
    isRetrievingData = true;

    const userRef = db.collection('users').doc(uid);

    const data = await Promise.all([
        userRef.get().then(doc => {
            const data = doc.data();
            data.id = uid;
            return data;
        }),
        userRef.collection('Skills')
        .get().then(querySnapshot => {
            const arr = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                data.id = doc.id;
                arr.push(data);
            });
            return arr;
        }),
    ]);

    const profileData = data[0];
    profileData.skills = data[1];
    isRetrievingData = false;
    return profileData;
}

export function getCurrentUserDataAsync(uid) {
    return new Promise((resolve, reject) => {
        if (uid) {
            const userDataWithSkills = getProfileDataFromDb(uid);
            resolve(userDataWithSkills);
            return;
        }

        waitForCurrentUser().then(user => {
            const userDataWithSkills = getProfileDataFromDb(user.uid);
            resolve(userDataWithSkills);
        });
    });
}

/**
 * @returns {Promise<firebase.User>}
 */
export function waitForCurrentUser() {
    return new Promise((resolve, reject) => {
        let timer = 0;

        const intr = setInterval(() => {
            if (timer === 5 || auth.currentUser) {
                clearInterval(intr);
                resolve(auth.currentUser);
            }
            timer++;
        }, 1000);
    })
}

