let player;

// if in validateInput is used for determining if provided string is lone ID, or entire link
function validateInput () {
    let rawInput = document.getElementById("userInputTextArea").value;
    if (rawInput.includes(".")) {
        return rawInput.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/)[1];
    } else {
        return rawInput;
    } 
}

// initiates app, creates 'player', used for controlling app (controlling youtube player, specifically)
function initiateApp () {
    if (player) { 
        player.destroy();
    }

    player = new YT.Player('videoContainer', {
        width: 600,
        height: 400,
        videoId: validateInput(),
        events: {
            onReady: initialize,
            onError: handleError,
            onStateChange: handleStateChange
        }
    });
}

// initialises app, by starting video used with new YT Player, and starting interval checking counter
function initialize () {
    player.playVideo();   
}

// handles errors
function handleError (event) { 
    if (event.data == 2) {
        alert("provided video ID is invalid");
    } else {
        alert("there is some kind of problem other than video ID being invalid");
    }
    player.destroy();
}

// handles pausing and unpausing video
function handleStateChange () {
    if (player.getPlayerState() == 1) {
        setInterval(counterRefresher, 100);
    } else if (player.getPlayerState() == 2) {
        clearInterval(counterRefresher);
    }
}

// handles counter
function counterRefresher () {
    let remainingTime = (player.getDuration() - player.getCurrentTime());
    if (Math.floor(remainingTime) < 11 && remainingTime > 0) {
        document.getElementById("timerContainer").innerHTML = Math.floor(remainingTime.toString());
        document.getElementById("timerBackground").style.display = "block";
    } else {
        document.getElementById("timerContainer").innerHTML = "";
        document.getElementById("timerBackground").style.display = "none";
    }
}