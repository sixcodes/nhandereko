/**
 * Contains mission/fire javascript main execution time.
 */

$('.btn-map-select').click(function (ev) {
    ev.preventDefault();

    $('#map').animate({
        opacity: 1,
        height: '350px'
    }, 300);
});


function addMarker (map, position) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Titulo'
    });

    map.panTo(position);
}

function addMapClickListener (map) {
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(map, event.latLng);
    });
}


function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };

    var map = new google.maps.Map(document.getElementById("map"),
                                  mapOptions);
    addMapClickListener(map);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(-34.397, 150.644),
      map: map,
      title: 'Hello World!'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
