class Bouton extends ObjetPhysique{
    constructor(scene, x, y){
       super(scene, x, y-20, "bouton");
       scene.add.existing(this);
       scene.physics.add.existing(this);
 
       this.body.allowGravity=false;
       this.setDisplaySize(30,10);
       this.setBodySize(this.body.width,this.body.height);
 
       this.setVelocityX(450 * scene.player.sens);
       this.setBounce(0);
       this.setDepth(1000);
       let tir = this;
       scene.physics.add.collider(this, scene.devant, function(){
          tir.destroy()
       });
    }
 }