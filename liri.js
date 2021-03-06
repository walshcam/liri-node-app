//Required Variables
require("dotenv").config();

let request = require('request');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
let fs = require("fs");
let keys = require('./keys.js');

//Global Variables

let processArray = [];

for (i = 2; i < process.argv.length; i++) {
    processArray.push(process.argv[i]);
}

let action = processArray[0];

//Twitter required variables
let client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });

//Spotify required variables
let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

//Run initial Switch Statement
switchStatement()

//Switch statement To Turn Node.js input into action
function switchStatement() {

    switch (action) {
        case "my-tweets":
            myTweets();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    }

}

//Twitter Function

function myTweets() {

    let params = {screen_name: 'milkisspicy',
                  count: "20"
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
          console.log(error)
      }
      if (!error) {
        console.log("At least I got here")
        for (let i = 0; i <tweets.length; i++) {
            console.log("=======================================");
            console.log(" ")
            console.log(tweets[i].text);
            console.log(" ");
        }
      }
    });
};

//Spotify Function

function spotifyThisSong() {
    
    let query = "";

    if (processArray[1] === undefined) {
        query = 'The sign Ace of Base'
    }
    else {
        for (let i = 1; i < processArray.length; i++) {
            query = query + " " + processArray[i];
        }
        query = query.trim();
    }

    console.log(query);

    let params = {
        type: "track",
        query: query,
        limit: 1
    }
    spotify.search(params, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        if (!err){
            //shortcut the paths for spotify
            let spotifyPath = data.tracks.items[0]

            //allow command prompt to show multiple artists
            let artists = spotifyPath.artists[0].name;
            if (spotifyPath.artists.length > 1) {
                for (let i = 1; i < spotifyPath.artists.length; i++) {
                    artists = artists + ", " + spotifyPath.artists[i].name;
                }
            }
            artists = artists.trim();

            console.log("The Artist: " + artists)
            console.log("The Song Name: " + spotifyPath.name); 
            console.log("Song Preview: " + spotifyPath.preview_url);
            console.log("The Album Name: " + spotifyPath.album.name);  
        }
    });

};

//OMBD Function

function movieThis() {

    let query = "";

    if (processArray[1] === undefined) {
        query = 'Mr. Nobody'
    }
    else {
        for (let i = 1; i < processArray.length; i++) {
            query = query + " " + processArray[i];
        }
        
        query = query.trim();
    }

    console.log(query)

    request(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("The movie's title is: " + JSON.parse(body).Title);
          console.log("The year this movie was released is: " + JSON.parse(body).Year);
          console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
          console.log("The movie's Rotton Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
          console.log("The movie was produced in: " + JSON.parse(body).Country);
          console.log("The languages this movie is available in: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("The movie's actors are: " + JSON.parse(body).Actors);
        }
      });
};

//Do What It Says

function doWhatItSays() {

    fs.readFile("random.txt","utf8", function (error, data) {
        
        if (error) {
            return console.log(error);
        }

        processArray = data.split(",")

        action = processArray[0];

        switchStatement()
    })

};