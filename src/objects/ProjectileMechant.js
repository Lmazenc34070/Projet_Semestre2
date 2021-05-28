class ProjectileMechant extends ObjetPhysique{
    constructor(scene, x, y){
       super(scene, x+15, y-20, "projo");
       scene.add.existing(this);
       scene.physics.add.existing(this);
 
       this.body.allowGravity=false;
       this.setDisplaySize(40,2);
       this.setBodySize(this.body.width,this.body.height);
 
       this.setVelocityX(800);
       this.setBounce(1);
       this.setDepth(1000);
       let tir = this;
       scene.physics.add.collider(this, scene.devant, function(){
          tir.destroy();
       });
       scene.physics.add.overlap(
        this,
        scene.player,
        scene.hitLaser,
        null,
        scene
    );
    }
 }