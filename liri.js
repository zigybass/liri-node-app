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
        movieFunc();
        break;
    case "do-what-it-says":
        //console.log("huh?")
        doThis();
        break;
    default:
        console.log("Try another command")
}

function searchSpotify(song) {
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
        return searchSpotify(searchItem);
    } else {
        spotify.search({type: "track", query: "the+sign"}, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log("Artist Name: " + data.tracks.items[1].artists[0].name)
                console.log("Song Name: " + data.tracks.items[1].name);
                console.log("Album Name: " + data.tracks.items[1].album.name)
                console.log("Preview: " + data.tracks.items[1].preview_url)
            }
        })
    }
};

function searchOmdb (movie) {
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie
        ).then( function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes: " + JSON.stringify(response.data.Ratings[1].Value));
            console.log("Produced in: " + response.data.Country);
            console.log("Movie Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }).catch( function (error) {
            console.log(error)
        })
};

function movieFunc () {
    searchItem ? searchOmdb(searchItem) : searchOmdb("Mr. Nobody")
};

let textArray;

function doThis () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err)
        } else {
            textArray = (data.slice(1).split(","));
            searchSpotify(textArray[1])
        }
    })
};