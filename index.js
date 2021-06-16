/* Website */
const express = require('express')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;




app.use(express.static('public', {
  extensions: ['html']
}))

app.get('/', (req, res) => {
  res.redirect('/nl/index')
})





/* Firebase API */

const fs = require('firebase-admin');
const serviceAccount = require('./firestore_key.json')
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});
const db = fs.firestore();
var _ = require('lodash');

var allLobbies = [];

app.get('/lobbies', function (req, res) {
    RetrieveAllLobbies((lobbiesData) => {
        res.send(lobbiesData)
    })
})

app.get('/lobbies/:lobbyCode', function (req, res) {
    /*RetrieveLobbyDataByLobbyCode(req.params.lobbyCode, (lobbyData) => {
        res.send(lobbyData);
    })*/

    RetrieveLocalLobbyDataByLobbyCode(req.params.lobbyCode, (lobbyData) => {
        date = new Date();
        time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        //console.log(`Lobby ${req.params.lobbyCode} was read at ${time}`)
        res.send(lobbyData);
    });
})

app.get('/lobbies/:lobbyCode/vote', function (req, res) {
    if (req.query.choice != null) {
        VoteForChoice(req.params.lobbyCode, req.query.choice);
        res.send(JSON.parse('{ "result":"You voted for choice ' + req.query.choice + '!"}'))
    } else {
        res.send(JSON.parse('{ "result":"Please provide a query!" }'))
    }
})

app.get('/lobbies/:lobbyCode/clearvotes', function (req, res) {
    ClearVotes(req.params.lobbyCode);
    res.send(JSON.parse('{ "result":"The votes have been cleared" }'))
})

app.get('/lobbies/:lobbyCode/videoplaying', function (req, res) {
    if (req.query.playing != null) {
        SetVideoPlaying(req.params.lobbyCode, req.query.playing);
        res.send(JSON.parse('{ "result":"VideoPlaying has been set to ' + req.query.playing + '!"}'))
    } else {
        res.send(JSON.parse('{ "result":"Please provide a query!" }'))
    }
})

app.get('/lobbies/:lobbyCode/videoended', function (req, res) {
    if (req.query.ended != null) {
        SetVideoEnded(req.params.lobbyCode, req.query.ended);
        res.send(JSON.parse('{ "result":"videoEnded has been set to ' + req.query.ended + '!"}'))
    } else {
        res.send(JSON.parse('{ "result":"Please provide a query!" }'))
    }
})

app.get('/lobbies/:lobbyCode/votingallowed', function (req, res) {
    if (req.query.allowed != null) {
        SetVotingAllowed(req.params.lobbyCode, req.query.allowed);
        res.send(JSON.parse('{ "result":"votingAllowed has been set to ' + req.query.allowed + '!"}'))
    } else {
        res.send(JSON.parse('{ "result":"Please provide a query!" }'))
    }
})

app.get('/lobbies/:lobbyCode/addparticipant', function (req, res) {
    if (req.query.username != null) {
        AddParticipant(req.params.lobbyCode, req.query.username, (result) => {
            res.send(result);
        });
    }
})

app.get('/lobbies/:lobbyCode/incrementcurrentscene', function (req, res) {
    IncrementCurrentScene(req.params.lobbyCode, (result) => {
        res.send(result)
    });
})

app.get('/lobbies/:lobbyCode/reset', function (req, res) {
    ResetLobby(req.params.lobbyCode, (result) => {
        res.send(result)
    });
})

app.get('/getnewlobby', function (req, res) {
    CreateNewLobby((result) => {
        res.send(result);
    })
})

app.get('/choices', function (req, res) {
    RetrieveChoices((choicesData) => {
        res.send(choicesData);
    })
})

app.listen(port, () => {
    console.log(`Firestore API listening on port 3000!`)
    RetrieveAllLobbies((lobbiesData) => {
        allLobbies = lobbiesData;
        UpdateLobbiesOnChange();
    })
});

async function RetrieveLobbyDataByID(lobbyID, callback = null) {
    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    const lobbyDoc = await lobbyRef.get();

    if (lobbyDoc.exists) {
        callback(lobbyDoc.data());
    } else {
        return JSON.parse('{ "result":"No such document found!" }')
    }
}

async function RetrieveAllLobbies(callback = null) {
    const lobbiesRef = db.collection('Lobbies');
    const lobbiesCol = await lobbiesRef.get();

    if (lobbiesCol != null) {
        var lobbies = [];
        lobbiesCol.forEach(lobby => {
            lobbies.push(lobby.data());
        });
        callback(lobbies)
    } else {
        return JSON.parse('{ "result":"No lobbies are currently active!" }')
    }
}

async function UpdateLobbiesOnChange(callback = null) {
    const lobbiesCol = db.collection('Lobbies');

    const observer = lobbiesCol.onSnapshot(snapshot => {
        snapshot.forEach(doc => {
            allLobbies.forEach(lobby => {
                if (lobby.lobbyCode == doc.data().lobbyCode){
                    if (_.isEqual(lobby, doc.data())){
                        //console.log(`Lobby ${lobby.lobbyCode} had no changes`);
                    } else  {
                        //console.log(`Lobby ${lobby.lobbyCode} was changed`);
                        console.log(`Lobby ${lobby.lobbyCode} was updated`);

                        index = allLobbies.indexOf(lobby);
                        allLobbies[index] = doc.data();
                    }
                }
            });
        });
    }, err => {
        console.log(`Encountered error: ${err}`);
    })
}

async function RetrieveLobbyDataByLobbyCode(lobbyCode, callback = null) {
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    if (lobbyCodeQueryRes.empty) {
        console.log('No matching documents :(')
        return;
    }

    lobbyCodeQueryRes.forEach(element => {
        callback(element.data())
    });
}

function RetrieveLocalLobbyDataByLobbyCode(lobbyCode, callback = null){
    allLobbies.forEach(lobby => {
        if (lobby.lobbyCode == lobbyCode){
            callback(lobby);
        }
    });
}

async function CreateNewLobby(callback = null) {
    const newLobbyCode = GetNewLobbyCode();

    const newLobbyRef = await db.collection('Lobbies').add({
        choiceOne: 0,
        choiceTwo: 0,
        lobbyCode: newLobbyCode,
        videoEnded: false,
        videoPlaying: false,
        votingAllowed: false,
        currentScene: 0
    })

    const newLobby = await newLobbyRef.get();
    allLobbies.push(newLobby.data())
    console.log(`New lobby created with code ${newLobby.data().lobbyCode}`)

    callback(newLobby.data())
}

function GetNewLobbyCode(length = 5) {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    return result;
}

async function AddParticipant(lobbyCode, usernameIn, callback = null) {

    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    lobbyCodeQueryRes.forEach(doc => {
        const NewParticipant = db.collection('Lobbies').doc(doc.id).collection('participants').add({
            username: usernameIn
        })
        callback('{ "result":"New user ' + usernameIn + ' added as participant"');
    })
}

async function RetrieveChoices(callback = null) {
    const choicesRef = db.collection('Questions').doc('interactiveStory_1');
    const choicesDoc = await choicesRef.get();

    if (choicesDoc.exists) {
        callback(choicesDoc.data());
    } else {
        return JSON.parse('{ "result":"No such document found!" }')
    }

}

async function VoteForChoice(lobbyCode, choice, callback = null) {
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    var lobbyID;
    lobbyCodeQueryRes.forEach(doc => {
        lobbyID = doc.id;
    })

    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    if (choice == 1) {
        lobbyRef.update({
            choiceOne: fs.firestore.FieldValue.increment(1)
        })
    } else if (choice == 2) {
        lobbyRef.update({
            choiceTwo: fs.firestore.FieldValue.increment(1)
        })
    } else {
        console.log(choice, "is not a valid option!")
    }
}

async function IncrementCurrentScene(lobbyCode, callback = null){
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    var lobbyID;
    lobbyCodeQueryRes.forEach(doc => {
        lobbyID = doc.id;
    })

    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    await lobbyRef.update({
        currentScene: fs.firestore.FieldValue.increment(1)
    })
    callback(`CurrentScene was successfuly incremented.`)
    
}

async function ResetLobby(lobbyCode, callback = null){
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    var lobbyID;
    lobbyCodeQueryRes.forEach(doc => {
        lobbyID = doc.id;
    })

    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    await lobbyRef.update({
        choiceOne: 0,
        choiceTwo: 0,
        videoEnded: false,
        videoPlaying: false,
        votingAllowed: false
    })

    console.log(`Lobby ${lobbyCode} was reset`)
    callback(`Lobby ${lobbyCode} was reset`)
}

async function ClearVotes(lobbyCode, callback = null) {
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    var lobbyID;
    lobbyCodeQueryRes.forEach(doc => {
        lobbyID = doc.id;
    })

    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    lobbyRef.update({
        choiceOne: 0,
        choiceTwo: 0
    })
}

async function SetVideoPlaying(lobbyCode, videoPlayingIn, callback = null) {
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    var lobbyID;
    lobbyCodeQueryRes.forEach(doc => {
        lobbyID = doc.id;
    })

    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    lobbyRef.update({
        videoPlaying: videoPlayingIn
    })
}

async function SetVideoEnded(lobbyCode, videoEndedIn, callback = null) {
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    var lobbyID;
    lobbyCodeQueryRes.forEach(doc => {
        lobbyID = doc.id;
    })

    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    lobbyRef.update({
        videoEnded: videoEndedIn
    })
}

async function SetVotingAllowed(lobbyCode, votingAllowedIn, callback = null) {
    const lobbiesRef = db.collection('Lobbies');
    const lobbyCodeQueryRes = await lobbiesRef.where('lobbyCode', '==', lobbyCode).get();

    var lobbyID;
    lobbyCodeQueryRes.forEach(doc => {
        lobbyID = doc.id;
    })

    const lobbyRef = db.collection('Lobbies').doc(lobbyID);
    lobbyRef.update({
        votingAllowed: votingAllowedIn
    })
}


