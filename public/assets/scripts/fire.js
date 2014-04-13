/**
 * Contains mission/fire javascript main execution time.
 */

(function () {
    "use strict";

    var geocoder;
    var map;

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

    function codeLatLng (geocoder, position, callback) {
        geocoder.geocode({'latLng': position}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1] && callback) {
                    callback(results[1].formatted_address);
                }
            }
        });
    }

    function codeAddress (geocoder, address, callback) {
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    callback(results[0].geometry.location);
                }
            }
        });
    }

    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 13
        };

        map = new google.maps.Map(document.getElementById("map"),
                                      mapOptions);
        geocoder = new google.maps.Geocoder();
        addMapClickListener(map);
    }

    $(function () {
        $('.btn-map-select').click(function (ev) {
            ev.preventDefault();

            $('#map').animate({
                opacity: 1,
                height: '350px'
            }, 300);

            var inputVal = $('.map-input').val();
            codeAddress(geocoder, inputVal, function (latLng) {
                addMarker(map, latLng);
            });
        });
    });

    google.maps.event.addDomListener(window, 'load', initialize);
})();
