
this.onload = function() {

    // VIDEO

    var video = document.getElementById('video');
    var play = document.querySelector('.play-pause');

    play.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            play.style.display = 'none';
        }
    });

    video.addEventListener('click', function() {
        if (video.play) {
            video.pause();
            play.style.display = 'inline-block';
        }
    });

    video.addEventListener('ended', function() {
        play.style.display = 'inline-block';
    });

    // FORM

    var sub = document.querySelector('input[type="submit"]');

    sub.addEventListener('click', function(e) {
        e.preventDefault();

        var url = "http://camp.efigence.com/camp/api/contact";
        var name = document.querySelector('.full-name').value;
        var email = document.querySelector('.email').value;
        var message = document.querySelector('.message').value;

        var data = {
            "name" : name,
            "email" : email,
            "message" : message
        }

        var createContact = new module(url);

        createContact.sendRequest('POST', data).then(function(response) {
            var arr = JSON.parse(response);
        }, function(error) {
            console.log("Something goes wrong");
        });
    });
}
