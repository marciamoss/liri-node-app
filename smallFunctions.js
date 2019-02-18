module.exports = {
    //this function extracts the user parameter provided in the console
    queryParamF: function (processArgs){
        var queryParamArr=processArgs;
        for(var i=0;i<3;i++){
            queryParamArr.shift();
        }
        return queryParamArr.join("+");
    },
    
    //this function gets all the data needed from the spotify response
    displaySpotifyF: function (response,i,fs,functionsINeed){
        var consoletxt;
   
        consoletxt="\r\nArtist(s): "+JSON.stringify(response.tracks.items[i].album.artists[0].name,null,2);
        
        functionsINeed.writetxt(consoletxt,fs);
        consoletxt="The song's name: "+JSON.stringify(response.tracks.items[i].name,null,2); 
        functionsINeed.writetxt(consoletxt,fs);
                    
        if(JSON.stringify(response.tracks.items[i].preview_url)=="null"){
            var preview=JSON.stringify(response.tracks.items[i].external_urls.spotify);
        }else{
            var preview=JSON.stringify(response.tracks.items[i].preview_url);
        }
        consoletxt="A preview link of the song from Spotify: "+preview; 
        functionsINeed.writetxt(consoletxt,fs);
        consoletxt="The album that the song is from: "+JSON.stringify(response.tracks.items[i].album.name,null,2)+"\r\n";
        functionsINeed.writetxt(consoletxt,fs); 
    },

    //this function gets all the data needed from the bandsintown response
    displayConcertF: function (response,i,moment,fs,functionsINeed){
        var consoletxt;
        consoletxt= "\r\nName of the band: " + response.data[i].lineup;  
        functionsINeed.writetxt(consoletxt,fs);

        consoletxt="Name of the venue: " + response.data[i].venue.name;
        functionsINeed.writetxt(consoletxt,fs);

        if(response.data[i].venue.city !="" && response.data[i].venue.region !="" && response.data[i].venue.country !=""){
            var venue=response.data[i].venue.city+", "+ response.data[i].venue.region+", "+ response.data[i].venue.country;
        }else if(response.data[i].venue.city !="" && response.data[i].venue.country !=""){
            var venue=response.data[i].venue.city+", "+ response.data[i].venue.country;
        }
        
        consoletxt="Location of the venue: " + venue;  
        functionsINeed.writetxt(consoletxt,fs);

        var eventDate=response.data[i].datetime.substr(0,10);
        var eventMoment = moment(eventDate).format('MM/DD/YYYY');
        
        consoletxt="Date of the Event " + eventMoment + "\r\n"; 
        functionsINeed.writetxt(consoletxt,fs);
    },

    //this function does the spotify api call
    spotifythis:  function (pargv,functionsINeed,spotify,fs){
        
        var argLength=(pargv).length;
        var queryParam=functionsINeed.queryParamF(pargv);
        
    
        if(queryParam==''){
            queryParam="The Sign";
        }
        
        spotify.search({ type: 'track', query: queryParam  }, function(err, response) {
            if (err) {
                var consoletxt='Error occurred: ' + err;
                functionsINeed.writetxt(consoletxt,fs);
            }
            
            if(argLength<=3){
                for(var i=0;i<response.tracks.items.length;i++){
                    if(JSON.stringify((response.tracks.items[i].album.artists[0].name,null,2)=='"Ace of Base"') && (JSON.stringify(response.tracks.items[i].name,null,2)=='"The Sign"')){
                        functionsINeed.displaySpotifyF(response,i,fs,functionsINeed);
                    }
                }
            }else{
                if((response.tracks.items).length>=5){
                    var iterateNum=5;
                }else{
                    var iterateNum=(response.tracks.items).length;
                }
                for(var i=0;i<iterateNum;i++){
                   functionsINeed.displaySpotifyF(response,i,fs,functionsINeed);
                }
            }
        });
    },

    //this function does the bandsintown api call
    concertthis: function (pargv,functionsINeed,axios,moment,fs){
        
        var queryParam=functionsINeed.queryParamF(pargv);
        
        if(queryParam==''){
            queryParam="Ace of Base";
        }

        // Then run a request with axios to the Bands in town API with the band name  specified
        axios.get("https://rest.bandsintown.com/artists/" + queryParam + "/events?app_id=codingbootcamp").then(
        function(response) {
            
            if((response.data).length>=5){
                var iterateNum=5;
            }else if((response.data).length>0){
                var iterateNum=(response.data).length;
            }else {
                var iterateNum=1;
            }
    
            for(var i=0;i<iterateNum;i++){
                if(response.data[i]!=undefined){
                    functionsINeed.displayConcertF(response,i,moment,fs,functionsINeed);
                }else{
                    consoletxt="No upcoming events for '"+queryParam.split("+").join(" ")+"' band";
                    functionsINeed.writetxt(consoletxt,fs);
                }
            }   
        }) .catch(function(error) {
            consoletxt="this error: "+error; 
            functionsINeed.writetxt(consoletxt,fs);
        });
    },

    //this function does the omdb api call and gets all the data needed from the response
    moviethis: function (pargv,functionsINeed,axios,fs){
        var argLength=(pargv).length;
        var queryParam=functionsINeed.queryParamF(pargv);
    
        if(queryParam==''){
            queryParam="Mr. Nobody";
        }
    
        axios.get("http://www.omdbapi.com/?t="+queryParam+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
            var consoletxt;

            consoletxt="\r\nTitle of the movie: "+response.data.Title; 
            functionsINeed.writetxt(consoletxt,fs);

            consoletxt="Year the movie came out: "+response.data.Released;
            functionsINeed.writetxt(consoletxt,fs);
            consoletxt="IMDB Rating of the movie: " + response.data.imdbRating;
            functionsINeed.writetxt(consoletxt,fs);

            for(var i=0;i<response.data.Ratings.length;i++){
                if (JSON.stringify(response.data.Ratings[i].Source,null,2)=='"Rotten Tomatoes"'){
                    consoletxt="Rotten Tomatoes Rating of the movie: " + response.data.Ratings[i].Value;
                    functionsINeed.writetxt(consoletxt,fs);
                }
            }
            consoletxt="Country where the movie was produced: " + response.data.Country;
            functionsINeed.writetxt(consoletxt,fs);
            consoletxt="Language of the movie: " + response.data.Language;
            functionsINeed.writetxt(consoletxt,fs);
            consoletxt="Plot of the movie: " + response.data.Plot;
            functionsINeed.writetxt(consoletxt,fs);
            consoletxt="Actors in the movie: " + response.data.Actors + "\r\n";
            functionsINeed.writetxt(consoletxt,fs);
        }
        );
    },

    //this function console logs all the info and writes to log.txt file based on user parameters
    writetxt: function(consoletxt,fs){
        console.log(consoletxt);  
        fs.appendFile("log.txt",", -"+ consoletxt,function(err){
            if(err){
                return console.log(err);
            };
        })
    }
  };