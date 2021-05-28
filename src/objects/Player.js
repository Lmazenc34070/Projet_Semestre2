class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0);
        this.setGravityY(700)
        this.setFriction(1,1);
        this.scale=1.5;
        this.setDisplaySize(75, 125)
        this.setBodySize(this.body.width-20,this.body.height);
        this.setOffset(3, 0);
        this.sens = 1;
        this.rechargeSonTir = false; //bool pour le rechargement

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
            frameRate: 11,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 11, end: 21 }),
            frameRate: 11,
            repeat: -1
        });

        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0  }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('player', { start: 21, end: 21  }),
            frameRate: 3,
            repeat: -1
        });

        this._directionX=0;
        this._directionY=0;

    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    // jump(){
    //     //this.anims.play('jump', true);
    // }

    move(){
        switch (true){
            case this._directionX<0:
                this.sens=-1;
                this.setVelocityX(-600);
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.sens=1;
                this.setVelocityX(600);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('stance', true);
                this.anims.play(this.sens===-1 ? 'stance' : 'back' ,true);
        }
   

        if(this._directionY<0){

            if(this.body.blocked.down){
                this.scene.tweens.add({
                    targets: this,
                    y: '-=140',
                    ease: 'Power2',
                    duration: 400,
                })
                this.body.setVelocityY(10);
            }
        }
    }

    shoot()
    {
        

        if(this.rechargeSonTir === false) { //on vérifie si on a recharger le coup
            
            this.rechargeSonTir = true; //lance la recharge
            var bullet = new Tir(this.scene,this.x, this.y);
            console.log("Tir");
            setTimeout(function(){
                bullet.destroy();
            },1500);
            setTimeout(function () {
                Tableau.current.player.rechargeSonTir = false;
            }, 900);
        }
    }

    

    

    

}