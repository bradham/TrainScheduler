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

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataBase.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log("Train name: " + childSnapshot.val().name);
        console.log("Destination: " + childSnapshot.val().dest);
        console.log("First time: " + childSnapshot.val().firstTime);
        console.log("Frequency: " + childSnapshot.val().freq);
        console.log("Date added: " + childSnapshot.val().dateAdded);

        //calculate next arrival time and minutes away
        var nextArrival = calcArrival(300, 5);
        var minAway = calcMinutes(nextArrival);
    
  
        // Add a row to the table
        var data = "<td>" + childSnapshot.val().name + "</td>";
            data+= "<td>" + childSnapshot.val().dest + "</td>";
            data+= "<td>" + childSnapshot.val().freq + "</td>";
            data+= "<td>" + nextArrival + "</td>";
            data+= "<td>" + minAway + "</td>";

        //DEBUG LOG
        //console.log("data? " + data);
        $("#trains tr:last").after("<tr>" + data + "</tr>");
        // $("#full-member-list").append("<div class='well'><span class='member-name'> " +
        //   childSnapshot.val().name +
        //   " </span><span class='member-email'> " + childSnapshot.val().email +
        //   " </span><span class='member-age'> " + childSnapshot.val().age +
        //   " </span><span class='member-comment'> " + childSnapshot.val().comment +
        //   " </span></div>");
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
/*       dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);
        $("#email-display").text(snapshot.val().email);
        $("#age-display").text(snapshot.val().age);
        $("#comment-display").text(snapshot.val().comment);
      });
 */  

 function calcArrival(time, freq) {
     //calculate arrival time. return formatted time
     return "2:00 PM";
 };

 function calcMinutes(time) {
     //calculate minutes away from current time and return number of minutes
     return 3;
 };

