$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBOo0dHQax0hmK2fsH0FoVSmbkvea9u2eY",
    authDomain: "train-scheduler-11dd2.firebaseapp.com",
    databaseURL: "https://train-scheduler-11dd2.firebaseio.com",
    projectId: "train-scheduler-11dd2",
    storageBucket: "train-scheduler-11dd2.appspot.com",
    messagingSenderId: "382299465804"
  };
  firebase.initializeApp(config);

  //declare variable for reference to firebase database

  var database = firebase.database();
  
//on submit click

$("#submitButton").on("click", function(event) {


  var name = $("#Tname").val().trim();
  var destination = $("#Tdestination").val().trim();
  var firstTrainTime = $("#TfirstTrainTime").val().trim();
  var frequency = $("#Tfrequency").val().trim();

  //clear the form after submitting the train

  $("#Tname").val("");
  $("#Tdestination").val("");
  $("#TfirstTrainTime").val("");
  $("#Tfrequency").val("");

  database.ref().push({
      name: name,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
  });

});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());


//new variables to get data from firebase

var name = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
var time = childSnapshot.val().firstTrainTime;
var frequency = childSnapshot.val().frequency;

var firstTrainTimeConvert = moment(time, "hh:mm").subtract(1, "years");
console.log(firstTrainTimeConvert);

//var for timedifference bw current time and first train time
var timeDiff = moment().diff(moment(firstTrainTimeConvert), "minutes");
console.log("Difference in Time: " + timeDiff);

//remainder 

var timeRemainder = timeDiff % frequency;
console.log (timeRemainder);

//minutes until next train

var nextTrainMin = frequency - timeRemainder;
console.log ("Minutes until next train: " + nextTrainMin );

//Next train time
 var nextTrainAdd = moment().add(nextTrainMin, "minutes");
 var nextArrivalTime = moment(nextTrainAdd).format("hh:mm");
 console.log ("Arrival Time: " + nextArrivalTime);

//send all info to table

$("#schedule").prepend("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrivalTime + "</td><td>" + nextTrainMin + "</td><td>");


});
});