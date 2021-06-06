class RayonLaser extends ObjetPhysique{
    constructor(scene, x, y){
      super(scene, x, y, "RayonLaser"); 
      this.setDisplaySize(40,38);
      this.setBodySize(this.body.width-10,this.body.height+130);
      this.setOffset(0, 3);
      this.setImmovable(true);
      this.setTint(0xFF0035);
      this.body.allowGravity=false;
      this.isEnable=false;
      this.here=scene;
      
      this.anims.create({
      key: 'moov',
      frames: this.anims.generateFrameNumbers('Laser', { start: 0, end: 4 }),
      frameRate: 20,
      repeat: -1
      });

      this.anims.create({
      key: 'fix',
      frames: [ { key: 'Laser', frame: 5 } ], 
      });

      this.anims.play('fix', true);
      let f = this;
      scene.physics.add.overlap(
         this,
         scene.player,
         function(){f.hitLaser()},
         null,
         scene
      );
   }
   
   setEnable(){
      this.isEnable=true;
   }

   hitLaser(){
      let s = this.here;
      if(this.isEnable){
         if(!this.here.player.isDead){
            this.here.player.isDead=true;
            this.here.player.visible=false;
            this.here.musicamb.stop();

            this.here.saigne(this.here.player,function(){
               s.player.isDead=false;
               s.scene.restart();
            })
         }
      }
   }

   change(){
      if(this.isEnable){
         this.isEnable=false;
      }
      else{
         this.isEnable=true;
      }
   }

   update(){
      if(this.isEnable){
         this.anims.play('moov', true);
      }else{
         this.anims.play('fix', true);
      }
   }
}