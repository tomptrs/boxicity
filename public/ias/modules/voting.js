import { allChoices } from '../services/ChoicesService.js';
import { GetParameterByName, url } from './lobbyController.js'
import { GetCurrentScene } from './videoController.js';

export var choices;
export let voted = false;
export var lastVotingAllowed = false;

var modalCanDissappear = true;

export function ChangeVoted(value) {
    voted = value;
}

export function VoteForChoice(choice) {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/vote?choice=' + choice, function (result) {
        console.log(result);
    })
    voted = true;
}

export function CountVotes(callback = null) {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode'), function (lobbyData) {
        if (lobbyData.choiceOne > lobbyData.choiceTwo) {
            callback(0, lobbyData.choiceOne, lobbyData.choiceTwo)
        } else if (lobbyData.choiceOne < lobbyData.choiceTwo) {
            callback(1, lobbyData.choiceOne, lobbyData.choiceTwo);
        } else {
            callback(-1, lobbyData.choiceOne, lobbyData.choiceTwo);
        }
    })
}

export function ClearVotes() {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/clearvotes', function (result) {
        console.log(result);
    })
}

/*export function RetrieveChoices(callback = null){
    $.getJSON(url + '/choices', function (result) {
        choices = result.choices;
        console.log(choices)
        callback();
    })
}*/

export function SetChoices() {
    GetCurrentScene((currentScene) =>{      
        if (allChoices[currentScene] == null){
            $('#waiting_overlay_title').html(`That were all the questions, thanks for playing!`)
            modalCanDissappear = false;
        } else{
            var choiceOneBtn = document.getElementById('choice_one_button');
            var choiceTwobtn = document.getElementById('choice_two_button');
        
            if (choiceOneBtn.innerHTML != allChoices[currentScene].textC1){
                voted = false;
            }
    
            $('#question').html(allChoices[currentScene].question)
    
            choiceOneBtn.innerHTML = allChoices[currentScene].textC1;
            choiceTwobtn.innerHTML = allChoices[currentScene].textC2;
        }
    })
}

export function SetVotingButtonsDisabled(disabled) {
}

export function GetVotingAllowed(callback = null) {
    if (!voted) {
        $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode'), function (result) {
            console.log(result.votingAllowed);
            if (result.votingAllowed != lastVotingAllowed) {
                lastVotingAllowed = result.votingAllowed;
                $('#waiting_overlay_title').html(`Waiting for the video to end<p id="dots"></p>`)
                if (result.votingAllowed){
                    ToggleWaitingOverlay();
                }
            }
            callback(result.votingAllowed);
        })
    }
}

export function ToggleWaitingOverlay() {
    if (modalCanDissappear){
        $('#waiting_overlay').toggleClass('hidden');
        $('#waiting_overlay').toggleClass('revealed');
    }
}

var dotsAmount = 0;

export function AnimateOverlayTitle() {
    var dots = '.';
    for (let i = 0; i < dotsAmount; i++) {
        dots += '.'
    }

    $('#dots').html(`${dots}`)

    if (dotsAmount < 3)
        dotsAmount++;
    else
        dotsAmount = 0;
}

$('#waiting_overlay_tutorial_container').on('click', (event) => {
    $('#waiting_overlay_tutorial_container').css({
        'transition': 'all 1s ease-out',
        'transform': 'translateY(100%)'
    }); 

    setTimeout(() => {
        $('#waiting_overlay_tutorial_container').remove();
        $('#waiting_overlay_title').animate({
            'opacity': '1'
        }, 500)
    }, 1000);
})

$('#choice_one_button_container').on('click', (event) =>{
    VoteForChoice(1)
    $('#choice_two_button_container').css(
        'background-color', 'grey'
    )
    $('#waiting_overlay_title').html(`You have voted! Waiting for everyone to vote<p id="dots"></p>`)
    setTimeout(() => {
        ToggleWaitingOverlay();
        setTimeout(() => {
            $('#choice_one_button_container').css('background-color', '#8fabda')
            $('#choice_two_button_container').css('background-color', '#8fc866')
        }, 1000);
    }, 500);
})

$('#choice_two_button_container').on('click', (event) =>{
    VoteForChoice(2)
    $('#choice_one_button_container').css(
        'background-color', 'grey'
    )
    $('#waiting_overlay_title').html(`You have voted! Waiting for everyone to vote<p id="dots"></p>`)
    setTimeout(() => {
        ToggleWaitingOverlay();
        setTimeout(() => {
            $('#choice_one_button_container').css('background-color', '#8fabda')
            $('#choice_two_button_container').css('background-color', '#8fc866')
        }, 1000);
    }, 500);
})

window.AnimateOverlayTitle = AnimateOverlayTitle
window.ToggleWaitingOverlay = ToggleWaitingOverlay