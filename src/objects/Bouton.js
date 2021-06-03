class Bouton extends ObjetPhysique{
   constructor(scene, x, y){
      super(scene, x, y-14, "bouton");
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.allowGravity=false;
      this.setDisplaySize(180,30);
      this.setImmovable(true);
      this.setBodySize(this.body.width,this.body.height);
      this.setDepth(1000);
      this.oui = false;
      scene.physics.add.collider(this, scene.devant);
      scene.physics.add.collider(this, scene.player);
      this.ici = scene;
      // this.setTint(0xFF0035);
   }

   update()
   {
      if(this.body.touching.up && !this.oui){
         this.oui = true;
         this.ici.laserContainer.iterate(laser=>{
            laser.change();
         })
      }
      else if(this.body.touching.up && this.oui){
         this.oui = true;
         
      }
      else{
         this.oui = false;
      }
   }









}