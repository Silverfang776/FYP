window.addEventListener('keydown', (event) => {
    if (player.preventInput) return;
    switch (event.key) {
        case 'w':
            if (player.velocity.y === 0)
                player.velocity.y = -13.75;
            break;

        case 'a':
            keys.a.pressed = true;
            break;

        case 'd':
            keys.d.pressed = true;
            break;

        case 'f':
            keys.f.pressed = true;

            // Check for doors
            if (specificItemCollected) {
                for (let i = 0; i < doors.length; i++) {
                    const door = doors[i];
                    if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                        player.hitbox.position.x + player.hitbox.width >= door.position.x &&
                        player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                        player.hitbox.position.y <= door.position.y + door.height) {
                        player.velocity.x = 0;
                        player.velocity.y = 0;
                        player.preventInput = true;
                        player.switchSprite('enterdoor');
                        door.play();
                        return;
                    }
                }
            }

            // Check for objects
            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                if (player.hitbox.position.x + player.hitbox.width <= object.position.x + object.width &&
                    player.hitbox.position.x + player.hitbox.width >= object.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= object.position.y &&
                    player.hitbox.position.y <= object.position.y + object.height) {
                    player.velocity.x = 0;
                    player.velocity.y = 0;
                    player.preventInput = true;
                    player.switchSprite('interact', object); // Pass the object to the interact animation
                    object.play();
                    object.onInteract();
                    return;
                }
            }
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;
    }
});