//to read and write files
var fs=require("fs");

require("dotenv").config();
var keys = require("./keys.js");

//You should then be able to access your keys information like so
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
//Include the moment npm package
var moment = require('moment');

var functionsINeed = require("./smallFunctions.js");

//concert-this 
if(process.argv[2]=="concert-this"){
    functionsINeed.concertthis(process.argv,functionsINeed,axios,moment);
}

//spotify-this
else if(process.argv[2]=="spotify-this"){
    functionsINeed.spotifythis(process.argv,functionsINeed,spotify);
}

//movie this
else if(process.argv[2]=="movie-this"){
    functionsINeed.moviethis(process.argv,functionsINeed,axios);
}

//do-what-it-says
else if(process.argv[2]=="do-what-it-says"){
    fs.readFile("random.txt","utf8",function(err,data){
        var task=data.split(",");
        for(var i=0;i<task.length;i++){
            if(task[i]=="spotify-this-song"){
                var song=[];
                song.push("a");
                song.push("b");
                song.push("c");
                song.push(task[(i+1)].split(" "));
                functionsINeed.spotifythis(song,functionsINeed,spotify);
            }

            if(task[i]=="concert-this-band"){
                var band=[];
                band.push("a");
                band.push("b");
                band.push("c");
                band.push(task[(i+1)].split(" ").join("+"));
                functionsINeed.concertthis(band,functionsINeed,axios,moment);
            }
            if(task[i]=="movie-this"){
                var movie=[];
                movie.push("a");
                movie.push("b");
                movie.push("c");
                movie.push(task[(i+1)].split(" ").join("+"));
                functionsINeed.moviethis(movie,functionsINeed,axios);
            }
        }
    })
}
