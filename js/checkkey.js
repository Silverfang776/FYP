// checkkey.js
let specificItemCollected = false;

const keyMapping = {
    1: ['key1'],
    2: ['key1'],
    3: ['key2'],
    4: ['key2'],
    5: ['key5'],
    // Add other levels and their required keys as needed
};

function checkSpecificItemCollected(level) {
    const requiredKeys = keyMapping[level] || [];
    specificItemCollected = requiredKeys.every(keyId => {
        const keyElement = document.getElementById(keyId);
        return keyElement && keyElement.classList.contains('visible');
    });

    if (specificItemCollected) {
        console.log(`Required items for level ${level} collected! Player can enter the door.`);
    } else {
        console.log(`Required items for level ${level} are still missing.`);
    }
}

function toggleItemVisibility(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.classList.toggle('visible');
        // Always check for specific item of the current level
        const currentLevel = level; // assuming `level` is a global variable representing the current level
        checkSpecificItemCollected(currentLevel);
    }
}

function isItemVisible(itemId) {
    const item = document.getElementById(itemId);
    return item && item.classList.contains('visible');
}

function findItem(itemId) {
    toggleItemVisibility(itemId);
}

// Example usage: Simulate finding items
//setTimeout(() => findItem('key1'), 1000); // Find key1 after 4 seconds
//setTimeout(() => findItem('key2'), 4000); // Find key2 after 4 seconds
//setTimeout(() => findItem('key3'), 1000); // Find key2 after 4 seconds