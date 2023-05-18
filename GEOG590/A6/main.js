        // Insert the JavaScript within the <script> tags, within the body   
        // Start with the Mapbox access token
        mapboxgl.accessToken = 'pk.eyJ1Ijoiam9tZXJzb24iLCJhIjoiY2o1bXE2bHlyMnJhZDMzbnpyMnhlODdpcSJ9.QJMJ_cTFCY050aZfSn1umQ';

        // Initialize the map
        var map = new mapboxgl.Map({
            container: 'map', // id of a div on your page, where the map will be inserted
            style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
            center: [-122.6788, 45.5212], // starting position [lng, lat] eg. [-122.6788, 45.5212]
            zoom: 12, // starting zoom 
            minZoom: 2 //minimum zoom allowed
        });

 /***  POPUPS  ***/
        
 // Popup for marker 1  
 var popup1_content = '<h2>Play the video to listen to Portland</h2><br>';
 popup1_content += '<iframe width="300px" src="https://www.youtube.com/embed/z1AdmS-LqyA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
 popup1_content += 'Source: Ian Lind, <a href="https://www.youtube.com/embed/z1AdmS-LqyA" target="_blank">YouTube</a>';

        
 var popup1 = new mapboxgl.Popup({ minWidth:'300px' })
     .setHTML(popup1_content);
       
 // Popup for marker 2  
 var popup2_content = '<h2>Press play to listen to London in 1928</h2><br>';
 popup2_content += '<iframe width="100%" height="200" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/892654294&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/londonstreetnoises" title="London Street Noises" target="_blank" style="color: #cccccc; text-decoration: none;">London Street Noises</a> · <a href="https://soundcloud.com/londonstreetnoises/grosvenor-1928" title="London Grosvenor Place / Grosvenor Crescent in 1928" target="_blank" style="color: #cccccc; text-decoration: none;">London Grosvenor Place / Grosvenor Crescent in 1928</a></div>';
 
popup2_content += 'Source: LondonStreetNoises.co.uk, <a href="https://soundcloud.com/londonstreetnoises" target="_blank"> SoundCloud </a>';


        
 var popup2 = new mapboxgl.Popup({ minWidth:'300px' })
     .setHTML(popup2_content);

    
 // Popup for marker 3  
 var popup3_content = '<h2>Press play to listen to a bison eating</h2><br>';   
 popup3_content += '<audio controls><source src="sounds/yell-YELLBisonEating150313.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>';
 popup3_content += 'Source: NPS/Jennifer Jerret, <a href="https://www.nps.gov/yell/learn/photosmultimedia/sounds-bisoneating.htm" target="_blank">NPS</a>';
 popup3_content += '<img class="popupImage" alt="A herd of bison along the Gibbon River. Photo taken in winter, heavy snow cover across the region." src="https://www.nps.gov/yell/learn/photosmultimedia/images/ndh-yell-bison-gibbon_2.jpg?maxwidth=1200&maxheight=1200&autorotate=false">' ;
 popup3_content += 'Source: NPS/Neal Herbert, <a href="https://www.nps.gov/yell/learn/photosmultimedia/sounds-bisoneating.htm" target="_blank">NPS</a>';


 var popup3 = new mapboxgl.Popup({ minWidth:'300px' })
     .setHTML(popup3_content);

/***  END POPUPS  ***/ 


   /***  MARKERS  ***/
      // Marker 1 - Portland
      var marker1 = new mapboxgl.Marker({color:'navy'})
      .setLngLat([-122.6788,45.5212]) // Portland 
      .setPopup(popup1) 
      .addTo(map);

      
  // Marker 2 - London 
  var marker2 = new mapboxgl.Marker({color:'navy'})
     .setLngLat([-0.1534307, 51.501223]) // London 
     .setPopup(popup2) 
     .addTo(map);

      
  // Marker 3 - Yellowstone
  var marker3 = new mapboxgl.Marker({color:'navy'})
    .setLngLat([-110.74524187568,44.706216445069]) // Yellowstone
    .setPopup(popup3) 
    .addTo(map);
  /***  END MARKERS  ***/


/***  LISTENERS  ***/
        
// Add a 'Listener' to the button element with the ID 'LondonButton'.
document.getElementById('LondonButton').addEventListener('click', function () {
    map.jumpTo({
        center: [-0.1534307, 51.501223], 
        zoom: 11
    });
});
    
// Add a 'Listener' to the button element with the ID 'PortlandButton'.
document.getElementById('PortlandButton').addEventListener('click', function () {
    map.jumpTo({
        center:[-122.6788,45.5212], 
        zoom: 9
    });
});

document.getElementById('YellowstoneButton').addEventListener('click', function () {
    map.jumpTo({
        center:[-110.74524187568,44.706216445069], 
        zoom: 9
    });
});

/***  END LISTENERS  ***/
