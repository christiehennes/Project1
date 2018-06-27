console.log('i am linked');

//Variable Declarations
let resultsOb = {}; //function below to initalize 


//Function Declarations


// Function: api call for JAMBASE + store result in an object 
function getArtistInfo(artist){

    //Clear out the information stored in the resultsOb
    initResultsOb();

    //Create the API call 
    // Store the results in the skResults object 
    //Create a new concert for each concert (call the createConcert function in a loop)
  let artistID = `http://api.jambase.com/artists?name=${artist}&page=0&api_key=d3zdba3y643smqmw5mn44wk8`;

    $.ajax({
        url: artistID,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        resultsOb.artistID = response.Artists[0].Id;
        let eventByArtistId = `http://api.jambase.com/events?artistId=${resultsOb.artistID}&page=0&api_key=d3zdba3y643smqmw5mn44wk8`
        
        $.ajax( {
            url: eventByArtistId,
            method: "GET"
        }).then(function(result) {
            console.log(result);

            resultsOb.numConcerts = result.Info.TotalResults;
            result.Events.forEach(event => {
                createConcert(event);
            });
            
        }).then(function(){
            displayConcertInfo();
        })
    });

    
}


// Function: create concert object which will run in a loop for the number of concerts
function createConcert(concert){
    //Takes the results object from the songkick API as an argument
    //Create a new concert object and add to artistsConcerts array 
    //Use a map to return coordinate info and save in locationsArray --> https://repl.it/repls/KosherOrneryDeeplearning

    resultsOb.artistsConcerts.push(concert); //Add the concert to the concerts array. This adds the FULL unprocessed object 
    //console.log("Concert obj:" + concert);

    //Create the location oject 
    let location = {
        lat: concert.Venue.Latitude,
        long: concert.Venue.Longitude,
    };
    console.log(location.lat);
    console.log(location.long);

    resultsOb.locationsArray.push(location); //Add the location to the locations array 

}


// Function: display concerts
// function displayAllConcerts(){
//     //Alter html using jquery to clear out previous concert results and display new concert results 
//     //This should display all the concerts in an accordian, the next function is for the individual concert display
//     //Store the results in the locationArray for the skResults object 
//     //Need to create a data attribute to know which button you clicked (? unsure if this is ncessary)



    

// }


// Function: display concert info 
function displayConcertInfo(){
    //Display the concert information including the map 
    console.log("inside display Concert Info");
    console.log("Array:" + resultsOb.artistsConcerts);
    let index=0;

    //Need to pass though the div ID or something to display the map in (maybe with a data attribute?)
    resultsOb.artistsConcerts.forEach(function(concert){

        let concertAccordian = `
        <div class="card">
            <div class="card-header" id="heading${index}">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false"
                        aria-controls="collapse${index}">
                        ${concert.Venue.City} | ${concert.Date}
                    </button>
                </h5>
            </div>
            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample">
                <div class="card-body d-flex justify-content-around">
                    <div class="artist-data">
                        <div class="venue-name">${concert.Venue.Name}</div>
                        <div class="venue-address">${concert.Venue.Address} ${concert.Venue.City} ${concert.Venue.StateCode} ${concert.Venue.ZipCode}</div>
                        <div class="venue-ticket-url">${concert.TicketUrl}</div>
                        <div class="venue-date">${concert.Date}</div>
                    </div>
                    <div class="venue-map">
                        <img src="./images/Google-Map-Placeholder.png">
                    </div>
                </div>
            </div>
        </div>
        `;
        $('#accordion').append(concertAccordian);

        index++;




        console.log("inside loop");
        console.log("Venue Name:" + concert.Venue.Name );
        console.log("Address:" + concert.Venue.Address + concert.Venue.City + concert.Venue.StateCode + concert.Venue.ZipCode);
        console.log("Ticket URL:" +  concert.TicketUrl);


    });


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

function initResultsOb(){

    resultsOb = {
        //Object to hold the results of the songkick API response, including artist info, num of concerts, and the concerts object 
        artistName: '',
        artistID: '',
        artistsConcerts: [],
        numConcerts: '',
        locationsArray:[] //holds all the location objects to be used for google maps 
    }; 
}

//Click Handlers 

// Click handler for the search artist button --> call the getArtistInfo function and pass in the text from input field 
$(document).on('click', '.find', function(){

    event.preventDefault(); //Prevent from submitting early 

    let artist = $('#find-artist').val();  //Grab the value of the artist submit button //TODO change to match FE values
    console.log(artist);

    getArtistInfo(artist); //Call the function that calls the API     


})
// Click handler for clicking on a concert --> call the displayConcerts function and use the index from the concertObj array 
$(document).on('click', '.display', function(){

    event.preventDefault(); //Prevent from submitting early 

   


})


//On page load
initResultsOb();