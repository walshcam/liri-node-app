//Required Variables
require("dotenv").config()

let keys = require('./keys.js');
let Twitter = require('twitter');
let Spotify = require('node-spotify-api');
var fs = require("fs");

//Global Variables
// let spotify = new Spotify(keys.spotify);

let action = process.argv[2];

//Twitter required variables
let client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

//Spotify required variables
let spotify = new Spotify({
    id: keys.id,
    secret: keys.secret
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
        console.log(tweets);
      }
    });
};

//Spotify Function

function spotifyThisSong() {
    
    let query;

    if (process.argv[3] === undefined) {
        query = 'The sign by Ace of Base'
    }
    else {
        for (let i = 3; i < process.argv.length; i++) {
            query = query + " " + process.argv[i];
        }
        console.log(query)
    }

    let params = {
        type: "track",
        query: query
    }
    spotify.search(params, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        if (!err){
            console.log(data); 
        }
    });

};

//OMBD Function

function movieThis() {

    fs.readFile("random.txt","utf8", function (error, data) {

    })
};

//Do What It Says

function doWhatItSays() {

    fs.readFile("random.txt","utf8", function (error, data) {
        
        if (error) {
            return console.log(error);
        }

        let newInput = data.split(",")
    })

};