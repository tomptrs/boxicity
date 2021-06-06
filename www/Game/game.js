import { cardsFR as questionCards } from "./services/questionService.js"
import { cardsFR as reflectionCards } from "./services/reflectionService.js"
import { cardsFR as informationCards } from "./services/informationService.js"
import { spots as boardgameSpots } from "./services/boargameSpotService.js"

import { Player } from "./classes/Player.js";
import { Pawn } from "./classes/Pawn.js";
import { Vector2 } from "./classes/Vector2.js";

import { Color } from "./services/colorService.js"


$(window).resize(function () {
    $(`.boardgame_container`).height(window.innerHeight);
    for (let i = 0; i < players.length; i++) {
        $(`#player_status${i+1}`).height(window.innerHeight/players.length - 25);
    }
});

let theWheel = new Winwheel({
    'numSegments': 5,
    'outerRadius': 212,
    'textFontSize': 28,
    'segments':
        [
            { 'fillStyle': '#8fabda', 'text': '1' },
            { 'fillStyle': '#fbb919', 'text': '2' },
            { 'fillStyle': '#69c2c0', 'text': '3' },
            { 'fillStyle': '#e9570d', 'text': '4' },
            { 'fillStyle': '#f1d6e5', 'text': '5' }
        ],
    'animation':
    {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8,
        'callbackFinished': alertPrize
    }
});

let wheelPower = 0;
let wheelSpinning = false;


export function powerSelected(powerLevel) {
    if (wheelSpinning == false) {
        document.getElementById('pw1').className = "";
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";

        if (powerLevel >= 1) {
            document.getElementById('pw1').className = "pw1";
        }

        if (powerLevel >= 2) {
            document.getElementById('pw2').className = "pw2";
        }

        if (powerLevel >= 3) {
            document.getElementById('pw3').className = "pw3";
        }

        wheelPower = powerLevel;

        document.getElementById('spin_button').src = "spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

export function startSpin() {
    if (wheelSpinning == false) {
        if (wheelPower == 1) {
            theWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            theWheel.animation.spins = 8;
        } else if (wheelPower == 3) {
            theWheel.animation.spins = 15;
        }

        theWheel.startAnimation();
        wheelSpinning = true;
    }
}

export function resetWheel() {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();

    wheelSpinning = false;
}


export function alertPrize(indicatedSegment) {
    var currentSpotLocation = boardgameSpots.indexOf(players[currentPlayerTurn].pawn.currentSpot) + 1;
    var newSpotLocation = currentSpotLocation + parseInt(indicatedSegment.text);
    if (newSpotLocation >= boardgameSpots.length) {
        players[currentPlayerTurn].pawn.reachedFinish = true;
        players[currentPlayerTurn].pawn.Move(boardgameSpots[boardgameSpots.length - 1]);
    } else {
        players[currentPlayerTurn].pawn.Move(boardgameSpots[newSpotLocation - 1]);
    }

    resetWheel();
    UpdatePlayerStatuses();
    DrawBoardgame();
    ToggleWheelModal();
    DisplaySpot();
}


var playerAmount = 5;
var players = []
var currentPlayerTurn = 0;

/* Once DOM is loaded, start the boardgame */
document.addEventListener("DOMContentLoaded", (event) => {
    //const Color = new Color();
    //TODO load functions
    window.DisplayNicknameInputModal = DisplayNicknameInputModal;
    window.SetPlayerAmount = SetPlayerAmount;
    window.AddPlayers = AddPlayers;
    window.ToggleModal = ToggleModal;
    window.DisplayPlayerStatuses = DisplayPlayerStatuses;
    window.GetPlayerAmount = GetPlayerAmount;
    window.DrawBoardgame = DrawBoardgame;
    window.StartTurn = StartTurn;
    window.EndTurn = EndTurn;
    window.startSpin = startSpin;
    window.powerSelected = powerSelected;
    window.resetWheel = resetWheel;
    window.alertPrize = alertPrize;
    window.OpenInteractiveStory = OpenInteractiveStory;

    //TODO ask for playercount and nicknames
    ToggleModal();

    //everything starts after this modal has been completed
    DisplayPlayerCountInputModal();
})


export function DrawBoardgame() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var img = document.createElement("img");
    img.src = "./board.png";

    img.addEventListener("load", () => {
        context.clearRect(0, 0, 3500, 3500)
        context.drawImage(img, 0, 0, 1370, 925);

        for (var i = 0; i < players.length; i++) {
            players[i].pawn.Draw(context)
            context.font = "16px Arial";
            context.fillStyle = '#000000'
            context.fillText(i + 1, players[i].pawn.location.x, players[i].pawn.location.y)
        }
    });


}

/* This returns the integer of the height of the document */
function GetDocumentHeight() {
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    console.log(Math.round(height));
    var h = window.innerHeight;
    return Math.round(h);
}

/* This generates a new player status for the right side of the screen */
function GetNewStatusDiv(height, playerNo) {
    return '<div class="player_status" id="player_status' + playerNo + '" style="height: ' + height + 'px;"></div>';
}


/* This displays and adjusts the height of the player statuses according to how many players are present */
function DisplayPlayerStatuses(playerAmount) {
    var status_height = (GetDocumentHeight() - 50) / playerAmount;

    for (var i = 0; i < playerAmount; i++) {
        $('.status_container').append(GetNewStatusDiv(status_height, i + 1));
        $('#player_status' + (i + 1)).append(`<p>Player ${i + 1}: ${players[i].nickname}</p>`)
        $('#player_status' + (i + 1)).append(`<p id="player_spot_info${i + 1}">Current Spot: ${boardgameSpots.indexOf(players[i].pawn.currentSpot) + 1} -> ${players[i].pawn.currentSpot.type}</p>`)
        if (i == currentPlayerTurn)
            $('#player_status' + (i + 1)).append(`<button class="turn_button" id="turn_button${i + 1}" onclick="StartTurn();">Start Turn</button>`)
        else
            $('#player_status' + (i + 1)).append(`<button class="turn_button" id="turn_button${i + 1}" disabled onclick="StartTurn();">Start Turn</button>`)

        var halfOpacityColor = `#${players[i].pawn.color.substring(1)}80`;
        document.getElementById(`player_status${i + 1}`).style.backgroundColor = halfOpacityColor;
        UpdatePlayerStatuses();
    }
}

function UpdatePlayerStatuses() {
    for (let i = 0; i < players.length; i++) {
        try {
            document.getElementById(`player_spot_info${i + 1}`).style.display = "none";
            document.getElementById(`turn_button${i + 1}`).style.display = "none";
        } catch (err) {
            console.log('document doesnt exist');
        }
    }
    document.getElementById(`player_spot_info${currentPlayerTurn + 1}`).style.display = "block";
    document.getElementById(`turn_button${currentPlayerTurn + 1}`).style.display = "block";
    document.getElementById(`player_spot_info${currentPlayerTurn + 1}`).innerHTML = `Current Spot: ${boardgameSpots.indexOf(players[currentPlayerTurn].pawn.currentSpot) + 1} -> ${players[currentPlayerTurn].pawn.currentSpot.type}`
}

export function ToggleModal() {
    $('#modal').modal('toggle');
}

function GetRandomFirstName() {
    var firstNames = [];
    firstNames.push('Liam');
    firstNames.push('Olivia');
    firstNames.push('Noah');
    firstNames.push('Emma');
    firstNames.push('Oliver');
    firstNames.push('Ava');
    firstNames.push('Elijah');
    firstNames.push('Charlotte');
    firstNames.push('William');
    firstNames.push('Sophia');
    firstNames.push('James');
    firstNames.push('Amelia');
    firstNames.push('Benjamin');
    firstNames.push('Isabella');
    firstNames.push('Lucas');
    firstNames.push('Mia');
    firstNames.push('Henry');
    firstNames.push('Evelyn');
    firstNames.push('Alexander');
    firstNames.push('Harper');

    var randy = Math.floor(Math.random() * firstNames.length);

    return firstNames[randy];
}

//TODO remove random value of input before launching
function GetNewNicknameInput(playerIndex) {
    return `<label class="nickname_input_label" id="nickname_input_label${playerIndex}" for="nickname${playerIndex}">Nickname Player ${playerIndex}</label><br><input class="nickname_input" id="nickname_input${playerIndex}" type="text" value="${GetRandomFirstName()}" name="nickname${playerIndex}" value=""><br>`
}

function DisplayPlayerCountInputModal() {
    document.querySelector("#modal-title").innerHTML = `Please Enter The Player Count`;

    $('#modal-body').append('<input type="range" id="player_amount_input" value="5" min="5" max="8" onchange="SetPlayerAmount(this.value)">');
    $('#modal-body').append('<h2 id="player_amount_text"></h2>');
    $('#modal-body').append('<button id="next_button" onclick="DisplayNicknameInputModal();">Next</button>');

    SetPlayerAmount(playerAmount);
}


function DisplayCard() {
    var cards = [];

    switch (players[currentPlayerTurn].pawn.currentSpot.type) {
        case 'reflection':
            cards = reflectionCards;
            break;
        case 'information':
            cards = informationCards;
            break;
        case 'question':
            cards = questionCards;
            break;
        default:
            break;
    }
    let nr = Math.round(Math.random() * (cards.length - 1))
    document.querySelector("#modal-title").innerHTML = cards[nr].question
    document.querySelector("#modal-body").innerHTML = cards[nr].answer
    ToggleModal();
}

function DisplaySpot() {
    var functions = 'EndTurn();';

    switch (players[currentPlayerTurn].pawn.currentSpot.type) {
        case 'reflection':
            DisplayCard();
            break;
        case 'information':
            DisplayCard();
            break;
        case 'question':
            DisplayCard();
            break;
        case 'vr':
            DisplayVR();
        case 'dice':
            DisplaySpotModal("Wow!", "You have landed on a 'dice' spot, you get another turn!");
            functions = '';
            break;
        case 'back':
            DisplaySpotModal("Oh no!", "You have landed on a 'go back' spot, you went two spaces back!");
            functions += 'MovePlayerBack();'
            break;
        case 'minigame':
            DisplaySpotModal("Temporary!", "This is where the minigame link will come!");
            break;
        case 'interactive story':
            DisplaySpotModal("Interactive Story!", `Click the following link to navigate to the interactive story minigame! <button onclick="OpenInteractiveStory();">Click Here!</button>`);
            break;
        case 'finish':
            DisplaySpotModal("Congratulations!", "You have reached the finish!");
            break;
        default:
            break;
    }

    document.querySelector("#modal-footer").innerHTML = `<button onclick="${functions}">Done</button>`
}

export function OpenInteractiveStory(){
    window.open(`localhost:3001/InteractiveStory/index.html`)
}

function DisplaySpotModal(title, body){
    document.querySelector("#modal-title").innerHTML = title
    document.querySelector("#modal-body").innerHTML = body
    ToggleModal();
}

function DisplayVR() {
    document.querySelector("#modal-title").innerHTML = "Scan the code with your smartphone"
    document.querySelector("#modal-body").innerHTML = "<img src='images/ScanVRBoxicity.png' width='300' height='300'>"
    ToggleModal();
}

function DisplayAR() {

    document.querySelector("#modal-title").innerHTML = "Scan the code with your smartphone"
    document.querySelector("#modal-body").innerHTML = "<img src='images/scanAR.png' width='300' height='300'>"
    ToggleModal();
}



export function StartTurn() {
    ToggleWheelModal();
}

export function EndTurn() {

    var playersFinished = 0;
    players.forEach(p => {
        if (p.pawn.reachedFinish)
            playersFinished++;
    });

    if(playersFinished == players.length)
        EndGame();


    if (currentPlayerTurn < players.length - 1) {
        document.getElementById(`turn_button${currentPlayerTurn + 1}`).disabled = true;
        document.getElementById(`turn_button${currentPlayerTurn + 2}`).disabled = false;
        currentPlayerTurn++;
        while (players[currentPlayerTurn].pawn.reachedFinish) {
            document.getElementById(`turn_button${currentPlayerTurn + 1}`).disabled = true;
            document.getElementById(`turn_button${currentPlayerTurn + 2}`).disabled = false;    
            currentPlayerTurn++;
        }
    }
    else {
        document.getElementById(`turn_button${players.length}`).disabled = true;
        document.getElementById(`turn_button${1}`).disabled = false;
        currentPlayerTurn = 0;
        if (players[currentPlayerTurn].pawn.reachedFinish) {
            currentPlayerTurn++;
            while (players[currentPlayerTurn].pawn.reachedFinish) {
                document.getElementById(`turn_button${currentPlayerTurn + 1}`).disabled = true;
                document.getElementById(`turn_button${currentPlayerTurn + 2}`).disabled = false;                
                currentPlayerTurn++;
            }
        }
    }
    UpdatePlayerStatuses();


    ToggleModal();
}

function EndGame(){
    alert(`Amazing! Everyone has reached the finish! The game will now close.`);
    window.location.href = 'http://localhost:3001/index.html'
}

function ToggleWheelModal() {
    $('#wheelModal').modal('toggle');
}

export function DisplayNicknameInputModal() {
    document.querySelector("#modal-title").innerHTML = `Please Enter Your Nicknames`;
    document.querySelector('#modal-body').innerHTML = '';

    for (var i = 0; i < playerAmount; i++) {
        $('#modal-body').append(GetNewNicknameInput(i + 1));
    }

    $('#modal-body').append('<button id="doneButton" onclick="AddPlayers(); ToggleModal(); DrawBoardgame(); DisplayPlayerStatuses(GetPlayerAmount());">Done</button>');
}

export function SetPlayerAmount(playerAmountIn) {
    playerAmount = playerAmountIn;
    document.getElementById('player_amount_text').innerHTML = playerAmount;
}

export function GetPlayerAmount() {
    return playerAmount;
}

export function AddPlayers() {
    const color = new Color();

    for (var i = 0; i < playerAmount; i++) {
        var nickname = document.getElementById(`nickname_input${i + 1}`).value

        players.push(new Player(nickname, new Pawn(boardgameSpots[0].location, boardgameSpots[0], "", color.GetColor(i))));
    }

    players.forEach(p => {
        //console.log('before move', p.pawn.location);
        p.pawn.Move(boardgameSpots[0]);
        //console.log('after move', p.pawn.location);
    });
}

