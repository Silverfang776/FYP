let specificItemCollected = false;

function checkSpecificItemCollected(levels) {
    const keyId = `key${levels}`;
    const specificItem = document.getElementById(keyId);
    specificItemCollected = specificItem && specificItem.classList.contains('visible');

    if (specificItemCollected) {
        console.log(`Specific item (key${level}) collected! Player can enter the door.`);
        // Add additional logic here if needed
        // For example, you might want to enable door interaction or similar
    } else {
        console.log(`Specific item (key${level}) is still missing.`);
    }
}

function toggleItemVisibility(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.classList.toggle('visible');
        checkSpecificItemCollected(itemId.replace('key', ''));
    }
}

/*function findItem(itemId) {
    toggleItemVisibility(itemId);
}*/

// Example usage: Simulate finding items
//setTimeout(() => findItem('key1'), 4000); // Find key1 after 4 seconds
//setTimeout(() => findItem('key2'), 4000); // Find key2 after 4 seconds
//setTimeout(() => findItem('key3'), 4000); // Find key2 after 4 seconds