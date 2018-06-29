console.log('i am linked');

//Variable Declarations
let resultsOb = {}; //function below to initalize 
let index = '';


//Function Declarations

// Function: api call for JAMBASE + store result in an object 
function getArtistInfo(artist){

    //Clear out the information stored in the resultsOb
    initResultsOb();

    //Create the API call 
    // Store the results in the skResults object 
    //Create a new concert for each concert (call the createConcert function in a loop)
  let artistID = `https://api.jambase.com/artists?name=${artist}&page=0&api_key=kzctw8t49w3c5f7pmap3x87g`;

  //Kamons key: d3zdba3y643smqmw5mn44wk8
  //Christies hey: eujv4tv8unnrjdwb7v459jvk
  //blades key: kzctw8t49w3c5f7pmap3x87g

  //Make the first API call to get the ID of the artist
    $.ajax({
        url: artistID,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        //Check to see if there are any results, if not then display the error message
        if(response.Artists.length === 0){
            displayError("No results found");
            return;
        }

        //Get the ID from the first API call to make the second and pull all the concerts
        resultsOb.artistID = response.Artists[0].Id;
        let eventByArtistId = `https://api.jambase.com/events?artistId=${resultsOb.artistID}&page=0&api_key=kzctw8t49w3c5f7pmap3x87g`
        

        $.ajax( {
            url: eventByArtistId,
            method: "GET"
        }).then(function(result) {
            console.log(result);

            if(result.Info.TotalResults === 0){
                displayError("No upcoming shows");
                return;
            }

            resultsOb.numConcerts = result.Info.TotalResults;
            result.Events.forEach(event => {
                createConcert(event); //Create a new concert object to use to populate details for each concert
            });
            
        }).then(function(){
            displayConcertInfo();
            initMap();
        
        })
    });

   

    
}


// Function: create concert object which will run in a loop for the number of concerts
function createConcert(concert){
    //Takes the results object from the songkick API as an argument
    //Create a new concert object and add to artistsConcerts array 
    //Use a map to return coordinate info and save in locationsArray --> https://repl.it/repls/KosherOrneryDeeplearning

    resultsOb.artistsConcerts.push(concert); //Add the concert to the concerts array. This adds the FULL unprocessed object 
    console.log("Concert obj:" + concert);

    //Create the location oject 
    let location = {
        lat: concert.Venue.Latitude,
        long: concert.Venue.Longitude,
    };
    // console.log(location.lat);
    // console.log(location.long);

   resultsOb.locationsArray.push(location); //Add the location to the locations array 

}


// Function: display concert info 
function displayConcertInfo(){
    //Display the concert information including the map 
    console.log("inside display Concert Info");
    console.log("Array:" + resultsOb.artistsConcerts);
    index=0;

    //Need to pass though the div ID or something to display the map in (maybe with a data attribute?)
    resultsOb.artistsConcerts.forEach(function(concert){
        let eDate= eventDate(concert.Date);
        function eventDate(date){
            console.log(date);
            date2 =date.split('T');
            console.log(date);
            let concertDate = moment(date2[0],'YYYY-MM-DD').format('MM/DD/YYYY');
            console.log(concertDate);
            return concertDate
        }

        let concertAccordian = `
        <div class="card animated zoomInUp">
            <div class="card-header" id="heading${index}">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed accord-header" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false"
                        aria-controls="collapse${index}">
                        ${concert.Venue.City} | ${eDate}
                    </button>
                </h5>
            </div>
            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#accordionExample" data-index=${index}>
                <div class="card-body d-flex justify-content-around">
                    <div class="artist-data">
                        <h2 class="venue-name">${concert.Venue.Name}</h2>
                        <div class="venue-date">Event Date: ${eDate}</div>
                        <div class="venue-address">Location: ${concert.Venue.Address} ${concert.Venue.City} ${concert.Venue.StateCode} ${concert.Venue.ZipCode}</div>
                        <a href="${concert.TicketUrl}" target="blank" class="btn btn-primary btn-lg active" role="button">Get Tickets</a>
                    </div>
                    
                    <div id="venue-map${index}" class="venue-map" data-index=${index}>
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
function initMap(){

    //Create map objects using Google Maps JS API
    //If there are no coords, then use the Google Maps Geocoder function to display a map of the concert city 
    for (let i=0; i< resultsOb.locationsArray.length; i++){

        let location = resultsOb.locationsArray[i];
        let lat = location.lat;
        let long = location.long;

        let coords = {
            lat: lat,
            lng: long
        };

        var map = new google.maps.Map(document.getElementById(`venue-map${i}`), {
            zoom: 8,
            center: coords,
        });
        var marker = new google.maps.Marker({position: coords, map: map});

        //If there are no coordinates, then search the city and update the map 
        if (lat === 0.0 ){
            let city = resultsOb.artistsConcerts[i].Venue.City; 
            var geocoder = new google.maps.Geocoder();
            geocodeAddress(geocoder, map, city); //Call the function that will replace the map with city location
        }

    }

}

function geocodeAddress(geocoder, resultsMap, location) {

    var address = location; 
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: Cannot find location');
      }
    });
  }


function initResultsOb(){

    resultsOb = {
        //Object to hold the results of the songkick API response, including artist info, num of concerts, and the concerts object 
        artistName: '',
        artistID: '',
        artistsConcerts: [],
        numConcerts: '',
        locationsArray:[], //holds all the location objects to be used for google maps 
    }; 
}

function verifyEntry(artist){
    console.log(artist);
    if (!artist) { 

        // // $('.popover-dismiss').popover({
        // //     trigger: 'focus'
        // //   })






        // $('[data-toggle="popover"]').each(function(){
        //     $(this).popover(); 
        // });
        return false;
    }
    else { return true };
}

function displayError(string){
    console.log()

    swal ( "Error", string ,  "error" );


}

//Click Handlers 

// Click handler for the search artist button --> call the getArtistInfo function and pass in the text from input field 
$(document).on('click', '.find', function(event){

    event.preventDefault(); //Prevent from submitting early 
    $(this).addClass("animated tada");
    $('#accordion').empty();
    // $('#accordion').append(concertAccordian);    
    let artist = $('#find-artist').val();  //Grab the value of the artist submit button //TODO change to match FE values
    //console.log(artist);

    if(verifyEntry(artist)){
        getArtistInfo(artist); //Call the function that calls the API    
    }
    else{
        displayError("Please enter a valid artist");
    }

     


})



//On page load
initResultsOb();