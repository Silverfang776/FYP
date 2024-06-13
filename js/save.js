function saveGame() {
    const items = document.querySelectorAll('#items-container .item');
    const visibleItems = Array.from(items).map(item => ({
        id: item.id,
        visible: item.classList.contains('visible')
    }));

    const puzzleStates = {
        puzzle1: puzzle1Solved,
        puzzle2: puzzle2Solved,
        puzzle3: puzzle3Solved,
        puzzle4: puzzle4Solved,
    };

    const gameState = {
        level: level, // Capture the current level
        playerPosition: {
            x: player.position.x,
            y: player.position.y,
        },
        visibleItems: visibleItems,
        puzzles: puzzleStates,
        timer: seconds,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log('Game saved');
}

function loadGame() {
    gameLoaded = true;
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        level = gameState.level; // Restore the captured level

        // Restore player position
        player.position.x = gameState.playerPosition.x;
        player.position.y = gameState.playerPosition.y;

        // Restore item visibility
        gameState.visibleItems.forEach(itemState => {
            const item = document.getElementById(itemState.id);
            if (item) {
                if (itemState.visible) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            }
        });

        // Restore puzzle states
        puzzle1Solved = gameState.puzzles.puzzle1;
        puzzle2Solved = gameState.puzzles.puzzle2;
        puzzle3Solved = gameState.puzzles.puzzle3;
        puzzle4Solved = gameState.puzzles.puzzle4;

        // Call the init function of the current level to reinitialize elements
        levels[level].init();

        // Restore timer
        seconds = gameState.timer;
        document.getElementById('timer').textContent = `Time: ${formatTime(seconds)}`;
        startTimer();
        console.log('Game loaded');
    } else {
        console.log('No saved game found');
    }
}