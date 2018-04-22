//Required Variables
require("dotenv").config()

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

    if (processArray[1] === undefined) {
        query = 'The sign by Ace of Base'
    }
    else {
        for (let i = 1; i < processArray.length; i++) {
            query = query + " " + processArray[i];
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

    let query;

    if (processArray[1] === undefined) {
        query = 'Mr. Nobody'
    }
    else {
        for (let i = 1; i < processArray.length; i++) {
            query = query + " " + processArray[i];
        }
        console.log(query)
    }

    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
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