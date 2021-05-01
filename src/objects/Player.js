class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2);
        this.setGravityY(700)
        this.setFriction(1,1);
        this.scale=1.5;
        this.setDisplaySize(55, 80)
        this.setBodySize(this.body.width-6,this.body.height);
        this.setOffset(3, 0);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
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

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        switch (true){
            case this._directionX<0:
                this.setVelocityX(-200);
                this.anims.play('left', true);
                break;
            case this._directionX>0:

                this.setVelocityX(200);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-550);
            }
        }
        if(this.body.velocity.y>700){
            this.setVelocityY(550); 
        }

    }


}