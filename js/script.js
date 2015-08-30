$(document).ready(function() {

    /*** GOOGLE MAPS ***/
    
    var position = [27.1959739, 78.02423269999997];

    function showGoogleMaps() {
        var latLng = new google.maps.LatLng(position[0], position[1]);

        var mapOptions = {
            zoom: 16, 
            streetViewControl: false, 
            scaleControl: true, 
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: latLng
        };

        map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);

        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP
        });
    }

    google.maps.event.addDomListener(window, 'load', showGoogleMaps);

     /*** VIDEO ***/

    var content = $('#video');
    var video = $('#video')[0];
    var play = $('.play-pause');

     content.on('click', function() {
        if (video.paused) {
            video.play();
            play.hide();
        } else {
            video.pause();
            play.show();
        }
     });


      /*** MENU ***/

      var menu = $('.minified-menu a');
      var close = $('.icon-close');
      var cover = $('.cover-menu-content');

      menu.on('click', function() {
        cover.fadeIn();
      });

      close.on('click', function() {
        cover.fadeOut();
      })
 });
