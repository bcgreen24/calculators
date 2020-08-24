

$(function () {
    let player = new Audio();
    $('a.music_link').bind('click', function () {
        player.src = "";
        player.src = this.id;
        $('span#song_name').text(this.id);
        player.play();
    });
});
