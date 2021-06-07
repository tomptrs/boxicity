export const url = 'http://127.0.0.1:3000'

export function CreateNewLobby(){
    $.getJSON(url + '/getnewlobby', function (lobbyData) {
        console.log(lobbyData.lobbyCode);

        const redirectURL = 'http://127.0.0.1:5500/voting.html?lobbyCode=' + lobbyData.lobbyCode;
        CreateNewQRCode(redirectURL)
        DisplayLobbyCode(lobbyData.lobbyCode);
    })

}

export function CreateNewQRCode(url){
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 264,
        height: 264,
        colorDark: "#2b2b2b",
        correctLevel: QRCode.CorrectLevel.H
    });
}

export function DisplayLobbyCode(lobbyCodeIn){
    document.getElementById('lobbyCode').innerHTML = lobbyCodeIn;
}

export function RedirectToLobby(lobbyCodeIn){
    if (lobbyCodeIn != ''){
        window.location.href = 'http://127.0.0.1:5500/player.html?lobbyCode=' + lobbyCodeIn;
    }
}

export function RedirectToVoting(){
    window.location.href = 'http://127.0.0.1:5500/voting.html?lobbyCode=' + GetParameterByName('lobbyCode');
}

export function GetParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function AddParticipantToLobby(lobbyCodeIn, username){
    $.getJSON(url + '/lobbies/' + lobbyCodeIn + '/addparticipant?username=' + username, function () {
    })
    RedirectToVoting();
}

export function StartTimer(length = 10){

}