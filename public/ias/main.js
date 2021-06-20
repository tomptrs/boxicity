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
    url,
    iasURL
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
window.UpdateGraphs = UpdateGraphs



var timeout;
var interval;
var currentSeconds = 0;
var redirectSeconds = 10;

var plusOneAmount = 0;

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

export function UpdateProgressBar(video) {
    if (currentSeconds < Math.floor(video.currentTime)) {
        currentSeconds = Math.floor(video.currentTime)

        console.log(Math.ceil((video.currentTime / video.duration) * 100))
        $('#progress_bar').css('width', `${Math.ceil((video.currentTime / video.duration) * 100)}%`)
    }
};

function ResetProgressBar() {
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

    if ($('#modal').hasClass('visible')) {
        interval = setInterval(() => {
            DisplayVotesCount();
        }, 200);
    } else {
        clearInterval(interval);
    }
}

export function DisplayVotesCount() {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode'), function (lobbyData) {
        var totalVotes = lobbyData.choiceOne + lobbyData.choiceTwo;

        console.log(totalVotes, lastVotesCount, lobbyData.choiceOne, lastVoteOneCount, lobbyData.choiceTwo, lastVoteTwoCount)

        if (lastVotesCount < totalVotes) {
            lastVotesCount = totalVotes
            UpdateWinner(lobbyData.choiceOne, lobbyData.choiceTwo)
        }

        if (lastVoteOneCount < lobbyData.choiceOne) {
            UpdateGraphs(totalVotes, lobbyData.choiceOne, lobbyData.choiceTwo);
            AnimatePlus(1)
            lastVoteOneCount = lobbyData.choiceOne
        }

        if (lastVoteTwoCount < lobbyData.choiceTwo) {
            UpdateGraphs(totalVotes, lobbyData.choiceOne, lobbyData.choiceTwo);
            AnimatePlus(2)
            lastVoteTwoCount = lobbyData.choiceTwo
        }
    })
}

function AnimatePlus(graphNo){
    var graphID;
    var plusOneID;
    var plusOneClass = '#plus_anim'

    if (graphNo == 1){
        graphID = '#choice_one_graph'
        plusOneID = `#plus_anim_one`
    }
    
    else if (graphNo == 2){
        graphID = '#choice_two_graph'
        plusOneID = `#plus_anim_two`
    }

    $(plusOneID).toggleClass('plus_anim')
    setTimeout(() => {
        $(plusOneID).toggleClass('plus_anim')
    }, 500);

    plusOneAmount++;
}

function UpdateWinner(choiceOne, choiceTwo) {
    var winner;
    var difference;

    if (choiceOne > choiceTwo){
        difference = choiceOne - choiceTwo;
        winner = 1
    }
    else if (choiceTwo > choiceOne){
        difference = choiceTwo - choiceOne;
        winner = 2
    }
    else
        winner = 0;

    $('#winning_choice').animate({
        'opacity': '0'
    }, 100, function () {
        if (winner != 0)
            $('#winning_choice').html(`Choice ${winner} is winning by ${difference} vote(s)!`)
        else 
            $('#winning_choice').html(`It's a draw!`)

            $('#winning_choice').animate({
                'opacity': '1'
            }, 100)
    })
}


export function UpdateGraphs(totalVotes, choiceOne, choiceTwo) {
    console.log('Graphs updated!')

    var heightChoiceTwo = Math.ceil(choiceTwo / totalVotes * 100)
    $('#choice_two_graph').animate({
        'height': `${heightChoiceTwo}%`
    }, 200);

    var heightChoiceOne = Math.ceil(choiceOne / totalVotes * 100)
    $('#choice_one_graph').animate({
        'height': `${heightChoiceOne}%`
    }, 200);


    if (choiceOne != 0)
        $('#choice_one_votes_amount').html(choiceOne)
    else
        $('#choice_one_votes_amount').html('')

    if (choiceTwo != 0)
        $('#choice_two_votes_amount').html(choiceTwo)
    else
        $('#choice_two_votes_amount').html('')

    GetCurrentScene((currentScene) => {
        if (allChoices[currentScene] == null) {
            console.log("This is the last video");

            $('#modal').html(``)
            $('#modal').append(`<h1 id="modal_title">Thank you for playing!</h1>`)
            $('#modal').append(`<h3 id="redirect_message" style="70%">You will be directed to the home page in ${redirectSeconds} seconds!</h3>`)
            setInterval(() => {
                if (redirectSeconds > 0) {
                    redirectSeconds--;
                    $('#modal').html(`<h3 id="redirect_message" style="70%">You will be directed to the home page in ${redirectSeconds} seconds!</h3>`)
                } else {
                    window.location.href = iasURL;
                }

            }, 1000);

            return;
        } else {
            $('#choice_one_subtitle').html(allChoices[currentScene].textC1)
            if (choiceOne != 0) {
                $('#choice_one_subtitle').css('font-size', `18pt`)
                $('#choice_one_subtitle').css('opacity', '1')
            }
            else {
                $('#choice_one_votes_amount').html('')
            }

            $('#choice_two_subtitle').html(allChoices[currentScene].textC2)
            if (choiceTwo != 0) {
                $('#choice_two_subtitle').css('font-size', `18pt`)
                $('#choice_two_subtitle').css('opacity', '1')
            }
            else {
                $('#choice_two_votes_amount').html('')
            }
        }
    });
}

export function ResetVotes(callback = null) {
    ResetProgressBar();

    lastVotesCount = 0;
    lastVoteOneCount = 0;
    lastVoteTwoCount = 0;
    plusOneAmount = 0;

    $('#choice_one_votes_amount').html('')
    $('#choice_two_votes_amount').html('   ')
    $('#winning_choice').css('opacity', '0')
    $('#choice_one_subtitle').css('opacity', '1')
    $('#choice_two_subtitle').css('opacity', '1')
    $('#choice_one_graph').animate({
        'height': `0%`
    }, 200)
    $('#choice_two_graph').animate({
        'height': `0%`
    }, 200, function () {
        if (callback != null) {
            callback();
        }
    })
}
