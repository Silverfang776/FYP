const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// 64*64 pixels
canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions
let collisionBlocks
let background
let doors

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
            onComplete:()=>{
                console.log('complete animation')
                gsap.to(overlay,{
                    opacity:1,
                    onComplete:()=>{
                        level++
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput=false
                        gsap.to(overlay,{
                            opacity:0
                        })
                    }
                })
            },
        },
    },
});

let level=1
let levels={
    1:{
        init:()=>{
            parsedCollisions = collisionLevel0.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks=collisionBlocks

            if(player.currentAnimation) player.currentAnimation.isActive=false

            
            background= new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/level0map.png'
            })
            
            doors = [
                new Sprite({
                position: {
                    x: 100,
                    y: 416.5,
                },
                imageSrc: './img/door.png',
                frameRate:2,
                frameBuffer:5,
                loop:false,
                autoplay:false,
            })
            ]
        },
    },

    2:{
        init:()=>{
            parsedCollisions = collisionLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks=collisionBlocks
            player.position.x=96
            player.position.y=140

            if(player.currentAnimation) player.currentAnimation.isActive=false
            
            background= new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/level1map.png'
            })
            
            doors = [
                new Sprite({
                position: {
                    x: 100,
                    y: 416.5,
                },
                imageSrc: './img/door.png',
                frameRate:2,
                frameBuffer:5,
                loop:false,
                autoplay:false,
            })
            ]
        }
    }

}

let specificItemCollected = false;

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

const overlay={
    opacity:0,
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    

    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw();
    });

    doors.forEach((door) => {
        door.draw();
    });
    player.handleInput(keys);
    player.draw();
    player.update();

    c.save()
    c.globalAlpha=overlay.opacity
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.restore()
}

levels[level].init()
animate();
