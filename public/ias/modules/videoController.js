import { ClearVotes, CountVotes, voted, /*RetrieveChoices*/ } from './voting.js'
import { url } from './lobbyController.js'
import { allChoices } from '../services/ChoicesService.js';

export var videoPlaying;
export var videoEnded = false;

export function ToggleVideoPlaying() {
    const video = document.getElementById('video');
    if (video != null) {
        if (video.paused) {
            videoPlaying = true
            $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/videoplaying?playing=' + videoPlaying, function (result) {
                console.log(result);
            })
            video.play();
        } else {
            videoPlaying = false
            $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/videoplaying?playing=' + videoPlaying, function (result) {
                console.log(result);
            })
            video.pause();
        }
    }
}

export function GetCurrentScene(callback = null) {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode'), function (result) {
        console.log(result.currentScene);
        callback(result.currentScene);
    })
}

export function SetVideoPlaying(playing) {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/videoplaying?playing=' + playing, function (result) {
        console.log(result);
    })
}

export function SetVideoEnded(ended) {
    videoEnded = ended;
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/videoplaying?playing=' + 'false', function (result) {
        console.log(result);
    })
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/videoended?ended=' + ended, function (result) {
        console.log(result);
    })
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/votingallowed?allowed=' + ended, function (result) {
        console.log(result);
    })
}

export function ResetAll() {
    /*SetVideoEnded(false);
    ClearVotes();
    SetVideoPlaying(false);*/

    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/reset');
    voted = false;
}

export function IncrementCurrentScene(callback = null) {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/incrementcurrentscene');
}

export function PlayNextVideo() {

    /*RetrieveChoices(() => {
        CountVotes((winner) => {
            const video = document.getElementById('video'); 
            const source = document.getElementById('videoSource');
        
            source.setAttribute('src', './assets/videos/' + allChoices[currentScene].videos[winner] + '.mp4');
            currentScene++
            video.load();
            ToggleVideoPlaying();

            ResetAll();
        });
        
    });*/
    CountVotes((winner) => {
        if (winner != -1){
            GetCurrentScene((currentScene) => {
                if (currentScene < allChoices.length){
                    const video = document.getElementById('video');
                    const source = document.getElementById('videoSource');
    
                    source.setAttribute('src', './assets/videos/' + allChoices[currentScene].videos[winner] + '.mp4');
    
                    IncrementCurrentScene()
    
                    video.load();
                    ToggleVideoPlaying();
                    ResetAll();
                } else {
                    window.location.href = url + '/';
                }
            });
        }
    });
}