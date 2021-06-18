export var url = 'https://boxicity-website.herokuapp.com'
export var iasURL = 'https://boxicity-website.herokuapp.com/ias/en'

var lastParticipantAmount = 0;

export function CreateNewLobby() {
    $.getJSON(url + '/getnewlobby', function (lobbyData) {
        const redirectURL = iasURL + '/voting.html?lobbyCode=' + lobbyData.lobbyCode;
        CreateNewQRCode(redirectURL)
        DisplayLobbyCode(lobbyData.lobbyCode);
        
        $('#qrcode_title').animate({'opacity': '0'}, 200, function(){
            $('#qrcode_title').html('Scan the QR code!')
            $('#qrcode_title').animate({'opacity': '1'}, 200)
        })

        $('.arrow').animate({'opacity': '1'}, 200);
        $('#qrcode').animate({
            'opacity': '1'
        }, 200)
        $('#lobbyCode').animate({
            'opacity': '1'
        }, 200)
        $('#participants_amount').animate({
            'opacity': '1'
        }, 200)  

        console.log('animated')

        setInterval(function () {
            console.log(lobbyData.lobbyCode); UpdateParticipantsAmount(lobbyData.lobbyCode, function (participants) {
                $('#participants_amount').html('Participants: ' + participants)
                console.log('last amount', lastParticipantAmount, 'new amount', participants)
                if (participants > lastParticipantAmount) {
                    $('#participants_amount').animate({
                        fontSize: '2.5em'
                    }, 50, function(){
                        $('#participants_amount').animate({
                            fontSize: '2em'
                        }, 100)
                    })
                    lastParticipantAmount = participants;
                }
            });
        }, 200);
    })

}

export function UpdateParticipantsAmount(lobbyCode, callback = null) {
    $.getJSON(url + '/lobbies/' + lobbyCode, function (result) {
        console.log(result.participants);
        callback(result.participants);
    })
}

export function CreateNewQRCode(url) {
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 264,
        height: 264,
        colorDark: "#2b2b2b",
        correctLevel: QRCode.CorrectLevel.H
    });
}

export function DisplayLobbyCode(lobbyCodeIn) {
    document.getElementById('lobbyCode').innerHTML = lobbyCodeIn;
}

export function RedirectToLobby(lobbyCodeIn) {
    if (lobbyCodeIn != '') {
        window.location.href = iasURL + '/player.html?lobbyCode=' + lobbyCodeIn;
    }
}

export function RedirectToVoting() {
    window.location.href = iasURL + '/voting.html?lobbyCode=' + GetParameterByName('lobbyCode');
}

export function GetParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function AddParticipantToLobby(lobbyCodeIn) {
    $.getJSON(url + '/lobbies/' + lobbyCodeIn + '/addparticipant', function () {
    })
}

export function StartTimer(length = 10) {

}