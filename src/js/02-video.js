import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const PLAYER_CURRENT_TIME = "videoplayer-current-time";
const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);

player.on('timeupdate', throttle(onVideoPlay, 1000));

player.setCurrentTime(localStorage.getItem(PLAYER_CURRENT_TIME)).then(function (seconds) {
    seconds = localStorage.getItem(PLAYER_CURRENT_TIME);
}).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});

function onVideoPlay(evt) {
    localStorage.setItem(PLAYER_CURRENT_TIME, evt.seconds);
}