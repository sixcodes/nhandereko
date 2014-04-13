/**
 * Contains mission/fire javascript main execution time.
 */

(function () {
    "use strict";

    var geocoder;
    var map;
    var mc;
    var markers = [];

    function insertMarkersFromData (data, map) {
        for (var index in data) {
            var place = data[index];
            var position = new google.maps.LatLng(place.Latitude,
                                                  place.Longitude);

            markers.push(addMarker(map, position, true));
        }
    }

    function addMarker (map, position, notMove) {
        console.log(position);
        var marker = new google.maps.Marker({
            position: position,
            animation: google.maps.Animation.DROP,
            map: map,
            title: 'Titulo'
        });

        if (!notMove) {
            map.panTo(position);
            map.setZoom(14);
        }

        return marker;
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
            zoom: 2,
            style: [{"featureType":"poi","stylers":[{"visibility":"off"}]},{"stylers":[{"saturation":-70},{"lightness":37},{"gamma":1.15}]},{"elementType":"labels","stylers":[{"gamma":0.26},{"visibility":"off"}]},{"featureType":"road","stylers":[{"lightness":0},{"saturation":0},{"hue":"#ffffff"},{"gamma":0}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"lightness":50},{"saturation":0},{"hue":"#ffffff"}]},{"featureType":"administrative.province","stylers":[{"visibility":"on"},{"lightness":-50}]},{"featureType":"administrative.province","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"lightness":20}]}]
        };

        map = new google.maps.Map(document.getElementById("map"),
                                      mapOptions);
        geocoder = new google.maps.Geocoder();
        addMapClickListener(map);
        insertMarkersFromData(geoData, map);
        mc = new MarkerClusterer(map, markers);
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

