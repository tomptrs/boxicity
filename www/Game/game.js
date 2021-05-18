/*import {cards as stayhere} from "./services/stayhereService.js"
import {cards as reflection} from "./services/reflectionService.js"
import {cards as information} from "./services/informationService.js"*/

import { Player } from "./classes/Player.js";





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
    img.src = "board.jpg";
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

export var playerAmount = 5;
var players = []

/* Once DOM is loaded, start the boardgame */
document.addEventListener("DOMContentLoaded",(event)=>{
    //TODO load functions
    window.DisplayNicknameInputModal = DisplayNicknameInputModal;
    window.SetPlayerAmount = SetPlayerAmount;
    window.AddPlayers = AddPlayers;

    //TODO ask for playercount and nicknames
    DisplayPlayerCountInputModal();

    //TODO display pawns and statuses
    DisplayPlayerStatuses(playerAmount);
})



/* This returns the integer of the height of the document */
function GetDocumentHeight(){
    var body = document.body;
    var html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    return Math.round(height);
}

/* This generates a new player status for the right side of the screen */
function GetNewStatusDiv(height){
    return '<div class="player_status" style="height: ' + height + 'px;"></div>';
}


/* This displays and adjusts the height of the player statuses according to how many players are present */
function DisplayPlayerStatuses(playerAmount){
    var status_height = (GetDocumentHeight() - 50) / playerAmount;

    for (var i = 0; i < playerAmount; i++){
        $('.status_container').append(GetNewStatusDiv(status_height));
    }
}

function GetNewNicknameInput(playerIndex){
    return `<label for="nickname${playerIndex}">Nickname Player ${playerIndex}</label><br><input type="text" id="nickname${playerIndex}" name="nickname${playerIndex}" value=""><br>`
}

function DisplayPlayerCountInputModal(){
    $('#modal').modal('toggle');
    document.querySelector(".modal-title").innerHTML = `Please Enter The Player Count`;

    $('.modal-body').append('<input type="range" id="playerAmountInput" value="5" min="5" max="8" onchange="SetPlayerAmount(this.value)">');
    $('.modal-body').append('<h2 id="playerAmountText"></h2>');
    $('.modal-body').append('<button id="nextButton" onclick="DisplayNicknameInputModal();">Next</button>');

    SetPlayerAmount(playerAmount);
}

export function DisplayNicknameInputModal(){
    document.querySelector(".modal-title").innerHTML = `Please Enter Your Nicknames`;
    document.querySelector('.modal-body').innerHTML = '';

    for (var i = 0; i < playerAmount; i++){
        $('.modal-body').append(GetNewNicknameInput(i+1));
    }

    $('.modal-body').append('<button id="doneButton" onclick="AddPlayers();">Done</button>');
}

export function SetPlayerAmount(playerAmountIn){
    playerAmount = playerAmountIn;
    document.getElementById('playerAmountText').innerHTML = playerAmount;
}

export function AddPlayers(){
    for (var i=0;  i < playerAmount; i++){
        var nickname = document.getElementById(`nickname${i+1}`).value
        players.push(new Player(nickname, ""));
    }
    console.log(players);
}

