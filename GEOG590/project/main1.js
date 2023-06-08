mapboxgl.accessToken = 'pk.eyJ1IjoibWVnaGFudG8iLCJhIjoiY2xnNWRucDdsMDJldDNrbmRubXFlOGZ3cCJ9.LyZK-PVSq3JxoS2GkQV9vQ'; //  Put your access token between the single quotes.
portland_center = [-87.623177, 41.881832]; //store portland center

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
});

//store popups of left and right orientations (related to customization 1)
var popupleft = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    anchor: 'left'
});
var popupright = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    anchor: 'right'
});

var propertyLeft = "year_median";
var propertyRight = "Median_Rent_2012-16";


var ownerMap = new mapboxgl.Map({
    container: 'owners', // id of a div on your page, where the map will be inserted
    style: 'mapbox://styles/meghanto/clindro7s008f01od89po57ci', // stylesheet location
    center: portland_center, // starting position [lng, lat] eg. [-122.6788, 45.5212]
    zoom: 10 // starting zoom 
});


var renterMap = new mapboxgl.Map({
    container: 'renters', // owners map div 
    style: 'mapbox://styles/meghanto/clinf5ml7008g01od50v1aq6y', // Mapbox light style so we can observe the swipe
    center: portland_center,// Use the same center as your other map so that they are perfectly aligned
    zoom: 10
});
var container = '#comparison-container';

var map = new mapboxgl.Compare(ownerMap, renterMap, container, {
})

ownerMap.on('load', function () {
    // the rest of the owner data code will go in here


    ownerMap.on('mousemove', 'meghanto-censustracts', function (e) {

        // Change the cursor style as a UI indicator.
        ownerMap.getCanvas().style.cursor = 'pointer';

        var coordinates = e.lngLat;
        var description = e.features[0].properties[propertyLeft];

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(propertyLeft +"  "+ description)
            .addTo(ownerMap);
        var popup_right = popup.getElement().getBoundingClientRect().right;
        //check if the popup overlaps with the slider or not
        if (popup_right * 1.1 > map.currentPosition) {
            popup.remove();
            popupright.setLngLat(coordinates)
                .setHTML(propertyLeft +"  "+ description)
                .addTo(ownerMap);
        }
        else {
            popupright.remove();
        }

    });

    ownerMap.on('mouseleave', 'meghanto-censustracts', function () {
        ownerMap.getCanvas().style.cursor = '';
        popup.remove();
        popupright.remove();
    });


});


renterMap.on('load', function () {
    
    renterMap.on('mousemove', 'meghanto-censustracts', function (e) {

        // Change the cursor style as a UI indicator.
        renterMap.getCanvas().style.cursor = 'pointer';
        var coordinates = e.lngLat;
        var description = e.features[0].properties[propertyRight];

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(propertyRight +"  "+ description + "$")
            .addTo(renterMap);
        var popup_left = popup.getElement().getBoundingClientRect().left;
        //check if the popup overlaps with the slider or not (note, here we check the left edge)
        if (popup_left < map.currentPosition * 1.1) {
            popup.remove();
            popupleft.setLngLat(coordinates)
                .setHTML(propertyRight +"  "+ description + "$")
                .addTo(renterMap);
        }
        else {
            popupleft.remove();
        }
    });

    renterMap.on('mouseleave', 'meghanto-censustracts', function () {
        renterMap.getCanvas().style.cursor = '';
        popup.remove();
        popupleft.remove();
    });

});

ownerMap.addControl(new mapboxgl.NavigationControl(), 'top-left'); // add navigation controls in top left corner
renterMap.addControl(new mapboxgl.NavigationControl(), 'top-left'); //controls present in both halves at same location for seamlessness