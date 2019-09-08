/*********************************
Train Scheduler logic using the
realtime Google Firebase database.
By Brad Ham
September 2019
**********************************/

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBcisdVwo955M2xvKg6I3A27QkrYmgQXcI",
    authDomain: "train-scheduler-91dda.firebaseapp.com",
    databaseURL: "https://train-scheduler-91dda.firebaseio.com",
    projectId: "train-scheduler-91dda",
    storageBucket: "",
    messagingSenderId: "756207549854",
    appId: "1:756207549854:web:ff859a254ea4a2ea63aa8f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);