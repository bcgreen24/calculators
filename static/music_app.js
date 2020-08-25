let song_index = 0;
let playlist = [];
let player = new Audio();

$(function () {

    player.onended = function () {
        if (document.getElementById("autoplay").checked) {
            song_index += 1;
            player.src = playlist[song_index];
            player.play();
            $('span#song_name').text(playlist[song_index]);
        }
    };

    player.ontimeupdate = function(){
        document.getElementById("song_position").innerHTML = convert_duration(player.currentTime);
    };

    $.getJSON($SCRIPT_ROOT + '/get_song_array',
        function (data) {
            for (let i = 0; i < data.songs.length; i++) {
                playlist.push(data.path + data.songs[i]);
            }
        });

    $('button#play_pause').bind('click', function () {
        if (this.innerText === 'Pause') {
            player.pause();
            $('button#play_pause').html('Play');
        } else {
            player.play();
            $('button#play_pause').html('Pause');
        }
    });

    $('a.music_link').bind('click', function () {
        player.src = "";
        player.src = this.id;
        $('span#song_name').text(this.id);
        song_index = playlist.indexOf(this.id);
        player.play();
        player.addEventListener('loadedmetadata', () => {
            $('span#song_duration').html(convert_duration(player.duration));
        });
    });
});

function convert_duration(song_duration) {
    let sec_str;
    let minutes = Math.trunc(song_duration / 60);
    let seconds = Math.trunc(song_duration % 60);
    if (seconds < 10) {
        sec_str = "0" + seconds.toString();
    } else {
        sec_str = seconds.toString();
    }
    return minutes.toString() + ":" + sec_str;
}