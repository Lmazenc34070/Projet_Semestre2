class Speed extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "deoxys");
        this.setDisplaySize(72,90);
        this.setBodySize(this.body.width-20,this.body.height-20);
        this.setOffset(10, 10);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocityX(300);
        this.setDepth(10);
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