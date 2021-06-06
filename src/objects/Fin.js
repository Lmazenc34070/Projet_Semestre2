class Fin extends ObjetEnnemi{
    /**
    *
    * @param {Tableau} scene
    * @param x
    * @param y
    */
    constructor(scene, x, y) {
      super(scene, x, y,"fin");
      //pas de gravité
      this.dir = 1;
      this.isAlive = true;
      this.dieOnce = false;
      this.world = scene;
      this.body.allowGravity=true;
      this.isMoving = false;
      this.vie=1;
      this.scale = 1;
      this.setCollideWorldBounds(true);
      this.setBounceX(1);
      this.setOffset(-15,0)
      this.setBodySize(this.body.width/2,this.body.height);
      scene.time.addEvent({ delay: 1000, callback: this.move, callbackScope: this, loop: true });
      this.move = true;
  
      this.anims.create({
        key: 'move',
        frames: this.anims.generateFrameNumbers('fin', { start: 0, end: 3 }),
        frameRate: 10,
      });
    
    //   this.on('animationcomplete',function () {
    //     if(this.anims.currentAnim.key === 'move'){
    //       scene.endFadeOut();
    //     }
    //   });
  
  
  
    }
    move(){
      if(this.isAlive) {
        this.pos();
        if (this.scene.player.x > this.x - 300 && this.scene.player.x < this.x + 300  &&  this.scene.player.y > this.y - 150 && this.scene.player.y < this.y + 150 ) {

          if(!this.isMoving){
            this.world.player.controlLocked = true;
            this.isMoving = true;
            this.isAlive = false;
            this.flipX =false;
            this.anims.play('move', true);
            this.world.player.anims.play('stand', true);
          }
      }
      else{
        this.flipX = true;
        this.setVelocityX(0);
        // this.anims.play('stand',true);
      }
    }
  
  
  }
  moinsvie(){
    if(this.vie>0){
      this.vie--;
      if(this.vie===0){
        this.Tmortlol();
      }
    }
  }
  
  checkSide(isMoving){
    if(this.dir>0){
      this.flipX =true;
    }else{
      this.flipX =false;
    }
    if(isMoving){this.anims.play('move', true);}/*else{this.anims.play('stand', true);}*/
  }
  
  pos(){
    if (this.x < this.scene.player.x)
    {
      this.dir = 1;
    }
    else if (this.x > this.scene.player.x)
    {
      this.dir = -1;
    }
  }
  
  /*update()
  {
  this.move();
  }*/
  
  
  stop()
  {
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.directionY=0;
    this.directionX=0;
  }
  }