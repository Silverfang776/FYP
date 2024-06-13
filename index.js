const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 32 * 32;
canvas.height = 32 * 18;

let parsedCollisions;
let collisionBlocks;
let background;
let doors = [];
let chair=null;
let infoTimeout;
let objects = [];
let gameLoaded = false; // Flag to indicate whether the game has been loaded

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
                        
                        if(level===2) {level = 1;}
                        else if(level===4) {level = 3;}
                        else if(level===5) {endGame();}
                        else {level++;}

                        if (levels[level]) {
                            levels[level].init();
                            player.switchSprite('idleRight');
                            player.preventInput = false;
                            gsap.to(overlay, {
                                opacity: 0
                            });
                            saveGame();
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
            clearImages();
            parsedCollisions = collisionLevel0.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
                player.position.x = 80;
                player.position.y = 416.5;
            }

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
                        x: 750,
                        y: 450,
                    },
                    imageSrc: './img/vent.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with vent');
                        if (isItemVisible('hook')) {
                            toggleItemVisibility('key1'); // Make key1 visible
                        } else {
                            checkvent();
                        }
                    },
                }),

                new Sprite({
                    position: {
                        x: 500,
                        y: 450,
                    },
                    imageSrc: './img/note1.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                            toggleItemVisibility('note1');
                            showInfoMessage("Found a Note");
                        },
                }),
                
                new Sprite({
                    position: {
                        x: 850,
                        y: 448,
                    },
                    imageSrc: './img/boxes.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        toggleItemVisibility('hook'); 
                    },
                }),
                
            ];

            configureArrowButtons(null, null,null,null,null,null); // Configure arrow buttons for level 1
            checkSpecificItemCollected(level); // Check for the key at the start of the level
            gameLoaded = false;
        },
    },

    2: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
                player.position.x = 775;
                player.position.y = 416.5;
            }

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
                        toggleItemVisibility('box1');
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
                    onInteract: () => {
                        console.log('Interact with vent')
                        showInfoMessage("Seem like the key is dropped nearby this vent");
                    }
                }),
            ];

            configureArrowButtons(3, 5); // Configure arrow buttons for level 2
            checkSpecificItemCollected(1); // Check for the key at the start of the level
            gameLoaded = false;
        }
    },

    3: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
            player.position.x = 796;
            player.position.y = 416.5;
            }

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
                        y: 417,
                    },
                    imageSrc: './img/cabinet.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Found Note 2");
                        toggleItemVisibility('note2')
                    }
                }),
            ];

            configureArrowButtons(null, 2,7,null,null,null); // Configure arrow buttons for level 3
            checkSpecificItemCollected(level); // Check for the key at the start of the level
            gameLoaded = false;
        }
    },

    4: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
            player.position.x = 750;
            player.position.y = 416.5;
            }

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
                        x: 780,
                        y: 416.5,
                    },
                    imageSrc: './img/door.png',
                    frameRate: 2,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];

            glassContainer = new Sprite({
                position: {
                    x: 300,
                    y: 130,
                },
                imageSrc: './img/glasscontainer.png',
                frameRate: 1,
                frameBuffer: 50,
                loop: false,
                autoplay: false,
                visible: true, // Initially visible
                onInteract: showPuzzle3,
            });
            
            glassContainer2 = new Sprite({
                position: {
                    x: 300,
                    y: 130,
                },
                imageSrc: './img/glasscontainer2.png',
                frameRate: 2,
                frameBuffer: 50,
                loop: false,
                autoplay: true,
                visible: false, // Initially invisible
                onInteract: () => {
                    showInfoMessage("This may help me to get something I cannot reach");
                }
            });

            objects = [
                new Sprite({
                    position: {
                        x: 192,
                        y: 447,
                    },
                    imageSrc: './img/boxes.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Nothing useful");
                    }
                }),

                new Sprite({
                    position: {
                        x: 192,
                        y: 352,
                    },
                    imageSrc: './img/boxes.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Nothing useful");
                    }
                }),

                new Sprite({
                    position: {
                        x: 512,
                        y: 447,
                    },
                    imageSrc: './img/boxes.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Nothing useful");
                    }
                }),
                new Sprite({
                    position: {
                        x: 512,
                        y: 352,
                    },
                    imageSrc: './img/boxes.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Nothing useful");
                    }
                }),
                glassContainer,
                glassContainer2,
            ];

            configureArrowButtons(null, null); // Configure arrow buttons for level 4
            checkSpecificItemCollected(level); // Check for the key at the start of the level
            gameLoaded = false;
        }
    },

    5: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel4.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
            player.position.x = 96;
            player.position.y = 416.5;
            }
    
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
                    onInteract: () => {
                        endGame();
                    }
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
                        showInfoMessage("Nothing here");
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
                        showInfoMessage("Nothing here");
                    }
                }),
                new Sprite({
                    position: {
                        x: 525,
                        y: 385,
                    },
                    imageSrc: './img/Monitor.png',
                    frameRate: 6,
                    frameBuffer: 100,
                    loop: true,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with monitor');
                    }
                }),
            ];
    
            configureArrowButtons(2, 6); // Configure arrow buttons for level 5
            checkSpecificItemCollected(5); // Check for the key5 at the start of the level
            gameLoaded = false;
        }
    },

    6: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel5.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
            player.position.x = 96;
            player.position.y = 416.5;
            }
            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene5.png',
            });

            doors = [
            ];

            objects = [
                new Sprite({
                    position: {
                        x: 100,
                        y: 288,
                    },
                    imageSrc: './img/refrigerator.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        toggleItemVisibility('note3');
                        showInfoMessage("Found Note 3");
                    }
                }),
                new Sprite({
                    position: {
                        x: 540,
                        y: 290,
                    },
                    imageSrc: './img/cupboard(kitchen).png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Nothing here");
                    }
                }),
                new Sprite({
                    position: {
                        x: 800,
                        y: 450,
                    },
                    imageSrc: './img/cabinet under sink.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Nothing here");
                    }
                }),
                new Sprite({
                    position: {
                        x: 800,
                        y: 418,
                    },
                    imageSrc: './img/sink.png',
                    frameRate: 4,
                    frameBuffer: 15 ,
                    loop: true,
                    autoplay: true,
                }),
            ];

            configureArrowButtons(5, null); // Configure arrow buttons for level 4
            checkSpecificItemCollected(level); // Check for the key at the start of the level
            gameLoaded = false;
        }
    },
    7: {
        init: () => {
            toggleButtonVisibility('UpButton', false);
            configureUpButtonOnly(null);
            clearImages();
            parsedCollisions = collisionLevel6.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            
            if (!gameLoaded) {
                player.position.x = 80;
                player.position.y = 416.5;
            }
    
            if (player.currentAnimation) player.currentAnimation.isActive = false;
    
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene.png',
            });
    
            doors = [];
    
            Trapdoor = new Sprite({
                position: {
                    x: 300,
                    y: 96,
                },
                imageSrc: './img/Trapdoor.png',
                frameRate: 2,
                frameBuffer: 1,
                loop: false,
                autoplay: true,
                visible: false,
                onInteract: () => {
                    console.log('Trapdoor')
            }});
    
            Trapdoor1 = new Sprite({
                position: {
                    x: 300,
                    y: 96,
                },
                imageSrc: './img/Trapdoor1.png',
                frameRate: 1,
                frameBuffer: 1,
                loop: false,
                autoplay: false,
                visible: true,
                onInteract: () => {
                    if (isItemVisible('bighook')) {
                        configureUpButtonOnly(10);
                        Trapdoor1.visible=false;
                        Trapdoor.visible=true;
                    } else {
                        showInfoMessage('It is too high to reach the trapdoor');
                    }
                },
            });

    
            objects = [
                new Sprite({
                    position: {
                        x: 100,
                        y: 384,
                    },
                    imageSrc: './img/scene6 stair.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                }),

                Trapdoor1,
                Trapdoor,

                new Sprite({
                    position: {
                        x: 700,
                        y: 416,
                    },
                    imageSrc: './img/cabinet_scene1.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        toggleItemVisibility('newspaper');
                    },
                }),
            ];
     
            if (puzzle1Solved) { 
                configureArrowButtons(8, null, null, 3,null);
            }else {
                configureArrowButtons(null, null, null, 3);
            }
            if(puzzle2Solved){
                configureArrowButtons(8, 9, null, 3,null);
            }
            
            checkSpecificItemCollected(level); // Check for the key at the start of the level
            gameLoaded = false;
        }
    },
    8: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel7.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
            player.position.x = 850;
            player.position.y = 416.5;
            }

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene7.png',
            });

            doors = [
            ];

            const scene7Image = new Sprite({
                position: {
                    x: 380,
                    y: 320,
                },
                imageSrc: './img/scene7image.png',
                frameRate: 1,
                frameBuffer: 1,
                loop: false,
                autoplay: false,
            });

            safe1=new Sprite({
                position: {
                    x: 400,
                    y: 360,
                },
                imageSrc: './img/safe1.png',
                frameRate: 1,
                frameBuffer: 1,
                loop: false,
                autoplay: false,
                visible:false,
                onInteract: () => {
                    if(safe1.visible){
                    showPuzzle2()
                    }else{showInfoMessage('It is just a forest drawing.');}
                }
            }),

            safe=new Sprite({
                position: {
                    x: 400,
                    y: 360,
                },
                imageSrc: './img/safe.png',
                frameRate: 2,
                frameBuffer: 1,
                loop: false,
                autoplay: true,
                visible:false,
            }),
            
            // Define objects array
            objects = [
                new Sprite({
                    position: {
                        x: 100,
                        y: 352,
                    },
                    imageSrc: './img/bed.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage('There is a button at the beside the bed');
            
                        // Directly adjust the position of scene7Image
                        scene7Image.position.y -= 100; // Decrease the y position by 100
                        safe1.visible = true;
                    }
                }),
                new Sprite({
                    position: {
                        x: 750,
                        y: 255.5,
                    },
                    imageSrc: './img/cupboard.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage("Nothing here");
                    }
                }),
                safe1,
                safe,
                scene7Image, // Add scene7Image to objects array
            ];

            configureArrowButtons(null, 7); // Configure arrow buttons for level 4
            checkSpecificItemCollected(level); // Check for the key at the start of the level
            gameLoaded = false;
        }
    },
    9: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel8.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (!gameLoaded) {
            player.position.x = 80;
            player.position.y = 416.5;
            }

            if (player.currentAnimation) player.currentAnimation.isActive = false;

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene.png',
            });

            doors = [
            ];

            objects = [
                new Sprite({
                    position: {
                        x: 200,
                        y: 255.5,
                    },
                    imageSrc: './img/cupboard (Scene 8).png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        toggleItemVisibility("note4");
                    },
                }),
                new Sprite({
                    position: {
                        x: 400,
                        y: 255.5,
                    },
                    imageSrc: './img/cupboard2 (Scene 8).png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        showInfoMessage('Nothing here');
                    },
                }),
                new Sprite({
                    position: {
                        x: 700,
                        y: 432,
                    },
                    imageSrc: './img/table scene 9.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        toggleItemVisibility("key2");
                    },
                }),
                
                new Sprite({
                    position: {
                        x: 718,
                        y: 372,
                    },
                    imageSrc: './img/Monitor.png',
                    frameRate: 6,
                    frameBuffer: 50,
                    loop: true,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with Monitor');
                    },
                }),
            ];
            chair= new Sprite({
                position: {
                    x: 750,
                    y: 432,
                },
                imageSrc: './img/chair9.png',
                frameRate: 1,
                frameBuffer: 1,
                loop: false,
                autoplay: false,
            });

            configureArrowButtons(7, null); // Configure arrow buttons for level 1
            checkSpecificItemCollected(level); // Check for the key at the start of the level
            gameLoaded = false;
        },
    },
    10: {
        init: () => {
            clearImages();
            parsedCollisions = collisionLevel9.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
    
            if (!gameLoaded) {
                player.position.x = 80;
                player.position.y = 416.5;
            }
    
            if (player.currentAnimation) player.currentAnimation.isActive = false;
    
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/scene.png',
            });
    
            doors = [];
    
            safecase=new Sprite({
                position: {
                    x: 600,
                    y: 432,
                },
                imageSrc: './img/safecase.png',
                frameRate: 2,
                frameBuffer: 1,
                loop: false,
                autoplay: true,
                visible:false,
            }),
            safecase1=new Sprite({
                position: {
                    x: 600,
                    y: 432,
                },
                imageSrc: './img/safecase1.png',
                frameRate: 1,
                frameBuffer: 1,
                loop: false,
                autoplay: false,
                visible:true,
                onInteract: () => {
                    showPuzzle4();
                },
            }),

            objects = [
                new Sprite({
                    position: {
                        x: 560,
                        y: 190,
                    },
                    imageSrc: './img/frame.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                }),
                new Sprite({
                    position: {
                        x: 570,
                        y: 200,
                    },
                    imageSrc: './img/CCTV.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                }),
                new Sprite({
                    position: {
                        x: 760,
                        y: 200,
                    },
                    imageSrc: './img/CCTV.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                }),
                new Sprite({
                    position: {
                        x: 250,
                        y: 280,
                    },
                    imageSrc: './img/scene 9 plan.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                }),
                new Sprite({
                    position: {
                        x: 680,
                        y: 432.5,
                    },
                    imageSrc: './img/table scene 9.png',
                    frameRate: 2,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        toggleItemVisibility('note5');
                    },
                }),
                new Sprite({
                    position: {
                        x: 695,
                        y: 372,
                    },
                    imageSrc: './img/Monitor1.png',
                    frameRate: 1,
                    frameBuffer: 1,
                    loop: false,
                    autoplay: false,
                    onInteract: () => {
                        console.log('Interact with monitor');
                    },
                }),
                safecase1,
                safecase,
            ];
    
            chair = new Sprite({
                position: {
                    x: 725,
                    y: 432,
                },
                imageSrc: './img/chair9.png',
                frameRate: 1,
                frameBuffer: 1,
                loop: false,
                autoplay: false,
            });
    
            configureArrowButtons(null, null, null, null,7, null); // Configure arrow buttons for level 10
        checkSpecificItemCollected(level); // Check for the key at the start of the level
        gameLoaded = false;
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

document.getElementById('note1').addEventListener('mouseover', hovernote1);
document.getElementById('note2').addEventListener('mouseover', hovernote2);
document.getElementById('note3').addEventListener('mouseover', hovernote2);
document.getElementById('note4').addEventListener('mouseover', hovernote2);
document.getElementById('note5').addEventListener('mouseover', hovernote2);
document.getElementById('newspaper').addEventListener('mouseover', hovernews);
document.getElementById('key1').addEventListener('mouseover', hoverKey1);
document.getElementById('key3').addEventListener('mouseover', hoverKey3);
document.getElementById('hook').addEventListener('mouseover', hoverhook);
document.getElementById('bighook').addEventListener('mouseover', hoverbighook);
document.getElementById('box1').addEventListener('mouseover', hoverbox);

document.getElementById('saveButton').addEventListener('click', saveGame);

