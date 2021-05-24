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
        this.setDisplaySize(65, 100)
        this.setBodySize(this.body.width-6,this.body.height);
        this.setOffset(3, 0);
        this.sens = 1;

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
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_jump', { start: 5, end: 8  }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 0, end: 4  }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 4, end: 7  }),
            frameRate: 5,
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
                this.anims.play(this.sens===-1 ? 'stance' : 'back' ,true); //équivalent d'un if, pour mémoriser la position du personnage pour qu'il regarde à gauche ou à droite en fonction du dernier déplacement effectué
        }
   

        if(this._directionY<0){ //gère la hauteur du saut du perso
            //this.jump();//fonction gérant l'anim de saut

            if(this.body.blocked.down || this.body.touching.down){
                //this.setVelocityY(-500);
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
        var bullet = new Tir(this.scene,this.x, this.y);
        console.log("Tir");
        setTimeout(function(){
            bullet.destroy();
        },1500);
    }

    

}