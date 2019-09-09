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

var dataBase = firebase.database();

// Initial Values
var trainName = "train name";
var destination = "place";
var firstTrainTime = 1300;
var frequency = 1;


// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();

    //Get new train data from input values
    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#first-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    // Code test for the push
    dataBase.ref().push({

        name: trainName,
        dest: destination,
        firstTime: firstTrainTime,
        freq: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

