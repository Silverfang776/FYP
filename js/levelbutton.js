function configureArrowButtons(leftLevel = null, rightLevel = null) {
    const leftArrowButton = document.getElementById('leftArrowButton');
    const rightArrowButton = document.getElementById('rightArrowButton');

    if (leftLevel !== null) {
        leftArrowButton.style.display = 'block';
        leftArrowButton.onclick = () => {
            level = leftLevel;
            levels[level].init();
        };
    } else {
        leftArrowButton.style.display = 'none';
    }

    if (rightLevel !== null) {
        rightArrowButton.style.display = 'block';
        rightArrowButton.onclick = () => {
            level = rightLevel;
            levels[level].init();
        };
    } else {
        rightArrowButton.style.display = 'none';
    }
}