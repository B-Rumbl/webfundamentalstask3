const currentTime = document.getElementById("currenttime")
const totalTime = document.getElementById("totaltime")
const playPauseButton = document.getElementById("playstatic")
const seek = document.getElementById("seek")
const amnesiaris = document.getElementById("amnesiaris")
const apocashuffle = document.getElementById("apocashuffle")
const bleetz = document.getElementById("bleetz")
//audio with a capital A is a class that use of "audio" refers to
const audio = new Audio()
let seeking = false

//on click listener for song 001
amnesiaris.onclick = function () {
    audio.src = "webfundatask3/audioplayer/audio/amnesiaris.webm"
    audio.onpause()
}

//onclick listener for song 002
apocashuffle.onclick = function () {
    audio.src = "webfundatask3/audioplayer/audio/apocalypseshuffle.webm"
    audio.onpause()
}

//onclick listener for song 003
bleetz.onclick = function () {
    audio.src = "webfundatask3/audioplayer/audio/bleetzncheetz2.webm"
    audio.onpause()
}

//button listener
playPauseButton.onclick = function () {
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}

//event triggered when audio ends
audio.onended = function () {
    currenttime.innerHTML = formatTime(0)
    seek.value = 0
    playPauseButton.src = "webfundatask3/audioplayer/images/playstatic.svg"
}
//audio listeners above
audio.oncanplaythrough = function () {
    seek.disabled = false;
}
//event triggered when audio plays
audio.onplay = function () {
    playPauseButton.src = "webfundatask3/audioplayer/images/pausestatic.svg"

}
//event triggered when audio paused
audio.onpause = function () {
    playPauseButton.src = "webfundatask3/audioplayer/images/playstatic.svg"
}
//event triggered by metadata load 
audio.onloadedmetadata = function () {
    totaltime.innerHTML = formatTime(audio.duration)
    currenttime.innerHTML = formatTime(0)
    seek.max = Math.floor(audio.duration)
}
//event triggered when playback time updates
audio.ontimeupdate = function () {
    currenttime.innerHTML = formatTime(audio.currentTime)
    if (!seeking) {
        seek.value = Math.floor(audio.currentTime)
    }
}
//seek bar listeners
//event triggered on interaction with seekbar
seek.oninput = function () {
    seeking = true
}
//event triggered when seek bar is changed
seek.onchange = function () {
    audio.currentTime = seek.value
    seeking = false
}
//volume slider
const volSlider = document.getElementById("volume")
volSlider.onchange = function(){
    audio.volume = volSlider.value/100
}








//UTILITY FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}