let endTime;

function endGame() {
    stopTimer();
    endTime = seconds;
    console.log("Game ended. Time:", formatTime(endTime));
    showEndGameScreen();
    setTimeout(() => {
        backtoMainmenu();
    }, 10000);
}

function showEndGameScreen() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <div id="end-game-screen" class="end-game-screen">
            <h1>Congratulations!</h1>
            <p>You have completed the game.</p>
            <p>Your time: ${formatTime(endTime)}</p>
        </div>
    `;
}

function backtoMainmenu() {
    clearSaveData();
}

function clearSaveData() {
    localStorage.removeItem('gameState');
    console.log('Save data cleared');
}

// CSS for end game screen
const style = document.createElement('style');
style.innerHTML = `
    .end-game-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        z-index: 1000;
    }
    .end-game-screen h1 {
        margin-bottom: 10px;
    }
    .end-game-screen p {
        margin: 5px 0;
    }
`;
document.head.appendChild(style);