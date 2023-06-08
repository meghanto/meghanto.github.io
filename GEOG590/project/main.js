mapboxgl.accessToken = 'pk.eyJ1IjoibWVnaGFudG8iLCJhIjoiY2xnNWRucDdsMDJldDNrbmRubXFlOGZ3cCJ9.LyZK-PVSq3JxoS2GkQV9vQ'; //  Put your access token between the single quotes.
var map = new mapboxgl.Map({
    container: 'map', // id of a div on your page, where the map will be inserted
    style: 'mapbox://styles/meghanto/clid8790q001701q126sq1ak7', // stylesheet location
    center: [-87.623177, 41.881832], // starting position [lng, lat] eg. [-122.6788, 45.5212]
    zoom: 13, // starting zoom
    minZoom: 13
});
map.addControl(new mapboxgl.NavigationControl(), 'top-left'); // add navigation controls in top left corner
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
});

map.on('load', function () {

    var slider = document.getElementById('slider-range');

    // number of decimal places 
    decimals = 0;

    // format object
    numberFormat = {
        // 'to' the formatted value. Receives a number.
        to: function (value) {
            return value.toFixed(decimals);
        },
        // 'from' the formatted value.
        // Receives a string, should return a number.
        from: function (value) {
            return Number(value);;
        }
    };

    noUiSlider.create(slider, {
        start: [1850, 1850, 2020, 2020],
        connect: true,
        step: 1,
        handleAttributes: [{},
        { 'aria-label': 'lower' },
        { 'aria-label': 'upper' },
        {}
        ],
        tooltips: true,
        format: numberFormat,
        behaviour: 'drag',
        range: {
            'min': 1850,
            'max': 2020
        }
    });

    slider.noUiSlider.disable(0);
    slider.noUiSlider.disable(3);


    var handles = slider.querySelectorAll('.noUi-handle')

    handles[0].classList.add('hidden');
    handles[3].classList.add('hidden');
    handles[1].classList.add('noUi-handle-lower');

    var connectors = slider.querySelectorAll('.noUi-connect')

    connectors[0].classList.add('black');
    connectors[2].classList.add('black');

    slider.noUiSlider.on('update', () => {
        map.setFilter('chicago-buildingfootprints', ["all",
            [">=",
                ["get", "year_built"],
                slider.noUiSlider.get(true)[1]],
            ["<=",
                ["get", "year_built"],
                slider.noUiSlider.get(true)[2],
            ]
        ],
            { validate: false })
    })

    map.on('mousemove', 'chicago-buildingfootprints', function (e) {
        var coordinates = e.lngLat;
        var description = e.features[0].properties.year_built;

        if (description !== 0 && (description < slider.noUiSlider.get(true)[1] || description > slider.noUiSlider.get(true)[2]))
            return;

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(coordinates)
            .setHTML("Year Built: " + (description != 0 ? description : "Not Found"))
            .addTo(map);


    })
    map.on('mouseleave', 'chicago-buildingfootprints', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();

    });
});

