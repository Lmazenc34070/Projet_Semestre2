/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('pipou', 'assets/Back_Sci_fi4.png');
        // this.load.image('spike', 'assets/spike.png');
        this.load.image('boom', 'assets/Boom.png');
        this.load.audio('mobDeath', 'assets/cri.ogg');
        // this.load.audio('getItem', 'assets/poire.ogg');
        // this.load.audio('back', 'assets/SongGame.ogg');
        this.load.spritesheet('player',
            'assets/RunPerso.png',
            { frameWidth: 191, frameHeight: 219  }
        );
        this.load.spritesheet('Laser',
            'assets/laser_spriteSheet.png',
            { frameWidth: 24, frameHeight: 167  }
        );
        this.load.spritesheet('Rebond',
            'assets/rebond_spriteSheet1.png',
            { frameWidth: 155, frameHeight: 61  }
        );
        this.load.spritesheet('LaserH',
            'assets/laser_spriteSheet.png',
            { frameWidth: 24, frameHeight: 167  }
        );
        this.load.spritesheet('suiveur',
            'assets/suiveur_SpriteSheet.png',
            { frameWidth: 333, frameHeight: 238  }
        );
        this.load.spritesheet('jumpPerso',
            'assets/jump-SpriteSheet.png',
            { frameWidth: 150, frameHeight: 219  }
        );
        this.load.spritesheet('radar',
            'assets/Sprite-Vol.png',
            { frameWidth: 120, frameHeight: 58  }
        );
    }
    create(){
        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        this.sound.add('mobDeath');
        // this.sound.add('getItem');
        // this.mood = this.sound.add('back')
        // this.mood.play();
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.pipou=this.add.image(0, 0, 'pipou').setOrigin(0,0);
        this.pipou.displayWidth=14*64;
        this.pipou.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,300,1934);//356,00, 1934,00
        this.boom=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"boom")
        this.boom.displayWidth=64;
        this.boom.displayHeight=64;
        this.boom.visible=false;
        this.boom.setDepth(9);

        this.boutonTir = this.input.keyboard.addKey('A');
    }
    update(){
        super.update();
        this.player.move();
        this.tirPlayer();
    }

    Bounding (player, rebond)
    {   
        if(rebond.body.touching.up){
            player.setVelocityY(-850)
        };
    }

    tirPlayer(){
        if (Phaser.Input.Keyboard.JustDown(this.boutonTir)){
            this.player.shoot();
        }
    }
    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);
        ui.gagne();

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                    this.sound.play('getItem', {volume : 0.2});
                }
            }
        }
        if(totalActive===0){
            this.win();
        }
        /*
        // this.stars est un groupe (plus tard)
        if (this.stars.countActive(true) === 0)
        {
           this.win();
        }
         */
    }

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hitSpike (player, spike)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.restart();

    }
    
    saigne(object,onComplete){
        let me=this;
        me.boom.visible=true;
        me.boom.rotation = Phaser.Math.Between(0,6);
        me.boom.x=object.x;
        me.boom.y=object.y;
        me.tweens.add({
            targets:me.boom,
            duration:200,
            displayHeight:{
                from:40,
                to:70,
            },
            displayWidth:{
                from:40,
                to:70,
            },
            onComplete: function () {
                me.boom.visible=false;
                onComplete();
            }
        })
    }

    /**

     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster){
        let me=this;
        if(monster.isDead !== true){ //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                ui.gagne();
                monster.isDead=true; //ok le monstre est mort
                monster.visible=false;
                this.sound.play('mobDeath');
                this.saigne(monster,function(){
                    //à la fin de la petite anim...ben il se passe rien :)
                })
                //notre joueur rebondit sur le monstre
                // player.directionY=500;
            }else{
                //le joueur est mort
                if(!me.player.isDead){
                    // this.mood.stop();
                    me.player.isDead=true;
                    me.player.visible=false;

                    //ça saigne...
                    me.saigne(me.player,function(){
                        //à la fin de la petite anim, on relance le jeu
                        me.boom.visible=false;
                        // me.player.anims.play('turn');
                        me.player.isDead=false;
                        me.scene.restart();
                    })

                }


            }
        }

    }



    
    

    

    /**
=======
>>>>>>> parent of 90a774d (son in game)
=======
>>>>>>> parent of 90a774d (son in game)
=======
>>>>>>> parent of 90a774d (son in game)
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
        Tableau.suivant();
        // this.mood.stop();
    }

    /**
     * Va au tableau suivant
     */
    static suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau){
        if(Tableau.current){
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;