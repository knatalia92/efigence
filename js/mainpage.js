
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
}
