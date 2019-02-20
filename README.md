# liri-node-app

* LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters   and gives you back data.
* LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
* To run this app you need to install the following:
* Once you have the github repo cloned to your computer in git bash run command 'npm i' without the quotes. 
  That will install all the packages required to run the app.
  
* Next, create a file named .env, add the following to it, replacing the values with your API keys (no quotes) once you     have them:
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
Step One: Visit https://developer.spotify.com/my-applications/#!/
Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.


* To search the spotify do the following:
 In gitbash window type command - **node liri.js spotify-this song name** (**Note: If a song name has ' in it make sure to add \ before the quotes like this \'**)
 For eg: i want to search for a song called whatever it takes by imagine dragons. 
 So i type, node liri.js spotify-this whatever it takes. 
 This command would show all the songs with the same title by various artists. Currently it is limited to 5. 
 
 If you do not give any song name it defaults to "The Sign" by "Ace of Base".

* To search for concerts do the following:
In gitbash window type command - **node liri.js concert-this band name**  (**Note: If a song name has ' in it make sure to add \ before the quotes like this \'**)
For eg: i want to serch for the band imagine dragons.
So i type, **node liri.js concert-this imagine dragons**
This command would show all the upcoming performances with Date, venue and location information.
If you do not give any band name it defaults to "Ace of Base".

* To search for movies do the following:
In gitbash window type command - **node liri.js movie-this movie name** (**Note: If a song name has ' in it make sure to add \ before the quotes like this \'**)
For eg: i want to search for the movie twilight.
So i type, **node liri.js movie-this twilight** 
This command would show me:
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
If you do not give any band name it defaults to "Mr. Nobody".

* There is one other command that app can search. It is called **do-what-it-says**
    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then uses it to call one of LIRI's commands.
    * Currently random.txt has "spotify-this-song,"I Want it That Way",concert-this-band,imagine dragons,movie-this,guardians of the galaxy"
    * So when you type command - node liri.js do-what-it-says the app goes through the same action for spotify-this, concert-this and movie-this for the input right after those commands in the text file.
    * You can add more commands to the text file with , but make sure it follows the same format as it is currently in the text file.

 




