console.log('i am linked');

//Variable Declarations
let skResults = {
    //Object to hold the results of the songkick API response, including artist info, num of concerts, and the concerts object 
    artistName: '',
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
}


// Function: create concert object which will run in a loop for the number of concerts
function createConcert(concert){
    //Takes the results object from the songkick API as an argument
    //This function should run each time in a loop in the Songkick API for the number of concerts returned 
    //Create a new concert object and add to artistsConcerts array 
    //Use a map to return coordinate info and save in locationsArray --> https://repl.it/repls/KosherOrneryDeeplearning

    let concert = {
        locationName: '',
        venueAAddress: ''
    }

}


// Function: display concerts
function displayConcerts(){
    //Alter html using jquery to clear out previous concert results and display new concert results 
    //This should display all the concerts in an accordian, the next function is for the individual concert display
    //Store the results in the locationArray for the skResults object 

}


// Function: display concert info 
function displayConcertInfo(){
    //Display the concert information including the map 

}

// Function: render map 
function renderMap(){
    //Call this function in the displayConcertInfo function
    //This should use the google map api and load the different coord points on the map in clusters
    //Use the locationsArray you saved to the skResults object and use this for the locations for clusters
}



//Click Handlers 

// Click handler for the search artist button --> call the getArtistInfo function and pass in the text from input field 
// Click handler for clicking on a concert --> call the displayConcerts function and use the index from the concertObj array 
