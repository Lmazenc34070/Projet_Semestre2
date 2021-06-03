
class RobotTir extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "robotTir");
        this.setDisplaySize(130,190);
        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0,0);
        this.dir = 1;
        this.isAlive = true;

        this.body.allowGravity=true;
        //this.setBodySize(this.body.width,this.body.height);
        //this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(0);

        this.setDepth(102);
        scene.time.addEvent({ delay: 1000, callback: this.tirMechant, callbackScope: this, loop: true });

        
    }

    

     
    tirMechant(){

        this.direction();

        if(this.isAlive) {
            if (this.scene.player.x > this.x - 500 && this.scene.player.x < this.x + 500) {
                if(this.scene.player.y>this.y){
                    this.tir = new ProjectileMechant(this.scene, this.x, this.y + 35, 'tir').setVelocityX(400 * this.dir);
                }

                else if(this.scene.player.y<this.y){
                     this.tir = new ProjectileMechant(this.scene, this.x, this.y + 30, 'tir').setVelocity(400 * this.dir, -150);
                }

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
