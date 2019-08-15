require("dotenv").config();

const fs = require("fs");
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require('node-spotify-api')

const spotify = new Spotify ({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})

let nodeArgs = process.argv;
let searchItem = "";

for (let i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        searchItem = searchItem + "+" + nodeArgs[i]
    } else {
        searchItem += nodeArgs[i];
    }
}

switch (process.argv[2]) {
    case "spotify-this-song":
        musicFunc();
        break;
    case "movie-this":
        //console.log("movie")
        movieFunc();
        break;
    case "do-what-it-says":
        console.log("huh?")
        doThis();
        break;
    default:
        console.log("Try another command")
}

function runSpotify(song) {
    spotify.search({type: "track", query: song}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name)
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name)
            console.log("Preview: " + data.tracks.items[0].preview_url)
        }
    })
}

function musicFunc () {
    if (searchItem) {
        return runSpotify(searchItem);
    } else {
        // This needs modifying to run Ace of Base
        return runSpotify("The Sign");
    }
};

function movieFunc () {
    //const omdbKey = "trilogy";
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchItem
        ).then( function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log("Rotten Tomatoes: " + JSON.stringify(response.data.Ratings[1].Value))
        }).catch( function (error) {
            console.log(error)
        })
};

function doThis () {
    console.log("do this")
};