import { allChoices } from '../services/ChoicesService.js';
import { GetParameterByName, url } from './lobbyController.js'
import { GetCurrentScene } from './videoController.js';

export var choices;
export let voted = false;

export function ChangeVoted(value){
    voted = value;
}

export function VoteForChoice(choice) {
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode') + '/vote?choice=' + choice, function (result) {
        console.log(result);
    })
    voted = true;
}

export function CountVotes(callback = null){
    $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode'), function (lobbyData) {
        if (lobbyData.choiceOne > lobbyData.choiceTwo){
            callback(0, lobbyData.choiceOne, lobbyData.choiceTwo)
        } else if (lobbyData.choiceOne < lobbyData.choiceTwo){
            callback(1, lobbyData.choiceOne, lobbyData.choiceTwo);
        } else{
            callback(-1, lobbyData.choiceOne, lobbyData.choiceTwo);
        }
    })
}

export function ClearVotes(){
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

export function SetChoices(){
    /*RetrieveChoices(() => {
        var choiceOneBtn = document.getElementById('choiceOneBtn');
        var choiceTwobtn = document.getElementById('choiceTwoBtn');
    
        choiceOneBtn.innerHTML = choices[2 * sceneNumber];
        choiceTwobtn.innerHTML = choices[(2 * sceneNumber) + 1];
    });*/
    GetCurrentScene((currentScene) =>{        
        var choiceOneBtn = document.getElementById('choiceOneBtn');
        var choiceTwobtn = document.getElementById('choiceTwoBtn');
    
        if (choiceOneBtn.innerHTML != allChoices[currentScene].textC1){
            voted = false;
        }

        choiceOneBtn.innerHTML = allChoices[currentScene].textC1;
        choiceTwobtn.innerHTML = allChoices[currentScene].textC2;
    })
}

export function SetVotingButtonsDisabled(disabled){
    var choiceOneBtn = document.getElementById('choiceOneBtn');
    var choiceTwobtn = document.getElementById('choiceTwoBtn');

    choiceOneBtn.disabled = disabled;
    choiceTwobtn.disabled = disabled;
 
}

export function GetVotingAllowed(callback = null) {
    if (!voted){
        $.getJSON(url + '/lobbies/' + GetParameterByName('lobbyCode'), function (result) {
            console.log(result.votingAllowed);
            callback(result.votingAllowed);
        })
    }
}