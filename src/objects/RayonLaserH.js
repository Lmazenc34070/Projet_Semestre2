class RayonLaserH extends ObjetEnnemi{
    constructor(scene, x, y){
       super(scene, x+43, y-15, "RayonLaserH"); 
      this.setDisplaySize(27,40);
      this.setBodySize(this.body.width+200,this.body.height-10);
       this.setOffset(0, 3);
       this.setBounce(0);
       this.setCollideWorldBounds(true);
       this.setImmovable(true);
       // this.setVelocityX(50);
       // this.setDepth(10);
       this.body.allowGravity=false;
     //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);


     // X
    //  this.originalX=x;
    //  this.minX=x-200;
    //  this.maxX=x+200;

    //  // Y
    //  this.originalY=y;
    //  this.minY=y-5;
    //  this.maxY=y+5;
    //  // on applique les propriétés du début de l'animation
    //  this.x=this.minX;
    //  this.y=this.minY;
    //  this.alpha=1;
     //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
     //ceci a pour effet de décaler les animations pour ce même objet
        
        
    this.anims.create({
       key: 'moov1',
       frames: this.anims.generateFrameNumbers('LaserH', { start: 0, end: 3 }),
       frameRate: 20,
       repeat: -1
    });

    this.anims.play('moov1', true);
    }
 }