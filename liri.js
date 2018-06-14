require("dotenv").config();

// specifies which node argument corresponds to the command
var command = process.argv[2]; 

//  specifies which node argument corresponds to the movie or song being searched for
var search = process.argv[3]; 

var keys = require("./keys.js");
// console.log(keys);

// var fs = require('fs');
var twitter = require('twitter');
var client = new twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)




// switch-case allows certain blocks of code to be specified based on a condtion/command in node 
switch(command){
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifySong();
    break;

    case "movie-this":
    searchMovie();
    break;
}

function myTweets(){
    var screenName = {screen_name: 'BootcampUt'};
    //using the twitter npm documentation. number of tweets can prob be specified in params --> screenName
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
      if(!error){
        for(var i = 0; i<tweets.length; i++){
          var date = tweets[i].created_at;
          console.log("@BootcampUt tweeted: " + tweets[i].text + "...... created at: " + date.substring(0, 19));//makes sure to get 20 tweets
          console.log("-----------------------");
        }
      }else{
        console.log('Error');
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

function spotifySong(){
    // var trackSearch = search.text
    // could eventually make the search capabilities more robust by concatenating process.argv[2] + process.argv[3]
    var searchTrack;
    if(search === undefined) {
        searchTrack = "The sign";
    } else {
        searchTrack = search;
    }
    spotify.search({ 
        type: 'track', 
        query: searchTrack}, function(err, data){
      if(err){
          console.log("Error: "+ err);
          return;
        } else { 
          var songData = data.tracks.items[0];
        //   console.log(songData);
          console.log("Artist: " + songData.artists[0].name);
          console.log("Song: " + songData.name);
          console.log("URL: " + songData.external_urls);
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
      
    //   } else{
    //     console.log('Error occurred spotify.');
      }
    });
};



