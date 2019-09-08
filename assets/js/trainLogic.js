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
var name = "test2 name";
var email = "test2@test.com";
var age = 2;
var comment = "test2 comment";


// Capture Button Click
$("#add-train").on("click", function (event) {
    event.preventDefault();

    //Get new train data from input values
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    age = $("#age-input").val().trim();
    comment = $("#comment-input").val().trim();
    // Code test for the push
    dataBase.ref().push({

        name: name,
        email: email,
        age: age,
        comment: comment,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

