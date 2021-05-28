class Star extends ObjetPhysique{
    constructor(scene, x, y){
       super(scene, x, y, "star");
       scene.add.existing(this);
       scene.physics.add.existing(this);
 
       this.body.allowGravity=true;
    //    this.setImmovable= false;
       this.setBounceY(0);

    }
 }