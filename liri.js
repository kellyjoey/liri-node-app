// Grabs the twitter keys variables and required packages
var keys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
var spotify = require("spotify");
var Twitter = require('twitter');
var mdb = require('moviedb')('fd431d302adef850e09a11a513066ad9');
var fs = require('fs');

var command = process.argv[2];
 
//BEGIN TWITTER STUFF
var client = new Twitter({
  consumer_key: '0OQ7zd0b6ifOzShQc0yFelPTR',
  consumer_secret: 'OuK4Ons9jOQ8vcM7BG5SOlj9qoDLuzFLbvKiSt4AgohH4cBaP7',
  access_token_key: '124198720-k1ua3PunNlXBBLZPU5DZYT4Ypby3yAOfjPqKQooj',
  access_token_secret: '6y0Su4lHpYMpEyaBE91WvevPpZQJYV0FTcEvO5GJfJX7k'
});

if (command === "my-tweets"){
	tweets();
};

if (command === "spotify-this-song"){
	spotifyThis();
};

if (command === "movie-this"){
	movieThis();
};

if (command === "do-what-it-says"){
	doWhat();
};





function tweets(){
	var params = {screen_name: 'kellyjoey75',
			  count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  
  		if (!error) {	
  			for (var i = 0; i < tweets.length; i++) {  	
    		console.log(tweets[i].created_at);
    		console.log(tweets[i].text);
			}
  		}
	});
};



//BEGIN SPOTIFY STUFF

function spotifyThis(){

	// Take in the command line arguments
	var nodeArgs = process.argv;

	// Create an empty string for holding the song title
	var song = "";

	// Capture all the words in the song title (ignoring the first two Node arguments)
	for (var i = 3; i < nodeArgs.length; i++) {

  		// Build a string with the song title.
  		song = song + " " + nodeArgs[i];
		}

	spotify.search({ type: 'track', limit: "1", query: song }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	}else{
    		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    		console.log("Song name: " + data.tracks.items[0].name);
    		console.log("Song preview: " + data.tracks.items[0].external_urls.spotify);
    		console.log("Album: " + data.tracks.items[0].album.name);
    	}
 
     
	});

};

//BEGIN MOVIE STUFF

function movieThis(){

	//Take in the command line arguments
	var nodeArgs = process.argv;

	//Create an empty string for holding the movie title
	var movie = "";

	//Capture all the words in the movie title (ignoring the first two Node arguments);
	for (var i = 3; i < nodeArgs.length; i++){

		//Build a string with the movie title.
		movie = movie + " " + nodeArgs[i];
	}

	mdb.searchMovie({type: 'movie', page: "1", query: movie, api_key: "fd431d302adef850e09a11a513066ad9"}, function(err, result){
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}else{
			// console.log(result);
			console.log('Title: ' + result.results[0].title);
			console.log('Release date: ' + result.results[0].release_date);
			console.log('Plot: ' + result.results[0].overview);
			console.log('MovieDB user score: ' + result.results[0].vote_average);
		}
	});

};

//BEGIN DO WHAT IT SAYS STUFF

function doWhat(){
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {

  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

  var command = (dataArr[0]);
  var nodeArgs = (dataArr[1]);

  switch(command){
  	case "my-tweets":
  		tweets();
  		break;

  	case "spotify-this-song":
  		spotifyThis(dataArr);
  		break;

  	case "movie-this":
  		movieThis();
  		break;
  	}
  

});

}


