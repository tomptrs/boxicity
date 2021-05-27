import {cards as stayHereCards} from "./services/stayhereService.js"
import {cards as reflectionCards} from "./services/reflectionService.js"
import {cards as informationCards} from "./services/informationService.js"
import {spots as boardgameSpots} from "./services/boargameSpotService.js"

import { Player } from "./classes/Player.js";
import { Pawn } from "./classes/Pawn.js";
import { Vector2 } from "./classes/Vector2.js";

import { Color } from "./services/colorService.js"





/*function gooi(){
    alert()
}*/

/*document.addEventListener("DOMContentLoaded",(event)=>{
   const cardMessage = document.querySelector("#myModal")
    
   //initialize card counters
    let stayHereCounter = 0
    let reflectionCounter = 0
    let informationCounter = 0
    
    //creation of playable objects   
    let pionnen = []
    const vakken = []
    CreateVakken()
    CreatePionnen()


    //Wat er gedaan moet worden na een dobbelsteen gooi
    /*if(btnGooi != "undefined"){
        btnGooi.addEventListener("click",(arg)=>{
            
            let aantal = Math.round(Math.random()*2)+1  //gooi dobbelsteen
            pionnen[aanBeurt].positie +=aantal
            pionnen[aanBeurt].x = vakken[pionnen[aanBeurt].positie].x
            pionnen[aanBeurt].y = vakken[pionnen[aanBeurt].positie].y
            console.log(pionnen[aanBeurt])
           
            
            context.clearRect(0,0,3500,3500)           
            context.drawImage(img, 50, 10);
            for(let i=0;i<pionnen.length;i++)
                pionnen[i].Draw(context)
            
            //Do action;
            const action =  vakken[pionnen[aanBeurt].positie].what
            console.log(pionnen[aanBeurt].positie)
            console.log(action)
            switch(action){
                case "s":                 
                 ShowCard(stayhere[stayHereCounter].info,stayhere[stayHereCounter].question)
                 stayHereCounter++
                 if(stayHereCounter >= stayhere.length)
                    stayHereCounter=0
                    break;
                case "r":
                    ShowCard(reflection[reflectionCounter].info,reflection[reflectionCounter].question)
                    reflectionCounter++
                    if(reflectionCounter >= reflection.length)
                        reflectionCounter=0
                
                    break;
                case "i":
                    ShowCard(information[informationCounter].info,information[informationCounter].question)
                    informationCounter++
                    informationCounter++
                    if(informationCounter >= information.length)
                        informationCounter=0
                    break;
                case "qr":
                    console.log("show AR code")
                    ShowARCode()
                    break;
                case "vr":
                    console.log("show vr code")
                    ShowVRCode()
                    break;

            }

            //volgende speler is aan beurt
            aanBeurt++
            if(aanBeurt >= pionnen.length)
                aanBeurt = 0
            
            //TOD: Toon een opdracht aan de speler

            
            infoSection.innerHTML = ("player " + (aanBeurt+1) + " is aan de beurt, staat nu op positie " + pionnen[aanBeurt].positie)
        })
        }


    let img = document.createElement("img");
    img.src = "board.png";
    img.addEventListener("load", () => {  
    context.drawImage(img, 50, 10);
    for(let i=0;i<pionnen.length;i++)
        pionnen[i].Draw(context)
        
});

function ShowCard(info, question){
    document.querySelector(".modal-title").innerHTML = info
    document.querySelector(".modal-body").innerHTML = question
    $('#myModal').modal('toggle')
}

function ShowVRCode(){
    
    document.querySelector(".modal-title").innerHTML = "Scan the code with your smartphone"
    document.querySelector(".modal-body").innerHTML = "<img src='images/ScanVRBoxicity.png' width='300' height='300'>"
    $('#myModal').modal('toggle')
}

function ShowARCode(){
    
    document.querySelector(".modal-title").innerHTML = "Scan the code with your smartphone"
    document.querySelector(".modal-body").innerHTML = "<img src='images/scanAR.png' width='300' height='300'>"
    $('#myModal').modal('toggle')
}
   

function CreateVakken(){
    vakken.push(new Vak(160,132, ""));//0
    vakken.push(new Vak(320,128,"r"));//1
    vakken.push(new Vak(475,130,"s"));//2
    vakken.push(new Vak(560,138,"qr"));//3
    vakken.push(new Vak(640,250,"i"));//4
    vakken.push(new Vak(630,365,"r"));//5
    vakken.push(new Vak(580,430,"vr"));//6
    vakken.push(new Vak(470,530,"s"));//7
    vakken.push(new Vak(355,530,"qr"));//8
    vakken.push(new Vak(255,530,"i"));//9
    vakken.push(new Vak(140,630,"r"));//10
    vakken.push(new Vak(140,730,"qr"));//11
    vakken.push(new Vak(145,850,"vr"));//12
    vakken.push(new Vak(175,960,"s"));//13
    vakken.push(new Vak(300,1050,"again"));//14
    vakken.push(new Vak(420,1050,"i"));//15
    vakken.push(new Vak(525,950,"qr"));//16
    vakken.push(new Vak(525,825,"i"));//17
    vakken.push(new Vak(575,720,"r"));//18
    vakken.push(new Vak(700,700,"r"));//19
    vakken.push(new Vak(800,710,"i"));//20
    vakken.push(new Vak(840,830,"qr"));//21
    vakken.push(new Vak(880,930,"s"));//22
    vakken.push(new Vak(905,1050,"i"));//23
    vakken.push(new Vak(1015,1100,"again"));//24
    vakken.push(new Vak(1120,1100,"r"));//25
    vakken.push(new Vak(1250,1075,"s"));//26
    vakken.push(new Vak(1330,1025,"qr"));//27
    vakken.push(new Vak(1365,900,"r"));//28
    vakken.push(new Vak(1340,775,"raar"));//29
    vakken.push(new Vak(1280,680,"i"));//30
    vakken.push(new Vak(1190,650,"r"));//31
    vakken.push(new Vak(1065,610,"qr"));//32
    vakken.push(new Vak(1000,500,"raar"));//33
    vakken.push(new Vak(990,405,"s"));//34
    vakken.push(new Vak(980,295,"raar"));//35
    vakken.push(new Vak(1040,180,"r"));//36
    vakken.push(new Vak(1130,160,"qr"));//37
    vakken.push(new Vak(1240,150,"s"));//38
    vakken.push(new Vak(1400,150,"finish"));//39

}

function CreatePionnen(){
    let pion1 = new Bal( vakken[0].x, vakken[0].y,20,1,"red");
    let pion2 = new Bal( vakken[0].x, vakken[0].y,20,1,"yellow");
    let pion3 = new Bal( vakken[0].x, vakken[0].y,20,1,"green");
    pionnen.push(pion1)
    pionnen.push(pion2)
    pionnen.push(pion3)
}

})*/

var playerAmount = 5;
var players = []
var currentPlayerTurn = 0;

/* Once DOM is loaded, start the boardgame */
document.addEventListener("DOMContentLoaded",(event)=>{
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

    //TODO ask for playercount and nicknames
    ToggleModal();

    //everything starts after this modal has been completed
    DisplayPlayerCountInputModal();
})


export function DrawBoardgame(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var img = document.createElement("img");
    img.src = "./board.png";

    img.addEventListener("load", () => {  
        context.clearRect(0,0,3500,3500)
        context.drawImage(img, 0, 0, 1370, 925);
                  
        for (var i=0; i < players.length; i++){
            players[i].pawn.Draw(context)
            context.font = "16px Arial";
            context.fillStyle = '#000000'
            context.fillText(i+1, players[i].pawn.location.x, players[i].pawn.location.y)
        }
    });


}

/* This returns the integer of the height of the document */
function GetDocumentHeight(){
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return Math.round(height);
}

/* This generates a new player status for the right side of the screen */
function GetNewStatusDiv(height, playerNo){
    return '<div class="player_status" id="player_status' + playerNo + '" style="height: ' + height + 'px;"></div>';
}


/* This displays and adjusts the height of the player statuses according to how many players are present */
function DisplayPlayerStatuses(playerAmount){
    var status_height = (GetDocumentHeight() - 50) / playerAmount;

    for (var i = 0; i < playerAmount; i++){
        $('.status_container').append(GetNewStatusDiv(status_height, i + 1));
        $('#player_status' + (i+1)).append(`<p>Player ${i+1}: ${players[i].nickname}</p>`)
        $('#player_status' + (i+1)).append(`<p id="player_spot_info${i+1}">Current Spot: ${boardgameSpots.indexOf(players[i].pawn.currentSpot) + 1} -> ${players[i].pawn.currentSpot.type}</p>`)
        if (i == currentPlayerTurn)
            $('#player_status' + (i+1)).append(`<button class="turn_button" id="turn_button${i+1}" onclick="StartTurn();">Start Turn</button>`)
        else
            $('#player_status' + (i+1)).append(`<button class="turn_button" id="turn_button${i+1}" disabled onclick="StartTurn();">Start Turn</button>`)
        
        var halfOpacityColor = `#${players[i].pawn.color.substring(1)}80`;
        document.getElementById(`player_status${i+1}`).style.backgroundColor = halfOpacityColor;
        UpdatePlayerStatuses();
    }
}

function UpdatePlayerStatuses(){
    for (let i = 0; i < players.length; i++) {
        try{
            document.getElementById(`player_spot_info${i+1}`).style.display = "none";    
            document.getElementById(`turn_button${i+1}`).style.display = "none";
        } catch (err){
            console.log('document doesnt exist');
        }
    }
    document.getElementById(`player_spot_info${currentPlayerTurn+1}`).style.display = "block";
    document.getElementById(`turn_button${currentPlayerTurn+1}`).style.display = "block";
    document.getElementById(`player_spot_info${currentPlayerTurn+1}`).innerHTML = `Current Spot: ${boardgameSpots.indexOf(players[currentPlayerTurn].pawn.currentSpot) + 1} -> ${players[currentPlayerTurn].pawn.currentSpot.type}`
}

export function ToggleModal(){
    $('#modal').modal('toggle');
}

function GetRandomFirstName(){
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
function GetNewNicknameInput(playerIndex){
    return `<label class="nickname_input_label" id="nickname_input_label${playerIndex}" for="nickname${playerIndex}">Nickname Player ${playerIndex}</label><br><input class="nickname_input" id="nickname_input${playerIndex}" type="text" value="${GetRandomFirstName()}" name="nickname${playerIndex}" value=""><br>`
}

function DisplayPlayerCountInputModal(){
    document.querySelector(".modal-title").innerHTML = `Please Enter The Player Count`;

    $('.modal-body').append('<input type="range" id="player_amount_input" value="5" min="5" max="8" onchange="SetPlayerAmount(this.value)">');
    $('.modal-body').append('<h2 id="player_amount_text"></h2>');
    $('.modal-body').append('<button id="next_button" onclick="DisplayNicknameInputModal();">Next</button>');

    SetPlayerAmount(playerAmount);
}


//TODO stop when at finish and stop giving this player turns
export function StartTurn(){
    var currentSpotLocation = boardgameSpots.indexOf(players[currentPlayerTurn].pawn.currentSpot) + 1;
    players[currentPlayerTurn].pawn.Move(boardgameSpots[currentSpotLocation + Math.floor(Math.random() * 6)]);
    UpdatePlayerStatuses();
    DrawBoardgame();
    if (currentPlayerTurn < players.length - 1){
        document.getElementById(`turn_button${currentPlayerTurn + 1}`).disabled = true;
        document.getElementById(`turn_button${currentPlayerTurn + 2}`).disabled = false;    
        currentPlayerTurn++;
    }
    else{
        document.getElementById(`turn_button${players.length}`).disabled = true;
        document.getElementById(`turn_button${1}`).disabled = false;    
        currentPlayerTurn = 0;
    }
    UpdatePlayerStatuses();
}

export function DisplayNicknameInputModal(){
    document.querySelector(".modal-title").innerHTML = `Please Enter Your Nicknames`;
    document.querySelector('.modal-body').innerHTML = '';

    for (var i = 0; i < playerAmount; i++){
        $('.modal-body').append(GetNewNicknameInput(i+1));
    }

    $('.modal-body').append('<button id="doneButton" onclick="AddPlayers(); ToggleModal(); DrawBoardgame(); DisplayPlayerStatuses(GetPlayerAmount());">Done</button>');
}

export function SetPlayerAmount(playerAmountIn){
    playerAmount = playerAmountIn;
    document.getElementById('player_amount_text').innerHTML = playerAmount;
}

export function GetPlayerAmount(){
    return playerAmount;
}

export function AddPlayers(){
    const color = new Color();

    for (var i=0;  i < playerAmount; i++){
        var nickname = document.getElementById(`nickname_input${i+1}`).value

        players.push(new Player(nickname, new Pawn(boardgameSpots[0].location, boardgameSpots[0], "", color.GetColor(i))));
    }

    players.forEach(p => {
        //console.log('before move', p.pawn.location);
        p.pawn.Move(boardgameSpots[0]);
        //console.log('after move', p.pawn.location);
    });
}

