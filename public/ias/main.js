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
import { allChoices } from './services/ChoicesService.js';


window.VoteForChoice = VoteForChoice
window.CountVotes = CountVotes
window.ClearVotes = ClearVotes
window.SetChoices = SetChoices
window.SetVotingButtonsDisabled = SetVotingButtonsDisabled
window.GetVotingAllowed = GetVotingAllowed

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
window.DisplayVotesCount = DisplayVotesCount
window.ResetVotes = ResetVotes
window.UpdateProgressBar = UpdateProgressBar




var timeout;
var interval;
var currentSeconds = 0;

var lastVotesCount = 0;
var lastVoteOneCount = 0;
var lastVoteTwoCount = 0;

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

export function UpdateProgressBar(video){
    if (currentSeconds < Math.floor(video.currentTime)) {
        currentSeconds = Math.floor(video.currentTime)

        console.log(Math.ceil((video.currentTime / video.duration) * 100))
        $('#progress_bar').css('width', `${Math.ceil((video.currentTime / video.duration) * 100)}%`)
    }
};

function ResetProgressBar(){
    $('#progress_bar').css('width', `0%`)
    currentSeconds = 0;
}


export function TogglePlayButton() {
    $('#playButton').css('opacity', '1')
    $('#video_container_overlay').css('background-color', '#000000');

    clearTimeout(timeout);
    timeout = setTimeout(function () {
        if ($('#playButton').hasClass('paused')) {
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

    if ($('#modal').hasClass('visible')){
        interval = setInterval(() => {
            DisplayVotesCount();
        }, 200);
    } else{
        clearInterval(interval);
    }
}

export function DisplayVotesCount() {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode'), function (lobbyData) {
        var totalVotes = lobbyData.choiceOne + lobbyData.choiceTwo;

        console.log(totalVotes, lastVotesCount, lobbyData.choiceOne, lastVoteOneCount, lobbyData.choiceTwo, lastVoteTwoCount)

        if (lastVotesCount < totalVotes) {
            lastVotesCount = totalVotes
        }

        if (lastVoteOneCount < lobbyData.choiceOne) {
            UpdateGraphs(totalVotes, lobbyData.choiceOne, lobbyData.choiceTwo);
            lastVoteOneCount = lobbyData.choiceOne
        }

        if (lastVoteTwoCount < lobbyData.choiceTwo) {
            UpdateGraphs(totalVotes, lobbyData.choiceOne, lobbyData.choiceTwo);
            lastVoteTwoCount = lobbyData.choiceTwo
        }
    })
}

export function UpdateGraphs(totalVotes, choiceOne, choiceTwo) {
    console.log('Graphs updated!')
    var heightChoiceTwo = Math.ceil(choiceTwo / totalVotes * 100)
    $('#choice_two_graph').css('height', `${heightChoiceTwo}%`)

    var heightChoiceOne = Math.ceil(choiceOne / totalVotes * 100)
    $('#choice_one_graph').css('height', `${heightChoiceOne}%`)

    $('#choice_one_votes_amount').html(choiceOne)
    $('#choice_two_votes_amount').html(choiceTwo)

    GetCurrentScene((currentScene) => {    
        $('#choice_one_subtitle').html(allChoices[currentScene].textC1)
        $('#choice_two_subtitle').html(allChoices[currentScene].textC2)

        $('#choice_one_subtitle').css('opacity', '1')
        $('#choice_two_subtitle').css('opacity', '1')
    });
}

export function ResetVotes(){
    ResetProgressBar();

    lastVotesCount = 0;
    lastVoteOneCount = 0;
    lastVoteTwoCount = 0;

    $('#choice_one_votes_amount').html('0')
    $('#choice_two_votes_amount').html('0')
    $('#choice_one_graph').css('height', `0%`)
    $('#choice_two_graph').css('height', `0%`)
    $('#choice_one_subtitle').css('opacity', '1')
    $('#choice_two_subtitle').css('opacity', '1')
}
