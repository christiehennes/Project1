console.log('i am linked');

// var queryURL = "https://maps.googleapis.com/maps/api/staticmap?size=512x512&zoom=15&center=Brooklyn&style=feature:road.local%7Celement:geometry%7Ccolor:0x00ff00&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x000000&style=element:labels%7Cinvert_lightness:true&style=feature:road.arterial%7Celement:labels%7Cinvert_lightness:false&key=AIzaSyDMDbH32Lkx4DIQDGMykZSMrg_bHfkTmCc";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

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