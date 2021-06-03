
class RobotSuiveur extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "robotSuiveur");
        this.setDisplaySize(130,90);
        this.setBodySize(this.body.width,this.body.height-20);
        this.setOffset(0,0);
        this.dir = 1;
        this.isAlive = true;
        this.body.allowGravity=true;
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setDepth(102);
        
        scene.time.addEvent({ delay: 100, callback: this.mouv, callbackScope: this, loop: true });

        this.anims.create({
            key: 'suiveurLeft',
            frames: this.anims.generateFrameNumbers('suiveur', { start: 3, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'suiveurRight',
            frames: this.anims.generateFrameNumbers('suiveur', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
    }

    

     
    mouv(){
        this.direction();

        if(this.direction>0){
            this.anims.play('suiveurLeft', true);
        }else{
            this.anims.play('suiveurRight', true);
        }

        if(this.isAlive) {
            if (this.scene.player.x > this.x - 300 && this.scene.player.x < this.x + 300 ) {
                this.setVelocityX(150 * this.dir);
                if(this.scene.player.y < this.y){
                    this.setVelocityY(-150);
                }

            }
            else{
                this.setVelocityX(0);
            }
        }
    }

    direction(){
        if (this.x < this.scene.player.x)
        {
            this.dir = 1;
        }
        else if (this.x > this.scene.player.x)
        {
            this.dir = -1;
        }
    }
}
