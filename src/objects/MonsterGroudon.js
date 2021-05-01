class Groudon extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "groudon");
        this.setDisplaySize(110,110);
        this.setBodySize(this.body.width-50,this.body.height-50);
        this.setOffset(20,30);

    }

}