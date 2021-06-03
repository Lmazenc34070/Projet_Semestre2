class Tir extends ObjetPhysique{
   constructor(scene, x, y){
      super(scene, x+15, y-20, "tir");
      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.body.allowGravity=false;
      this.setDisplaySize(40,2);
      this.setBodySize(this.body.width,this.body.height);

      this.setVelocityX(800 * scene.player.sens);
      this.setBounce(1);
      this.setDepth(1000);
      let tir = this;
      scene.physics.add.collider(this, scene.devant, function(){
         tir.destroy()
      });
      scene.monstersContainer.iterate(monster=>{
         scene.physics.add.overlap(this, monster, function(){
            monster.Tmortlol();
            tir.destroy()
         }, null, scene);
      })
      scene.laserContainer.iterate(laser=>{
         scene.physics.add.overlap(this, laser, function(){
            if(laser.isEnable){
               tir.destroy()
            }
         }, null, scene);
      })
      scene.rebondContainer.iterate(rebond=>{
         scene.physics.add.overlap(this, rebond, function(){
            tir.destroy()
         }, null, scene);
      })
   }
}