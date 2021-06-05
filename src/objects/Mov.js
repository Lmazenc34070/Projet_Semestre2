class Move extends ObjetPhysique{
    constructor(scene, x, y){
       super(scene, x, y, "Move"); 
        this.setImmovable(true)
        this.setVelocity(100, -100)
        // this.setBodySize(64,31)
        // this.setOffset(0,15);
        this.body.allowGravity=false;
        scene.tweens.timeline({
            targets: this.body.velocity,
            loop: -1,
            yoyo: true,
            tweens: [
                { x:    0, y: 170, duration: 1000, ease: 'Stepped' },
                { x:    0, y: -195, duration: 1000, ease: 'Stepped' },
            ]
        });
    }

    start(){
        this.scene.tweens.timeline({
            targets: this,
        });
    }
    
}
