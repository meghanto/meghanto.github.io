mapboxgl.accessToken = 'pk.eyJ1IjoibWVnaGFudG8iLCJhIjoiY2xnNWRucDdsMDJldDNrbmRubXFlOGZ3cCJ9.LyZK-PVSq3JxoS2GkQV9vQ'; //  Put your access token between the single quotes.
var map = new mapboxgl.Map({
    container: 'map', // id of a div on your page, where the map will be inserted
    style: 'mapbox://styles/meghanto/clgpgnuem002s01rh0jkp7cih', // stylesheet location
    center: [-122.67057166438065, 45.52377013932523,], // starting position [lng, lat] eg. [-122.6788, 45.5212]
    zoom: 11 // starting zoom 
});
map.addControl(new mapboxgl.NavigationControl(), 'top-left'); // add navigation controls in top left corner

var state = { panelOpen: true, ownerVisible: true, renterVisible: true }; //state object, needed for panel state, owner and renter layer visibility

// code for collapsing the panel if open and vice versa 
function panelSelect(e) {
    if (state.panelOpen) {
        document.getElementById('descriptionPanel').style.height = '26px';
        document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-up";
        state.panelOpen = false;
    } else {
        document.getElementById('descriptionPanel').style.height = '250px';
        document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-down";
        state.panelOpen = true;
    }
}

// Toggle owner layer based on state 
function ownerToggle(e) {
    map.setLayoutProperty('owner-occupied', 'visibility', state.ownerVisible ? 'none' : 'visible');
    state.ownerVisible = !(state.ownerVisible);
    e.classList.toggle("inactive");
}

// Toggle renter layer based on state
function renterToggle(e) {
    map.setLayoutProperty('renter-occupied', 'visibility', state.renterVisible ? 'none' : 'visible');
    state.renterVisible = !(state.renterVisible);
    e.classList.toggle("inactive");
}
