class Player extends Sprite{
    constructor({collisionBlocks=[],imageSrc,frameRate,animations,loop}){
        super({imageSrc,frameRate,animations,loop})
        this.position ={
            x: 200,
            y: 200,
        }

            this.velocity={
                x:0,
                y:0,
            }

        this.sides={
            bottom: this.position.y+this.height,
        } 
        this.gravity=1

        this.collisionBlocks=collisionBlocks
    }

    switchSprite(name){
        if(this.image===this.animations[name].image) return
        this.currentFrame=0
        this.image=this.animations[name].image
        this.frameRate=this.animations[name].frameRate
        this.frameBuffer=this.animations[name].frameBuffer
        this.loop=this.animations[name].loop
        this.currentAnimation=this.animations[name]
    }
    
    update(){
        //bluebox
        //c.fillStyle='rgba(0,0,255,0.5)'
        //c.fillRect(this.position.x,this.position.y,this.width,this.height)
        this.position.x +=this.velocity.x

        this.updateHitbox()

        //check for horizontal collisions
        this.checkForHorizontalCollisions()

        //apply gravity
        this.velocity.y += this.gravity
        this.position.y +=this.velocity.y
        
        // c.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height
        // )

        this.updateHitbox()
        //check for vertical collisions
        this.checkForVerticalCollisions()
}

handleInput(keys){
    if(player.preventInput)return
    this.velocity.x = 0;
    if (keys.d.pressed) {
        this.switchSprite('walkRight');
        this.velocity.x = 3;
        this.lastDirection = 'right';
    } else if (keys.a.pressed) {
        this.switchSprite('walkLeft');
        this.velocity.x = -3;
        this.lastDirection = 'left';
    } else {
        if (this.lastDirection === 'left')
            this.switchSprite('idleLeft');
        else
            this.switchSprite('idleRight');
    }
}

updateHitbox(){
    this.hitbox={
        position:{
            x:this.position.x+38,
            y:this.position.y+60,
        },
        width:51.5,
        height:67.25,
    }
}

checkForHorizontalCollisions(){
    for(let i=0;i<this.collisionBlocks.length;i++){
        const collisionBlock=this.collisionBlocks[i]
        if(
            this.hitbox.position.x<=collisionBlock.position.x+collisionBlock.width && 
            this.hitbox.position.x+this.hitbox.width>=collisionBlock.position.x &&
            this.hitbox.position.y+this.hitbox.height>=collisionBlock.position.y &&
            this.hitbox.position.y<=collisionBlock.position.y+collisionBlock.height){
              
                if(this.velocity.x<0){
                const offset=this.hitbox.position.x-this.position.x
                this.position.x=collisionBlock.position.x+collisionBlock.width-offset+0.01
                break
              }

              if (this.velocity.x>0){
                const offset=this.hitbox.position.x - this.position.x+this.hitbox.width
                this.position.x=collisionBlock.position.x-offset-0.01
                break
              }  
        }
    }
}

checkForVerticalCollisions(){
    for(let i=0;i<this.collisionBlocks.length;i++){
        const collisionBlock=this.collisionBlocks[i]
        if(
            this.hitbox.position.x<=collisionBlock.position.x+collisionBlock.width && 
            this.hitbox.position.x+this.hitbox.width>=collisionBlock.position.x &&
            this.hitbox.position.y+this.hitbox.height>=collisionBlock.position.y &&
            this.hitbox.position.y<=collisionBlock.position.y+collisionBlock.height){
              if(this.velocity.y<0){
                this.velocity.y=0
                const offset=this.hitbox.position.y-this.position.y
                this.position.y=collisionBlock.position.y+collisionBlock.height-offset+0.01
                break
              }
              if (this.velocity.y>0){
                this.velocity.y=0
                const offset=this.hitbox.position.y - this.position.y+this.hitbox.height
                this.position.y=collisionBlock.position.y-offset-0.01
                break
              }  
        }
    }
}
}
