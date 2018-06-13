// require("dotenv").config();

// specifies which argument is the command
var command = process.argv[2]; 

var keys = require("./keys.js");
// console.log(keys);
// var spotify = new Spotify(keys.spotify);
// var fs = require('fs');
var twitter = require('twitter');
var client = new twitter(keys.twitter);


// switch-case allows certain blocks of code to be specified based on a condtion/command in node
switch(command){
    case "my-tweets":
    myTweets();
}

// code block for my-tweets command based on twitter npm documentation
function myTweets() {
var params = {screen_name: 'BootcampUt'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets.text);
    }
  });
}
