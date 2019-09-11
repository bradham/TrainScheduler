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

        //calculate next arrival time and minutes away.
        //calcArrival feurns an array with both arrival time and minutes away
        var nextArrival = calcArrival(childSnapshot.val().firstTime, childSnapshot.val().freq);
        var minAway = nextArrival[1];
        //calcMinutes(nextArrival);
    
  
        // Add a row to the table
        var data = "<td>" + childSnapshot.val().name + "</td>";
            data+= "<td>" + childSnapshot.val().dest + "</td>";
            data+= "<td>" + childSnapshot.val().freq + "</td>";
            data+= "<td>" + nextArrival[0] + "</td>"; //from calcArrival array
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
  
/*      For showing most recent db record 
        dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);
        $("#email-display").text(snapshot.val().email);
        $("#age-display").text(snapshot.val().age);
        $("#comment-display").text(snapshot.val().comment);
      });
 */  

 function calcArrival(time, freq) {
     //calculate arrival time. return formatted time
     console.log(moment().format('Hm'));
     var now = moment().format('Hm');
     var nextTime = parseInt(now) + freq;
     console.log(nextTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    //var timeConverted = moment(time, "hh:mm").subtract(1, "years");
    //console.log("timeConverted: " + timeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HHmm"));

    // Difference between the times
    var diffTime = moment().diff(moment(time), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     return [moment(nextTrain).format("hh:mm"), tMinutesTillTrain];
 };

 function calcMinutes(time) {
     //calculate minutes away from current time and return number of minutes
         // Difference between the times
    // var diffTime = moment().diff(moment(time), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % freq;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = freq - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     return 5;
 };

