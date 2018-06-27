console.log('i am linked');



// var map;
//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 2,
//           center: new google.maps.LatLng(2.8,-187.3),
//           mapTypeId: 'terrain'
//         });

//         // Create a <script> tag and set the USGS URL as the source.
//         var script = document.createElement('script');
//         // This example uses a local copy of the GeoJSON stored at
//         // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//         script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
//         document.getElementsByTagName('head')[0].appendChild(script);
//       }

//       // Loop through the results array and place a marker for each
//       // set of coordinates.
//       window.eqfeed_callback = function(results) {
//         for (var i = 0; i < results.features.length; i++) {
//           var coords = results.features[i].geometry.coordinates;
//           var latLng = new google.maps.LatLng(coords[1],coords[0]);
//           var marker = new google.maps.Marker({
//             position: latLng,
//             map: map
//           });
//         }
//       }
//Variable Declarations
let resultsOb = {
    //Object to hold the results of the songkick API response, including artist info, num of concerts, and the concerts object 
    artistName: '',
    artistID: '',
    artistsConcerts: [],
    numConcerts: '',
    locationsArray:[] //holds all the location objects to be used for google maps 
}; 


//Function Declarations


// Function: api call for songkick + store result in an object 
function getArtistInfo(artist){
    //Create the API call 
    // Store the results in the skResults object 
    //Create a new concert for each concert (call the createConcert function in a loop)
  let artistID = `http://api.jambase.com/artists?name=${resultsOb.artistName}&page=0&api_key=d3zdba3y643smqmw5mn44wk8`;



$.ajax({
  url: artistID,
  method: "GET"
}).then(function(response) {
  console.log(response);
  resultsOb.artistID = response.Artists[0].Id;
  let eventByArtistId = `http://api.jambase.com/events?artistId=${resultsOb.artistID}&page=0&api_key=d3zdba3y643smqmw5mn44wk8`
  $ajax( {
    url: eventByArtistId,
    method: "GET"
  }) .then(function(result) {
    console.log(result);
    
  })
});
}


// Function: create concert object which will run in a loop for the number of concerts
function createConcert(concert){
    //Takes the results object from the songkick API as an argument
    //This function should run each time in a loop in the Songkick API for the number of concerts returned 
    //Create a new concert object and add to artistsConcerts array 
    //Use a map to return coordinate info and save in locationsArray --> https://repl.it/repls/KosherOrneryDeeplearning

    let concert = {
        locationName: '',
        venueAddress: ''
    }

}


// Function: display concerts
function displayConcerts(){
    //Alter html using jquery to clear out previous concert results and display new concert results 
    //This should display all the concerts in an accordian, the next function is for the individual concert display
    //Store the results in the locationArray for the skResults object 
    //Need to create a data attribute to know which button you clicked (? unsure if this is ncessary)

}


// Function: display concert info 
function displayConcertInfo(){
    //Display the concert information including the map 


    //Need to pass though the div ID or something to display the map in (maybe with a data attribute?)

}

// Function: render map 
// function renderMap(){
//     //Call this function in the displayConcertInfo function
//     //This should use the google map api and load the different coord points on the map in clusters
//     //Use the locationsArray you saved to the skResults object and use this for the locations for clusters


//     // //Can delete these later 
//     // let nyc = {lat: 40.7128, lng: -74.0060};
//     // let museum = {lat: 40.7813, lng: -73.9740};




//     let map = new google.maps.Map(document.getElementById('map'), {
//         center: nyc,
//         zoom: 8
//     });

//     // var marker = new google.maps.Marker({position: nyc, map: map});
//     // let marker = new google.maps.Marker({position: museum, map:map});

//     var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//         // Add some markers to the map.
//         // Note: The code uses the JavaScript Array.prototype.map() method to
//         // create an array of markers based on a given "locations" array.
//         // The map() method here has nothing to do with the Google Maps API.
//         var markers = locationsArray.map(function(location, i) {
//           return new google.maps.Marker({
//             position: location,
//             label: labels[i % labels.length]
//           });
//         });

//         // Add a marker clusterer to manage the markers.
//         var markerCluster = new MarkerClusterer(map, markers,
//             {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
//             //UPDATE THESE TO BE THE LOCATION OF THE CONCERT AND USE IN var markers = []
//     //   var locations = [
//     //     nyc,
//     //     museum
//     //   ];

// }


//Click Handlers 

// Click handler for the search artist button --> call the getArtistInfo function and pass in the text from input field 
$(document).on('click', '.search', function(){

    event.preventDefault(); //Prevent from submitting early 

    let artist = $('#artist-search').val();  //Grab the value of the artist submit button //TODO change to match FE values

    getArtistInfo(artist); //Call the function that calls the API     


})
// Click handler for clicking on a concert --> call the displayConcerts function and use the index from the concertObj array 
$(document).on('click', '.display', function(){

    event.preventDefault(); //Prevent from submitting early 

   


})
