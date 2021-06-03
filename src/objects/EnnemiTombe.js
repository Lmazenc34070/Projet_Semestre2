
class EnnemiTombe extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "ennemiTombe");
        this.setDisplaySize(130,90);
        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0,0);
        this.isAlive = true;
        this.body.allowGravity=false;
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setDepth(102);
        this.setVelocityX(200);
        this.here = scene;
        this.mob = this;
        scene.time.addEvent({ delay: 100, callback: this.mouv, callbackScope: this, loop: true });

        // this.anims.create({
        //     key: 'suiveurLeft',
        //     frames: this.anims.generateFrameNumbers('suiveur', { start: 3, end: 5 }),
        //     frameRate: 5,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'suiveurRight',
        //     frames: this.anims.generateFrameNumbers('suiveur', { start: 0, end: 2 }),
        //     frameRate: 5,
        //     repeat: -1
        // });
    }

    

     
    mouv(){
        this.direction();

        if(this.isAlive) {
            if (this.scene.player.y > this.mob.y ) {
                //console.log("Bébou");
                if(Math.abs(this.scene.player.x - this.mob.x) < 40){
                    this.mob.setVelocity(0, 200);    
                }
                if(Math.abs(this.mob.y - 1732) < 20 && this.mob.body.velocity.y<0){
                    this.mob.setVelocity(200*this.here.player.sens,0);
                }
                
            }
        }
    }

    direction(){
        if (this.mob.body.velocity.x < 0)
        {
            this.dir = -1;
        }
        else if (this.mob.body.velocity.x > 0)
        {
            this.dir = 1;
        }
    }
}
