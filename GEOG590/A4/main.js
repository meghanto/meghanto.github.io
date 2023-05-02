mapboxgl.accessToken = 'pk.eyJ1IjoibWVnaGFudG8iLCJhIjoiY2xnNWRucDdsMDJldDNrbmRubXFlOGZ3cCJ9.LyZK-PVSq3JxoS2GkQV9vQ'; //  Put your access token between the single quotes.
portland_center = [-122.67057166438065, 45.52377013932523,]; //store portland center

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



var ownerMap = new mapboxgl.Map({
    container: 'owners', // id of a div on your page, where the map will be inserted
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: portland_center, // starting position [lng, lat] eg. [-122.6788, 45.5212]
    zoom: 10 // starting zoom 
});


var renterMap = new mapboxgl.Map({
    container: 'renters', // owners map div 
    style: 'mapbox://styles/mapbox/dark-v10', // Mapbox light style so we can observe the swipe
    center: portland_center,// Use the same center as your other map so that they are perfectly aligned
    zoom: 10
});
var container = '#comparison-container';

var map = new mapboxgl.Compare(ownerMap, renterMap, container, {
})

ownerMap.on('load', function () {
    // the rest of the owner data code will go in here
    ownerMap.addLayer({
        id: 'Owner Data',
        type: "fill",
        source: {
            type: 'vector',
            url: 'mapbox://meghanto.0q6s5bpa'  //input your tileset ID url e.g. 'mapbox://jomerson.6ykhlovc' 
        },
        'source-layer': 'Owner-Renter-Pop-bghv3z', //input your source layer name e.g. 'Owner-Renter-Pop-ca08iw'
        paint: {
            'fill-color':
                ["interpolate-hcl", //changed the color mapping from step to interpolate-hcl
                    ["linear"],
                    ["get", "Own"],
                    0.0,
                    "hsl(225, 100%, 100%)",
                    17.0,
                    "hsl(203, 47%, 82%)",
                    22.0,
                    "hsl(202, 57%, 63%)",
                    27.0,
                    "#3182bd",
                    32.0,
                    "hsl(210, 90%, 52%)",
                    100.0,
                    "hsl(210, 95%, 0%)"
                ],
            "fill-opacity": 0.7
        }

    });
    ownerMap.on('mousemove', 'Owner Data', function (e) {

        // Change the cursor style as a UI indicator.
        ownerMap.getCanvas().style.cursor = 'pointer';

        var coordinates = e.lngLat;
        var description = e.features[0].properties.Own;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML("Owners: " + description + "%")
            .addTo(ownerMap);
        var popup_right = popup.getElement().getBoundingClientRect().right;
        //check if the popup overlaps with the slider or not
        if (popup_right * 1.1 > map.currentPosition) {
            popup.remove();
            popupright.setLngLat(coordinates)
                .setHTML("Owners: " + description + "%")
                .addTo(ownerMap);
        }
        else {
            popupright.remove();
        }

    });

    ownerMap.on('mouseleave', 'Owner Data', function () {
        ownerMap.getCanvas().style.cursor = '';
        popup.remove();
        popupright.remove();
    });


});


renterMap.on('load', function () {
    renterMap.addLayer({
        id: 'Renter Data',
        type: "fill",
        source: {
            type: 'vector',
            url: 'mapbox://meghanto.0q6s5bpa' //input your tileset ID URL
        },
        'source-layer': 'Owner-Renter-Pop-bghv3z', //input your source layer name e.g. Owner-Renter-Pop-dr7310
        paint: {
            'fill-color':
                ["interpolate-hcl",  //changed the color mapping from step to interpolate-hcl
                    ["linear"],
                    ["get", "Rent"],
                    0.0,
                    "hsl(225, 100%, 100%)",
                    17.0,
                    "hsl(203, 47%, 82%)",
                    22.0,
                    "hsl(202, 57%, 63%)",
                    27.0,
                    "#3182bd",
                    32.0,
                    "hsl(210, 90%, 52%)",
                    100.0,
                    "hsl(210, 95%, 0%)"
                ],
            "fill-opacity": 0.7

        }
    });

    renterMap.on('mousemove', 'Renter Data', function (e) {

        // Change the cursor style as a UI indicator.
        renterMap.getCanvas().style.cursor = 'pointer';
        var coordinates = e.lngLat;
        var description = e.features[0].properties.Rent;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML("Renters: " + description + "%")
            .addTo(renterMap);
        var popup_left = popup.getElement().getBoundingClientRect().left;
        //check if the popup overlaps with the slider or not (note, here we check the left edge)
        if (popup_left < map.currentPosition * 1.1) {
            popup.remove();
            popupleft.setLngLat(coordinates)
                .setHTML("Renters: " + description + "%")
                .addTo(renterMap);
        }
        else {
            popupleft.remove();
        }
    });

    renterMap.on('mouseleave', 'Renter Data', function () {
        renterMap.getCanvas().style.cursor = '';
        popup.remove();
        popupleft.remove();
    });

});

ownerMap.addControl(new mapboxgl.NavigationControl(), 'top-left'); // add navigation controls in top left corner
renterMap.addControl(new mapboxgl.NavigationControl(), 'top-left'); //controls present in both halves at same location for seamlessness