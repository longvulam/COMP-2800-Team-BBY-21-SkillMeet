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

  // Initialize Firebase
//   firebase.analytics();