const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 32 * 32;
canvas.height = 32 * 18;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
let objects = [];

const player = new Player({
    imageSrc: './img/character/idleRight.png',
    frameRate: 5,
    animations: {
        idleLeft: {
            frameRate: 5,
            frameBuffer: 28,
            loop: true,
            imageSrc: './img/character/idleLeft.png',
        },
        idleRight: {
            frameRate: 5,
            frameBuffer: 28,
            loop: true,
            imageSrc: './img/character/idleRight.png',
        },
        walkLeft: {
            frameRate: 8,
            frameBuffer: 10,
            loop: true,
            imageSrc: './img/character/walkLeft.png',
        },
        walkRight: {
            frameRate: 8,
            frameBuffer: 10,
            loop: true,
            imageSrc: './img/character/walkRight.png',
        },
        enterdoor: {
            frameRate: 4,
            frameBuffer: 5,
            loop: false,
            imageSrc: './img/character/enterdoor.png',
            onComplete: () => {
                console.log('complete animation');
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++;
                        if(level===3) level = 1;
                        if (levels[level]) {
                            levels[level].init();
                            player.switchSprite('idleRight');
                            player.preventInput = false;
                            gsap.to(overlay, {
                                opacity: 0
                            });
                        } 
                    }
                });
            },
        },
        interact: {
            frameRate: 4,
            frameBuffer: 5,
            loop: false,
            imageSrc: './img/character/idleLeft.png',
            onComplete: (object) => {
                console.log('complete interaction');
                if (object && object.onInteract) {
                    console.log('Calling onInteract');
                    object.onInteract(); // Call the onInteract function of the object
                }
                player.switchSprite('idleLeft');
                player.preventInput = false;
            },
        },
    },
});

let level = 1;
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionLevel0.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 80;
            player.position.y = 416.5;

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene0.png',
            });

            doors = [
                new Sprite({
                    position: {
                        x: 100,
                        y: 416.5,
                    },
                    imageSrc: './img/door.png',
                    frameRate: 2,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            objects = [
                new Sprite({
                    position: {
                        x: 500,
                        y: 450,
                    },
                    imageSrc: './img/vent.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with vent');
                        toggleItemVisibility('key1'); // Make key1 visible
                    },
                }),
            ];

            configureArrowButtons(null, null); // Configure arrow buttons for level 1
            checkSpecificItemCollected(level); // Check for the key at the start of the level
        },
    },

    2: {
        init: () => {
            parsedCollisions = collisionLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 775;
            player.position.y = 416.5;

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene1.png',
            });

            doors = [
                new Sprite({
                    position: {
                        x: 800,
                        y: 416.5,
                    },
                    imageSrc: './img/door.png',
                    frameRate: 2,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            objects = [
                new Sprite({
                    position: {
                        x: 525,
                        y: 416.5,
                    },
                    imageSrc: './img/cabinet_scene1.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with cabinet')
                        toggleItemVisibility('key2'); // Make key1 visible
                    }
                }),
                new Sprite({
                    position: {
                        x: 150,
                        y: 470.5,
                    },
                    imageSrc: './img/vent.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    
                }),
            ];

            configureArrowButtons(3, 5); // Configure arrow buttons for level 2
            checkSpecificItemCollected(1); // Check for the key at the start of the level
        }
    },

    3: {
        init: () => {
            parsedCollisions = collisionLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96;
            player.position.y = 140;

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene2.png',
            });

            doors = [
                new Sprite({
                    position: {
                        x: 100,
                        y: 416.5,
                    },
                    imageSrc: './img/door.png',
                    frameRate: 2,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            objects = [
                new Sprite({
                    position: {
                        x: 400,
                        y: 300,
                    },
                    imageSrc: './img/cabinet.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                }),
            ];

            configureArrowButtons(null, 2); // Configure arrow buttons for level 3
            checkSpecificItemCollected(level); // Check for the key at the start of the level
        }
    },

    4: {
        init: () => {
            parsedCollisions = collisionLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96;
            player.position.y = 140;

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene3.png',
            });

            doors = [
                new Sprite({
                    position: {
                        x: 100,
                        y: 416.5,
                    },
                    imageSrc: './img/door.png',
                    frameRate: 2,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            objects = [
                new Sprite({
                    position: {
                        x: 400,
                        y: 300,
                    },
                    imageSrc: './img/cabinet.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                }),
            ];

            configureArrowButtons(null, null); // Configure arrow buttons for level 4
            checkSpecificItemCollected(level); // Check for the key at the start of the level
        }
    },

    5: {
        init: () => {
            parsedCollisions = collisionLevel4.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96;
            player.position.y = 140;

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene4.png',
            });

            doors = [
                new Sprite({
                    position: {
                        x: 800,
                        y: 416.5,
                    },
                    imageSrc: './img/door.png',
                    frameRate: 2,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            objects = [
                new Sprite({
                    position: {
                        x: 100,
                        y: 255.5,
                    },
                    imageSrc: './img/cupboard.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with cupboard')
                        toggleItemVisibility('key3'); // Make key1 visible
                    }
                }),
                new Sprite({
                    position: {
                        x: 540,
                        y: 448,
                    },
                    imageSrc: './img/cabinet_scene4.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with cabinet')
                        toggleItemVisibility('key1'); // Make key1 visible
                    }
                }),
                new Sprite({
                    position: {
                        x: 525,
                        y: 389,
                    },
                    imageSrc: './img/Monitor.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with monitor')
                        //toggleItemVisibility('key1'); // Make key1 visible
                    }
                }),
            ];

            configureArrowButtons(2, 6); // Configure arrow buttons for level 4
            checkSpecificItemCollected(level); // Check for the key at the start of the level
        }
    },
    
};

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    f: {
        pressed: false
    },
};

const overlay = {
    opacity: 0,
};

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();

    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw();
    });

    doors.forEach((door) => {
        door.draw();
    });

    objects.forEach((object) => {
        object.draw();
    });

    player.handleInput(keys);
    player.draw();
    player.update();

    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}



levels[level].init();
animate();