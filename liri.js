//Required Variables
require("dotenv").config()

let keys = require(keys.js);

//Global Variables
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let action = process.argv[2];
let input = process.argv[3];


//Switch statement To Turn Node.js input into action
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

//Twitter function

function myTweets() {
    
}