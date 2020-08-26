let song_index = 0;
let playlist = [];
let player = new Audio();
let bar_width = 0;
let current_bar_width = 0;
let timer;

$(function () {

    $('div#play_pos').mousedown(function (event) {
        var relX = event.pageX - $(this).offset().left;
        current_bar_width = relX;
        const num = Math.floor(relX);
        player.currentTime = scale(num, 0, 350, 0, player.duration);
    });

    player.addEventListener('loadedmetadata', () => {
        $('span#song_duration').html(convert_duration(player.duration));
        bar_width = document.getElementById('play_pos').offsetWidth / player.duration;
        timer = setInterval(advance_progress_bar, 1000);
    });

    player.onended = function () {
        clearInterval(timer);
        if (document.getElementById("autoplay").checked) {
            player.src = "";
            song_index += 1;
            player.src = playlist[song_index];
            $('a.music_link').removeClass("active");
            // $('a.music_link')[song_index].add("active");
            $('span#song_name').text(playlist[song_index]);
            current_bar_width = 0;
            bar_width = 0;
            player.play();
        }
    };

    player.ontimeupdate = function () {
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
        clearInterval(timer);
        $('a.music_link').removeClass("active");
        this.classList.add("active");
        $('span#song_name').text(this.id);
        song_index = playlist.indexOf(this.id);
        current_bar_width = 0;
        bar_width = 0;
        player.play();

    });
});

function advance_progress_bar() {
    current_bar_width += bar_width;
    if(current_bar_width <= $('#play_pos').width()){
        $('div#play_bar').width(current_bar_width);
    }

}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

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
