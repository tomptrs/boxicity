import {
    VoteForChoice,
    CountVotes,
    ClearVotes,
    //RetrieveChoices,
    SetChoices,
    SetVotingButtonsDisabled,
    GetVotingAllowed,
    voted
} from './modules/voting.js';

import {
    ToggleVideoPlaying,
    SetVideoPlaying,
    videoPlaying,
    SetVideoEnded,
    videoEnded,
    PlayNextVideo,
    ResetAll,
    GetCurrentScene
} from './modules/videoController.js'

import {
    CreateNewLobby,
    CreateNewQRCode,
    RedirectToLobby,
    DisplayLobbyCode,
    GetParameterByName,
    AddParticipantToLobby,
    StartTimer,
    UpdateParticipantsAmount,
    url
} from "./modules/lobbyController.js";


window.VoteForChoice = VoteForChoice
window.CountVotes = CountVotes
window.ClearVotes = ClearVotes
window.SetChoices = SetChoices
window.SetVotingButtonsDisabled = SetVotingButtonsDisabled
window.GetVotingAllowed = GetVotingAllowed
window.voted = voted

window.ToggleVideoPlaying = ToggleVideoPlaying
window.SetVideoPlaying = SetVideoPlaying
window.videoPlaying = videoPlaying
window.SetVideoEnded = SetVideoEnded
window.videoEnded = videoEnded
window.PlayNextVideo = PlayNextVideo
window.GetCurrentScene = GetCurrentScene

window.CreateNewLobby = CreateNewLobby
window.CreateNewQRCode = CreateNewQRCode
window.RedirectToLobby = RedirectToLobby
window.DisplayLobbyCode = DisplayLobbyCode
window.GetParameterByName = GetParameterByName
window.AddParticipantToLobby = AddParticipantToLobby
window.StartTimer = StartTimer

window.UpdateParticipantsAmount = UpdateParticipantsAmount
window.TogglePlayButton = TogglePlayButton
window.TogglePlayButtonClass = TogglePlayButtonClass
window.ToggleModal = ToggleModal




var timeout;
var currentSeconds = 0;

$(document).ready(function () {
    $('#video_container').animate({
        'opacity': '1'
    }, 500)


    var playBtn = $('#playButton')

    playBtn.click(function () {

        playBtn.toggleClass('paused')
        ToggleVideoPlaying()
        TogglePlayButton()
        return false
    })

    $('#video').click(function () {

        playBtn.toggleClass('paused')
        ToggleVideoPlaying()
        TogglePlayButton()
    })

    $(document).on('mousemove', function () {
        TogglePlayButton()
    })
})

$("#video").on("timeupdate",function(event){
    if (currentSeconds < Math.floor(this.currentTime)){
        currentSeconds = Math.floor(this.currentTime)

        console.log(Math.ceil((this.currentTime/this.duration) * 100))
        $('#progress_bar').css('width', `${Math.ceil((this.currentTime/this.duration) * 100)}%`)
    }
});


export function TogglePlayButton() {
    $('#playButton').css('opacity', '1')
    $('#video_container_overlay').css('background-color', '#000000');

    clearTimeout(timeout);
    timeout = setTimeout(function () {
        if ($('#playButton').hasClass('paused')){
            $('#playButton').css('opacity', '0')
            $('#video_container_overlay').css('background-color', 'transparent');
        }
    }, 2000)
}

export function TogglePlayButtonClass() {
    var playBtn = $('#playButton')

    playBtn.toggleClass('paused')
}

export function ToggleModal() {
    $('#modal').toggleClass('visible');
}
