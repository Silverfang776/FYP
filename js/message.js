function showInfoMessage(message) {
    const infoContainer = document.getElementById('info-container');
    const infoMessage = document.getElementById('info-message');
    
    // Clear any existing timeout
    clearTimeout(infoTimeout);

    // Update the message and display the container
    infoMessage.textContent = message;
    infoContainer.style.display = 'block';

    // Set a timeout to hide the container after 5 seconds
    infoTimeout = setTimeout(() => {
        infoContainer.style.display = 'none';
    }, 5000);
}

function hoverKey1() {
    showInfoMessage("This key may help me to get out this room");
}

function hovernote1() {
    showInfoMessage("I must leave this house before Mr. Wacky come back");
}

function hovernote2() {
    showInfoMessage("This may be the hint for puzzle");
}

function hoverbox() {
    showInfoMessage("The box is locked with a puzzle, inside the box may have something that may help me");
}

function hoverhook() {
    showInfoMessage("This may help me to hook something from the vent");
}

function checkvent() {
    showInfoMessage('There are something outside the vent');
}

function hoverbighook() {
    showInfoMessage("This may help me to get something I cannot reach");
}

function hovernews() {
    showInfoMessage("A news about Mr.Wacky...");
}

function hoverKey3() {
    showInfoMessage("The bedroom maybe on the upstair");
}