// puzzle.js

// Utility function to close puzzles
function closePuzzle(puzzleId) {
    const puzzleContainer = document.getElementById(`${puzzleId}-container`);
    const puzzle = document.getElementById(puzzleId);
    if (puzzleContainer) puzzleContainer.style.display = 'none';
}

// Puzzle 1
let puzzle1Solved = false;

function showPuzzle1() {
    if (puzzle1Solved) return;
    const puzzleContainer = document.getElementById('puzzle1-container');
    puzzleContainer.style.display = 'block';
}

function checkWord() {
    const correctWord = "CAT";
    const userInput = document.getElementById("word-input").value.toUpperCase();
    const message = document.getElementById("message");

    if (userInput === correctWord) {
        message.textContent = "Correct! The word is solved.";
        solvePuzzle('puzzle1');
        toggleItemVisibility('key3');
    } else {
        message.textContent = "Incorrect. Try again.";
    }
}

function solvePuzzle(itemId) {
    puzzle1Solved = true;
    const message = document.getElementById('message');
    message.textContent = "Correct! The word is solved.";
    
    setTimeout(() => {
        closePuzzle(itemId);
        const box = document.getElementById('box');
        console.log(`Puzzle ${itemId} solved!`);
    }, 3000);
}

// Puzzle 2
let puzzle2Solved = false;
let clickOrder = [];
const correctOrder = [4, 1, 3, 4, 2];

function showPuzzle2() {
    if (puzzle2Solved) return;
    const puzzleContainer = document.getElementById('puzzle2-container');
    puzzleContainer.style.display = 'block';
}

function clickButton(buttonNumber) {
    clickOrder.push(buttonNumber);

    for (let i = 0; i < clickOrder.length; i++) {
        if (clickOrder[i] !== correctOrder[i]) {
            clickOrder = [];
            document.getElementById('puzzle2-message').textContent = "Incorrect order. Try again.";
            return;
        }
    }

    if (clickOrder.length === correctOrder.length) {
        solvePuzzle2();
    }
}

function solvePuzzle2() {
    puzzle2Solved = true;
    document.getElementById('puzzle2-message').textContent = "Correct! Puzzle solved.";
    setTimeout(()=>{
        closePuzzle('puzzle2');
        toggleItemVisibility('key4');
        safe.visible=true;
        safe1.visible=false;
        },3000)
}

// Puzzle 3
let puzzle3Solved = false;
const correctSequence = ['purple', 'red', 'blue','purple','yellow'];
let userSequence = [];

function showPuzzle3() {
    if (puzzle3Solved) return;
    const puzzleContainer = document.getElementById('puzzle3-container');
    puzzleContainer.style.display = 'block';
    document.getElementById("puzzle3-message").textContent = "";
    userSequence = [];
}

function checkColor(color) {
    userSequence.push(color);
    if (userSequence.length === correctSequence.length) {
        if (userSequence.every((val, index) => val === correctSequence[index])) {
            document.getElementById("puzzle3-message").textContent = "Correct! Sequence matched.";
            puzzle3Solved = true;
            setTimeout(() => {
                closePuzzle('puzzle3');
                glassContainer.visible=false;
                glassContainer2.visible=true;
                toggleItemVisibility('bighook');
            }, 3000);
        } else {
            document.getElementById("puzzle3-message").textContent = "Incorrect sequence. Try again.";
            userSequence = [];
        }
    }
}

// Puzzle 4
let puzzle4Solved = false;
const solution = [1,2,3,5,1,5,4,5,5];
let userInput = [];

function initializePuzzle4() {
    createNumberButtons();
    resetPuzzle4();
}

function createNumberButtons() {
    const puzzle4Container = document.getElementById('puzzle4-content');
    const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];
    const numberPad = document.createElement('div');
    numberPad.className = 'number-pad';
    numbers.forEach(number => {
        const button = document.createElement('button');
        button.textContent = number;
        button.className = 'number-button';
        button.onclick = () => {
            userInput.push(number);
            if (userInput.length === solution.length) {
                document.getElementById('submit-button').disabled = false;
            }
        };
        numberPad.appendChild(button);
    });
    puzzle4Container.appendChild(numberPad);
}

function showPuzzle4() {
    if (puzzle4Solved) return;
    const puzzleContainer = document.getElementById('puzzle4-container');
    showMessage('Insert the password');
    puzzleContainer.style.display = 'block';
    resetPuzzle4();
}

function closePuzzle4() {
    const puzzleContainer = document.getElementById('puzzle4-container');
    puzzleContainer.style.display = 'none';
}

function checkSolution() {
    if (JSON.stringify(userInput) === JSON.stringify(solution)) {
        showMessage('Puzzle solved!');
        puzzle4Solved = true;
        safecase1.visible=false;
        safecase.visible=true;
        toggleItemVisibility('key5');
        setTimeout(() => {
            disablePuzzle4();
            closePuzzle4();
        }, 3000);
    } else {
        showMessage('Wrong answer, try again.');
        resetPuzzle4();
    }
}

function resetPuzzle4() {
    userInput = [];
    document.getElementById('submit-button').disabled = true;
}

function disablePuzzle4() {
    const puzzle4Container = document.getElementById('puzzle4-content');
    puzzle4Container.innerHTML = '';
    document.getElementById('submit-button').style.display = 'none';
    puzzle4Container.appendChild(document.createTextNode('Puzzle Solved!'));
}

function showMessage(message) {
    clearMessages();
    const puzzle4Container = document.getElementById('puzzle4-content');
    const messageElement = document.createElement('div');
    messageElement.className = 'puzzle-message';
    messageElement.textContent = message;
    puzzle4Container.prepend(messageElement);
}

function clearMessages() {
    const puzzle4Container = document.getElementById('puzzle4-content');
    const messages = puzzle4Container.getElementsByClassName('puzzle-message');
    while (messages.length > 0) {
        messages[0].parentNode.removeChild(messages[0]);
    }
}

document.getElementById('submit-button').onclick = checkSolution;

// Initialize Puzzle 4 when the script loads
initializePuzzle4();