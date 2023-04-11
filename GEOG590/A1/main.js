mapboxgl.accessToken = 'pk.eyJ1IjoibWVnaGFudG8iLCJhIjoiY2xnNWRucDdsMDJldDNrbmRubXFlOGZ3cCJ9.LyZK-PVSq3JxoS2GkQV9vQ'; //  Put your access token between the single quotes.
var map = new mapboxgl.Map({
    container: 'map', // id of a div on your page, where the map will be inserted
    style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
    center: [88.37, 22.58], // starting position [lng, lat] eg. [-122.6788, 45.5212]
    zoom: 11 // starting zoom 
});

var popup = new mapboxgl.Popup({ offset: 25 })
.setHTML('Hello World. Welcome to Kolkata!');



var marker = new mapboxgl.Marker({color:'crimson'})
.setLngLat( [88.38307,22.60184]) // starting position [lng, lat] 
.setPopup(popup) //add the popup with the variable name 'popup' to the marker 
.addTo(map);
var marker2 = new mapboxgl.Marker({color:'hotpink'})
.setLngLat( [88.39, 22.50]) // starting position [lng, lat] 
.addTo(map);


var popup_layer = new mapboxgl.Popup({closeOnClick: true}) 

var popup_layer = new mapboxgl.Popup({
    closeOnClick: true, anchor: 'top-right'
  })
  .setLngLat([88.36731273974053,22.597282007121287])
  .setHTML('<h1>Hi GEOG590!</h1>')
  .addTo(map);

var popup_layer_voodoo = new mapboxgl.Popup({
    closeOnClick: true, anchor: 'top-left'
  })
  .setLngLat([88.35129070077198,22.558 ])
  .setHTML('<a href="https://indianmuseumkolkata.org">The Indian Museum</a>')
  .addTo(map);