let { store, component } = reef;


mapboxgl.accessToken = 'pk.eyJ1IjoibWVnaGFudG8iLCJhIjoiY2xnNWRucDdsMDJldDNrbmRubXFlOGZ3cCJ9.LyZK-PVSq3JxoS2GkQV9vQ'; //  Put your access token between the single quotes.
portland_center = [-87.623177, 41.881832]; //store portland center
let minmax_vars = {
    'median': [1886.0, 2010.0],
    'std': [0.0, 59.926145021541785],
    'count': [2, 2331],
    'Median_Rent_2012-16': [286.0, 2771.0],
    'Job_Growth_Rate_from_2004_to_2013': [-0.3449, 0.6485],
    'Median_Hhold._Income_of_Residents_in_2012-16': [9367.0, 157595.0],
    'Median_Hhold._Income_of_Residents_in_1990': [9068.0, 139103.0],
    'Poverty_Rate_in_2012-16': [0.0062, 0.717],
    'Fraction_College_Graduates_in_2012-16': [0.0052, 0.9573],
    'Fraction_Non-White_in_2010': [0.0868, 1.0],
    'Foreign-Born_Share_in_2012-16': [0.0, 0.6964],
    'Fraction_Single_Parents_in_2012-16': [0.0, 1.0],
    'Population_Density_in_2010': [0.0, 543333.0],
    'Density_of_Jobs_in_2013': [0.0, 670858.0],
    'Fraction_with_Short_Work_Commutes_in_2012-16': [0.0, 0.5636],
    'Census_Response_Rate_Social_Capital_Proxy': [43.0, 91.8]
};
let var_names = {
    'median': 'Median Year Built',
    'std': 'Standard Deviation: Year Built',
    'count': 'Number of Buildings',
    'tract': 'Tract Number',
    'Name': 'Tract Name',
    'Median_Rent_2012-16': 'Median Rent (2012-16) (in $)',
    'Job_Growth_Rate_from_2004_to_2013': 'Job Growth Rate (2004-2013)',
    'Median_Hhold._Income_of_Residents_in_2012-16': 'Median HH income in 2012-16(in $)',
    'Median_Hhold._Income_of_Residents_in_1990': 'Median HH income in 1990 (in $)',
    'Poverty_Rate_in_2012-16': 'Poverty Rate in 2012-16',
    'Fraction_College_Graduates_in_2012-16': 'College Graduate Fraction in 2012-16',
    'Fraction_Non-White_in_2010': 'Non-White Fraction in 2012-16',
    'Foreign-Born_Share_in_2012-16': 'Foreign-born fraction in 2012-16',
    'Fraction_Single_Parents_in_2012-16': 'Fraction Single Parents in 2012-16',
    'Population_Density_in_2010': 'Population Density in 2010 (per sq.mile)',
    'Density_of_Jobs_in_2013': 'Density of Jobs in 2013(per sq.mile)',
    'Fraction_with_Short_Work_Commutes_in_2012-16': 'Short Work Commute Fraction 2012-16',
    'Census_Response_Rate_Social_Capital_Proxy': 'Census Report Rate'
};

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

ownerMap.dragRotate.disable();

// disable map rotation using touch rotation gesture
ownerMap.touchZoomRotate.disableRotation();

renterMap.dragRotate.disable();

// disable map rotation using touch rotation gesture
renterMap.touchZoomRotate.disableRotation();


ownerMap.on('load', function () { })
// the rest of the owner data code will go in here


ownerMap.on('mousemove', 'meghanto-censustracts', function (e) {

    // Change the cursor style as a UI indicator.
    ownerMap.getCanvas().style.cursor = 'pointer';

    var coordinates = e.lngLat;
    var description = e.features[0].properties[propertyLeft];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
        .setHTML(propertyLeft + "  " + description)
        .addTo(ownerMap);
    var popup_right = popup.getElement().getBoundingClientRect().right;
    //check if the popup overlaps with the slider or not
    if (popup_right * 1.1 > map.currentPosition) {
        popup.remove();
        popupright.setLngLat(coordinates)
            .setHTML(propertyLeft + "  " + description)
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



renterMap.on('load', function () { })

renterMap.on('mousemove', 'meghanto-censustracts', function (e) {

    // Change the cursor style as a UI indicator.
    renterMap.getCanvas().style.cursor = 'pointer';
    var coordinates = e.lngLat;
    var description = e.features[0].properties[propertyRight];

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
        .setHTML(propertyRight + "  " + description + "$")
        .addTo(renterMap);
    var popup_left = popup.getElement().getBoundingClientRect().left;
    //check if the popup overlaps with the slider or not (note, here we check the left edge)
    if (popup_left < map.currentPosition * 1.1) {
        popup.remove();
        popupleft.setLngLat(coordinates)
            .setHTML(propertyRight + "  " + description + "$")
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


ownerMap.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left'); // add navigation controls in top left corner
renterMap.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-left'); //controls present in both halves at same location for seamlessness
var panelDesc = document.getElementById('glyph');
var panelstate = { panelopen: true };
ownerMap.on('mousedown', () => {
    document.getElementById('text_panel').style.display = 'none';
    document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-down";
    panelstate.panelOpen = false;
})
renterMap.on('mousedown', () => {
    document.getElementById('text_panel').style.display = 'none';
    document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-down";
    panelstate.panelOpen = false;
})

panelDesc.addEventListener('click', panelSelect)
function panelSelect(e) {
    if (panelstate.panelOpen) {
        document.getElementById('text_panel').style.display = 'none';
        document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-down";
        panelstate.panelOpen = false;
    } else {
        document.getElementById('text_panel').style.display = 'block';
        document.getElementById('glyph').className = "chevron glyphicon glyphicon-chevron-up";
        panelstate.panelOpen = true;
    }
}

data = store({ leftvar: "median", rightvar: "Median_Rent_2012-16" })
function leftLegend() {
    return `<span style="color:white">${minmax_vars[data.leftvar][0]}</span><span >${minmax_vars[data.leftvar][1]}</span> `;
}
function rightLegend() {
    return `<span style="color:white">${minmax_vars[data.rightvar][0]}</span><span >${minmax_vars[data.rightvar][1]}</span> `;
}

component('#legendleft', leftLegend);
component('#legendright', rightLegend);