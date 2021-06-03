class Speed extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "radar");
        this.setDisplaySize(90,60);
        this.setBodySize(this.body.width,this.body.height-10);
        this.setOffset(0,0);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocityX(300);
        // this.setDepth(10);
        this.body.allowGravity=false;
        this.dir=1;
        this.vol=this;

        // X
        // this.originalX=x;
        // this.minX=x-100;
        // this.maxX=x+100;

        // // Y
        // this.originalY=y;
        // this.minY=y-5;
        // this.maxY=y+5;

        this.anims.create({
            key: 'radarLeft',
            frames: this.anims.generateFrameNumbers('radar', { start: 0, end: 6 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'radarRight',
            frames: this.anims.generateFrameNumbers('radar', { start: 7, end: 13 }),
            frameRate: 20,
            repeat: -1
        });
        
    }
    
    Moov(){

        this.direction();

        if(this.vol.dir===1)
        {
            console.log("Caca");
            this.anims.play('radarLeft', true);
        }else if(this.vol.dir===_1){
            this.anims.play('radarRight', true);

        }
    }
    
    // Moov(){
    //     this.direction();

    //     if(this.direction>0){
    //     }
    //     // else{
    //     //     this.anims.play('suiveurRight', true);
    //     // }
    // }

    direction(){
        if (this.vol.body.velocity.x < 0)
        {
            this.dir = -1;
        }
        else if (this.vol.body.velocity.x > 0)
        {
            this.dir = 1;
        }
    }

    

}