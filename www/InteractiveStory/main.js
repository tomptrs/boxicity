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
    StartTimer
} from "./modules/lobbyController.js";


window.VoteForChoice = VoteForChoice
window.CountVotes = CountVotes
window.ClearVotes = ClearVotes
window.SetChoices = SetChoices
window.SetVotingButtonsDisabled = SetVotingButtonsDisabled
window.GetVotingAllowed = GetVotingAllowed
window.voted = voted

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