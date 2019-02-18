module.exports = {
    queryParamF: function (processArgs){
        var queryParamArr=processArgs;
        for(var i=0;i<3;i++){
            queryParamArr.shift();
        }
        return queryParamArr.join("+");
    },
    
    displaySpotifyF: function (response,i){
    
        console.log("\r\nArtist(s): "+JSON.stringify(response.tracks.items[i].album.artists[0].name,null,2));
        console.log("The song's name: "+JSON.stringify(response.tracks.items[i].name,null,2)); 
                    
        if(JSON.stringify(response.tracks.items[i].preview_url)=="null"){
            var preview=JSON.stringify(response.tracks.items[i].external_urls.spotify);
        }else{
            var preview=JSON.stringify(response.tracks.items[i].preview_url);
        }
        console.log("A preview link of the song from Spotify: "+preview); 
        console.log("The album that the song is from: "+JSON.stringify(response.tracks.items[i].album.name,null,2)+"\r\n"); 
                    
    },

    displayConcertF: function (response,i,moment){
        console.log("\r\n"+"Name of the band: " + response.data[i].lineup);   
        console.log("Name of the venue: " + response.data[i].venue.name);  

        if(response.data[i].venue.city !="" && response.data[i].venue.region !="" && response.data[i].venue.country !=""){
            var venue=response.data[i].venue.city+", "+ response.data[i].venue.region+", "+ response.data[i].venue.country;
        }else if(response.data[i].venue.city !="" && response.data[i].venue.country !=""){
            var venue=response.data[i].venue.city+", "+ response.data[i].venue.country;
        }
        console.log("Location of the venue: " + venue);  

        var eventDate=response.data[i].datetime.substr(0,10);
        var eventMoment = moment(eventDate).format('MM/DD/YYYY');
        console.log("Date of the Event " + eventMoment + "\r\n"); 
    },

    spotifythis:  function (pargv,functionsINeed,spotify){
        
        var argLength=(pargv).length;
        var queryParam=functionsINeed.queryParamF(pargv);
        
    
        if(queryParam==''){
            queryParam="The Sign";
        }
        
        spotify.search({ type: 'track', query: queryParam  }, function(err, response) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            
            if(argLength<=3){
                for(var i=0;i<response.tracks.items.length;i++){
                    if(JSON.stringify((response.tracks.items[i].album.artists[0].name,null,2)=='"Ace of Base"') && (JSON.stringify(response.tracks.items[i].name,null,2)=='"The Sign"')){
                        functionsINeed.displaySpotifyF(response,i);
                    }
                }
            }else{
                if((response.tracks.items).length>=5){
                    var iterateNum=5;
                }else{
                    var iterateNum=(response.tracks.items).length;
                }
                for(var i=0;i<iterateNum;i++){
                   functionsINeed.displaySpotifyF(response,i);
                }
            }
        });
    },

    concertthis: function (pargv,functionsINeed,axios,moment){
        
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
                    functionsINeed.displayConcertF(response,i,moment);
                }else{
                    console.log("No upcoming events for '"+queryParam.split("+").join(" ")+"' band");
                }
            }   
        }) .catch(function(error) {
            console.log("this error: "+error);
        });
    },

    moviethis: function (pargv,functionsINeed,axios){
        var argLength=(pargv).length;
        var queryParam=functionsINeed.queryParamF(pargv);
    
        if(queryParam==''){
            queryParam="Mr. Nobody";
        }
    
        axios.get("http://www.omdbapi.com/?t="+queryParam+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("\r\nTitle of the movie: "+response.data.Title);
            console.log("Year the movie came out: "+response.data.Released);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            for(var i=0;i<response.data.Ratings.length;i++){
                if (JSON.stringify(response.data.Ratings[i].Source,null,2)=='"Rotten Tomatoes"'){
                    console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[i].Value);
                }
            }
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors + "\r\n");
        }
        );
    }
  };