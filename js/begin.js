// begin.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to show the main menu
    function showMainMenu() {
        // Hide the game canvas and container initially
        const gameCanvas = document.querySelector('canvas');
        const gameContainer = document.getElementById('game-container');
        const mainMenu = document.getElementById('main-menu');

        // Check if elements exist
        if (!gameCanvas || !gameContainer || !mainMenu) {
            console.error('One or more elements are not found.');
            return;
        }

        gameCanvas.style.display = 'none';
        gameContainer.style.display = 'none';

        const newGameButton = document.getElementById('newGameButton');
        const continueButton = document.getElementById('continueButton');
        const rankingButton = document.getElementById('rankingButton');

        // Check if button elements exist
        if (!newGameButton || !continueButton || !rankingButton) {
            console.error('One or more button elements are not found.');
            return;
        }

        newGameButton.onclick = () => {
            level = 1;
            mainMenu.style.display = 'none';
            gameCanvas.style.display = 'block';
            gameContainer.style.display = 'block';
            levels[level].init();
            startTimer();
            animate(); // Start the animation loop
        };

        continueButton.onclick = () => {
            loadGame();
            mainMenu.style.display = 'none';
            gameCanvas.style.display = 'block';
            gameContainer.style.display = 'block';
            animate(); // Start the animation loop
        };

        rankingButton.onclick = () => {
            showRanking();
        };
    }

    // Function to show ranking
    function showRanking() {
        alert('Display ranking here');
    }

    // Initialize the main menu
    showMainMenu();
});