class RayonLaser extends ObjetPhysique{
    constructor(scene, x, y){
       super(scene, x, y, "RayonLaser"); 
       this.setDisplaySize(40,38);
       this.setBodySize(this.body.width-10,this.body.height+130);
       this.setOffset(0, 3);
       this.setBounce(0);
       this.setCollideWorldBounds(true);
       this.setImmovable(true);
       this.setTint(0xFF0035);
       // this.setVelocityX(50);
       // this.setDepth(10);
       this.body.allowGravity=false;

        
    this.anims.create({
       key: 'moov',
       frames: this.anims.generateFrameNumbers('Laser', { start: 0, end: 4 }),
       frameRate: 20,
       repeat: -1
    });

    this.anims.play('moov', true);
    scene.physics.add.overlap(
      this,
      scene.player,
      scene.hitLaser,
      null,
      scene
  );
    }
    
    
 }