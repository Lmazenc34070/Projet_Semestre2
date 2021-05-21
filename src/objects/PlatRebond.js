class PlatRebond extends ObjetPhysique{
    constructor(scene, x, y){
       super(scene, x, y, "Rebond"); 
       this.setDisplaySize(190,100);
       this.setBodySize(this.body.width,this.body.height-45);
       this.setOffset(0, 45);
       this.setBounce(0);
      //  this.setCollideWorldBounds(true);
       this.setImmovable(true);
       // this.setVelocityX(50);
       // this.setDepth(10);
       this.body.allowGravity=false;
     //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        
        
    this.anims.create({
       key: 'spoing',
       frames: this.anims.generateFrameNumbers('Rebond', { start: 0, end: 2 }),
       frameRate: 5,
       repeat: -1
    });

    this.anims.play('spoing', true);

    }
 }