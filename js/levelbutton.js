// levelbutton.js
function configureArrowButtons(leftLevel = null, rightLevel = null, UpStair = null, DownStair = null, Down = null, Up=null) {
    const leftArrowButton = document.getElementById('leftArrowButton');
    const rightArrowButton = document.getElementById('rightArrowButton');
    const UpStairButton = document.getElementById('UpStairButton');
    const DownStairButton = document.getElementById('DownStairButton');
    const DownButton = document.getElementById('DownButton');
    const UpButton = document.getElementById('UpButton');

    if (leftArrowButton && leftLevel !== null) {
        leftArrowButton.style.display = 'block';
        leftArrowButton.onclick = () => {
            level = leftLevel;
            levels[level].init();
        };
    } else if (leftArrowButton) {
        leftArrowButton.style.display = 'none';
    }

    if (rightArrowButton && rightLevel !== null) {
        rightArrowButton.style.display = 'block';
        rightArrowButton.onclick = () => {
            level = rightLevel;
            levels[level].init();
        };
    } else if (rightArrowButton) {
        rightArrowButton.style.display = 'none';
    }
    
    if (UpStairButton && UpStair !== null) {
        UpStairButton.style.display = 'block';
        UpStairButton.onclick = () => {
            level = UpStair;
            levels[level].init();
        };
    } else if (UpStairButton) {
        UpStairButton.style.display = 'none';
    }

    if (DownStairButton && DownStair !== null) {
        DownStairButton.style.display = 'block';
        DownStairButton.onclick = () => {
            level = DownStair;
            levels[level].init();
        };
    } else if (DownStairButton) {
        DownStairButton.style.display = 'none';
    }

    if (DownButton && Down !== null) {
        DownButton.style.display = 'block';
        DownButton.onclick = () => {
            level = Down;
            levels[level].init();
        };
    } else if (DownButton) {
        DownButton.style.display = 'none';
    }

    if (UpButton && Up !== null) {
        UpButton.style.display = 'block';
        UpButton.onclick = () => {
            level = Up;
            levels[level].init();
        };
    } else if (UpButton) {
        UpButton.style.display = 'none';
    }
}

function configureUpButtonOnly(upLevel = null) {
    upButton = document.getElementById('UpButton');

    if (upButton && upLevel !== null) {
        upButton.style.display = 'block';
        upButton.onclick = () => {
            level = upLevel;
            levels[level].init();
        };
    } else if (upButton) {
        upButton.style.display = 'none';
    }
}


// levelbutton.js
function toggleButtonVisibility(buttonId, isVisible) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.display = isVisible ? 'block' : 'none';
    }
}