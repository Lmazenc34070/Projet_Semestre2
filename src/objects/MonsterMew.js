class Mew extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "mew");
        this.setDisplaySize(80,80);
        this.setBodySize(this.body.width-50,this.body.height-50);
        this.setOffset(0, 0);
        this.setBounce(0);
        this.setVelocityX(-100);
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