class Slow extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "Chrysacier");
        this.setDisplaySize(60,60);
        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0, 0);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocityX(10);

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