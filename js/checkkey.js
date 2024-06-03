function checkSpecificItemCollected() {
    const specificItem = document.getElementById('key1');
    specificItemCollected = specificItem && specificItem.classList.contains('visible');

    if (specificItemCollected) {
        console.log("Specific item collected! Player can enter the door.");
        // You can add additional logic here if needed
    } else {
        console.log("Specific item is still missing.");
    }
}

function toggleItemVisibility(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.classList.toggle('visible');
        checkSpecificItemCollected();
    }
}

function findItem(itemId) {
    toggleItemVisibility(itemId);
}

// Example usage: Simulate finding items
setTimeout(() => findItem('key1'), 8000); // Find key1 after 2 seconds
setTimeout(() => findItem('key2'), 4000); // Find key2 after 4 seconds
setTimeout(() => findItem('key3'), 6000); // Find key3 after 6 seconds