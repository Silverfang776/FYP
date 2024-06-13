function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw();
    });

    background.draw();

    doors?.forEach((door) => {
        door.draw();
    });

    objects.forEach((object) => {
        if (object.visible) {
            object.draw();
        }
    });

        player.handleInput(keys);
        player.draw();
        player.update();

    if (chair) { 
        chair.draw();
    }

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}

function clearImages() {
    chair = null;
}