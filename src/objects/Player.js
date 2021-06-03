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
        this.setBodySize(this.body.width-20,this.body.height-15);
        this.setOffset(0,10);
        // this.setOffset(3, 0);
        this.sens = 1;
        this.rechargeSonTir = false;
        this.jumped = false;


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

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'jumpPerso', frame: 0 }],
            frameRate: 4
        });
        
        this.anims.create({
            key: 'jumpback',
            frames: [{ key: 'jumpPerso', frame: 1 }],
            frameRate: 4
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

    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    move(){
        // switch (true){
        //     case this._directionX<0:
        //         this.sens=-1;
        //         this.setVelocityX(-450);
        //         this.anims.play('left', true);
        //         break;
        //     case this._directionX>0:
        //         this.sens=1;
        //         this.setVelocityX(450);
        //         this.anims.play('right', true);
        //         break;
        //     default:
        //         this.setVelocityX(0);
        //         this.anims.play('stance', true);
        //         this.anims.play(this.sens===-1 ? 'stance' : 'back' ,true);
        // }
        if (this._directionX < 0) {
            this.sens = -1;
            this.setVelocityX(-450);
            this.anims.play('left', true);
        }
        else if (this._directionX > 0) {
            this.sens = 1;
            this.setVelocityX(450);
            this.anims.play('right', true);
        }

        else {
            this.setVelocityX(0);
            this.anims.play('stance', true);
            this.anims.play(this.sens === -1 ? 'stance' : 'back', true);
        }
        
        if (this._directionY < 0) {
            if (this.jumped == false) {
                this.jumped = true;

            }
            if (this.body.blocked.down) {
                this.setVelocityY(-450);
                this.jumped = false;

            }
            else {
                if (this.sens == -1) {
                    this.anims.play('jumpback', true);
                }
                else { this.anims.play('jump', true); }
            }
        }
        else {
            if (this.body.blocked.down) {
                this.jumped = false;
            }
            else {
                
                if (this.sens == -1) {
                    this.anims.play('jumpback', true);
                }
                else { this.anims.play('jump', true); }
            }
        }
        // if (!this.body.blocked.down && this.jumped === false) {
        //     this.setVelocityY(500);
        // }

        // if(this._directionY<0){
        //     if(this.body.blocked.down){
        //     Tableau.current.tweens.timeline({
        //         targets: Tableau.current.player.body.velocity,
        //         ease: 'Linear.easeinOut',//'Power2.easeInOut',
        //         duration: 120,
        //         loop: 0,
        //         tweens: [
        //             {
        //                 targets: Tableau.current.player.body.velocity,
        //                 y: -850
        //             },
        //             {
        //                 targets: Tableau.current.player.body.velocity,
        //                 y: 0
        //             }
        //         ]
        //     });
        //     }
        // }
    }

    shoot()
    {
        

        if(this.rechargeSonTir === false) {
            this.rechargeSonTir = true;
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