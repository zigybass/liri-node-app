require("dotenv").config();

const fs = require("fs");
const keys = require("./keys.js");
const Axios = require("axios");
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
        //console.log(searchItem)
        musicFunc();
        break;
    case "movie-this":
        console.log("movie")
        movieFunc();
        break;
    case "do-what-it-says":
        console.log("huh?")
        doThis();
        break;
    default:
        console.log("Try another command")
}

function musicFunc () {
    spotify.search({type: "track", query: searchItem}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name)
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name)
            console.log("Preview: " + data.tracks.items[0].preview_url)
        }
    })
};

function movieFunc () {
    console.log("movie function")
};

function doThis () {
    console.log("do this")
};