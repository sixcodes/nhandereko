/**
 * Contains mission/fire javascript main execution time.
 */

(function () {
    "use strict";

    var geocoder;
    var map;
    var mc;
    var markers = [];
    var currentMarker;

    function insertMarkersFromData (data, map) {
        for (var index in data) {
            var place = data[index];
            var position = new google.maps.LatLng(place.Latitude,
                                                  place.Longitude);

            markers.push(addMarker(map, position, true));
        }
    }

    function addMarker (map, position, notMove) {
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
            center: new google.maps.LatLng(28.3043, 29.179),
            scrollwheel: false,
            zoom: 2,
            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}]
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        geocoder = new google.maps.Geocoder();
        // addMapClickListener(map);
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

                if (currentMarker) {
                    currentMarker.setMap(null);
                }

                currentMarker = addMarker(map, latLng);
            });
        });
    });

    google.maps.event.addDomListener(window, 'load', initialize);
})();

