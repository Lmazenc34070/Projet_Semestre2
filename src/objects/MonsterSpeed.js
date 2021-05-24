class Speed extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "deoxys");
        this.setDisplaySize(90,60);
        this.setBodySize(this.body.width,this.body.height-10);
        this.setOffset(0,0);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocityX(300);
        // this.setDepth(10);
        this.body.allowGravity=false;

        // X
        this.originalX=x;
        this.minX=x-200;
        this.maxX=x+200;

        // Y
        this.originalY=y;
        this.minY=y-5;
        this.maxY=y+5;
    }

    

}