require("dotenv").config();

// specifies which argument is the command
var command = process.argv[2]; 

var keys = require("./keys.js");
// console.log(keys);
var spotify = new Spotify(keys.spotify);
// var fs = require('fs');
var twitter = require('twitter');
var client = new twitter(keys.twitter);


// switch-case allows certain blocks of code to be specified based on a condtion/command in node 
switch(command){
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifySong();
}

function myTweets(){
    var screenName = {screen_name: 'BootcampUt'};
    //using the twitter npm documentation. number of tweets can prob be specified in params --> screenName
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
      if(!error){
        for(var i = 0; i<tweets.length; i++){
          var date = tweets[i].created_at;
          console.log("@" + tweets[i].text + " Created At: " + date.substring(0, 19));//makes sure to get 20 tweets
          console.log("-----------------------");
        }
      }else{
        console.log('Error occurred');
        console.log(error);
      }
    });
  }

// code block for my-tweets command based on twitter npm documentation
// function myTweets() {
// var params = {screen_name: 'BootcampUt'};

// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//       console.log(tweets[0].text);
//     }
//   });
// }
