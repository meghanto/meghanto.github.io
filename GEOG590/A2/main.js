mapboxgl.accessToken = 'pk.eyJ1IjoibWVnaGFudG8iLCJhIjoiY2xnNWRucDdsMDJldDNrbmRubXFlOGZ3cCJ9.LyZK-PVSq3JxoS2GkQV9vQ'; //  Put your access token between the single quotes.
var map1 = new mapboxgl.Map({
    container: 'map1', // id of a div on your page, where the map will be inserted
    style: 'mapbox://styles/mapbox/dark-v11', // stylesheet location
    center: [ -123.08508129414544,44.034981728559416, ], // starting position [lng, lat] eg. [-122.6788, 45.5212]
    zoom: 13 // starting zoom 
});
var map2 = new mapboxgl.Map({
  container: 'map2', // id of a div on your page, where the map will be inserted
  style: 'mapbox://styles/mapbox/dark-v11', // stylesheet location
  center: [-95.4639088005663,29.738924426643933], // starting position [lng, lat] eg. [-122.6788, 45.5212]
  zoom: 13 // starting zoom 
});
var map3 = new mapboxgl.Map({
  container: 'map3', // id of a div on your page, where the map will be inserted
  style: 'mapbox://styles/mapbox/dark-v11', // stylesheet location
  center: [-97.51585024857198,35.462130536267026, ], // starting position [lng, lat] eg. [-122.6788, 45.5212]
  zoom: 13 // starting zoom 
});


let map_array = [map1,map2,map3];
// loop and do same thing
for (const map of map_array)
{
  map.dragPan.disable();
  map.scrollZoom.disable();
  map.boxZoom.disable();
  map.dragRotate.disable();
  map.keyboard.disable();
  map.doubleClickZoom.disable();
  map.touchZoomRotate.disable();
  map.touchZoomRotate.disableRotation();

}
var popup1 = new mapboxgl.Popup({ offset: 25 })
.setHTML('My Current Home, Circa September 2021. Will be here until I get to do remote!');
var popup2 = new mapboxgl.Popup({ offset: 25 })
.setHTML('My most recent conference! ECP meeting 2023, had a blast!');
var popup3 = new mapboxgl.Popup({ offset: 25 })
.setHTML('My first ever conference (VIS 2022), and also my first time seeing WWE live! (this was a major event for me)');

let popup_array= [popup1,popup2,popup3];

const duck_icon = document.createElement('div')
duck_icon.className = 'marker-duck'
const texas_icon = document.createElement('div')
texas_icon.className = 'marker-texas'
const okc_icon = document.createElement('div')
okc_icon.className = 'marker-okc'

var marker1 = new mapboxgl.Marker(duck_icon)
var marker2 = new mapboxgl.Marker(texas_icon)
var marker3 = new mapboxgl.Marker(okc_icon)

let marker_array = [marker1,marker2, marker3];

// helper function : https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
var zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))


for (const [map,marker,popup] of zip(map_array,marker_array,popup_array)){
  marker
    .setLngLat(map.getCenter())
    .setPopup(popup)
    .addTo(map)
}
