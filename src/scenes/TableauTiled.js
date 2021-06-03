class TableauTiled extends Tableau{
    /**
     * Ce tableau démontre comment se servir de Tiled, un petit logiciel qui permet de designer des levels et de les importer dans Phaser (entre autre).
     *
     * Ce qui suit est très fortement inspiré de ce tuto :
     * https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
     *
     * Je vous conseille aussi ce tuto qui propose quelques alternatives (la manière dont son découpées certaines maisons notamment) :
     * https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
     */
    preload() {
        super.preload();
        // ------pour TILED-------------
        // nos images
        this.load.image('tiles', 'assets/Tiledmap/TileSheet2.png');
        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/Tiledmap/LevelTest2V10.json');

        // -----et puis aussi-------------
        this.load.image('monster-fly', 'assets/RobotVole.png');
        this.load.image('PlateformMouv', 'assets/Plat_Sci_Fi1.png');
        this.load.image('tir', 'assets/Tir.png');
        this.load.image('robotSuiveur', 'assets/rootSuiveur.png');
        this.load.image('robotTir', 'assets/Boom.png');
        this.load.image('projo', 'assets/RobotVole.png');
        this.load.image('bouton', 'assets/bouton.png');
        this.load.image('ennemiTombe', 'assets/Boom.png');

        this.load.image('night', 'assets/Back_Sci_fi.png');
        this.load.image('star', 'assets/Boom.png');

        this.load.image('background', 'assets/Back_Sci_fi4.png');
    }
    create() {
        super.create();

        //on en aura besoin...
        let ici=this;

        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('TileSheet2', 'tiles');
        

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //---- ajoute les plateformes simples ----------------------------

        this.devant = this.map.createLayer('Devant', this.tileset, 0, 0);
        this.decor = this.map.createLayer('decor', this.tileset, 0, 0);
        this.decorArr = this.map.createLayer('decor_arriere', this.tileset, 0, 0);

        this.obstacle=this.map.createLayer('Obstacle', this/this.tileset, 0, 0);


        //on définit les collisions, plusieurs méthodes existent:

        this.devant.setCollisionByProperty({ collides: true });

        // 2 manière la plus simple (là où il y a des tiles ça collide et sinon non)
        this.devant.setCollisionByExclusion(-1, true);
        this.obstacle.setCollisionByExclusion(-1, true);


        this.Platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0,
            bounceX:0,
        });

        this.PlatformsObjects = this.map.getObjectLayer('PlatMouv')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.PlatformsObjects.forEach(PlatformsObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let Platforms = this.Platforms.create(PlatformsObject.x+32, PlatformsObject.y+16 /*, 'particles'*/, 'PlateformMouv');
        });
        //this.physics.add.collider(this.Platforms, this.player);

        //this.physics.add.collider(this.Platforms, this.player);
        this.physics.add.collider(this.Platforms, this.player, function () {
        });

        this.monstersContainer=this.add.container();
        this.laserContainer=this.add.container();
        this.rebondContainer=this.add.container();
        this.starContainer=this.add.container();
        this.boutonContainer=this.add.container();

        ici.robotMonsterObjects = ici.map.getObjectLayer('robotVole')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.robotMonsterObjects.forEach(monsterObject => {
            let monster=new Speed(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
            this.physics.add.collider(monster, this.obstacle);
        });

        ici.robotMonsterObjects = ici.map.getObjectLayer('robotTir')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.robotMonsterObjects.forEach(monsterObject => {
            let monster=new RobotTir(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
        });
        ici.robotMonsterObjects = ici.map.getObjectLayer('TestEnnemi')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.robotMonsterObjects.forEach(monsterObject => {
            let monster=new EnnemiTombe(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
        });

        ici.starObjects = ici.map.getObjectLayer('star')['objects'];
        ici.starObjects.forEach(starObject => {
            let star=new Star(this,starObject.x,starObject.y);
            this.starContainer.add(star);
            this.physics.add.collider(star, this.devant);
            this.physics.add.overlap(star, this.player, this.ramasserEtoile, null, this);
        });

        ici.robotSuiveurObjects = ici.map.getObjectLayer('robotSuiveur')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.robotSuiveurObjects.forEach(monsterObject => {
            let monster=new RobotSuiveur(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
            this.physics.add.collider(monster, this.Platforms);
        });

        ici.laserObjects = ici.map.getObjectLayer('LaserHorizontal')['objects'];
        ici.laserObjects.forEach(laserObject => {
            let laser=new RayonLaser(this,laserObject.x,laserObject.y);
            if(laserObject.properties[0].value === 1){
                laser.setTint(0xFFDD33);
                laser.setEnable();
            }
            if(laserObject.properties[0].value === 3){
                laser.setTint(0xFFDD33);
                laser.setAngle(90);
                laser.setBodySize(laser.body.width+130,laser.body.height-140);
                laser.setEnable();
            }
            if(laserObject.properties[0].value === 4){
                laser.setTint(0xFFDD33);
                laser.setAngle(90);
                laser.setDisplaySize(30, 130);
                laser.setBodySize(laser.body.width+75,laser.body.height-140);
                laser.setEnable();
            }
            if(laserObject.properties[0].value === 5){
                laser.setTint(0xFFDD33);
                laser.setAngle(90);
                laser.setDisplaySize(30, 215);
                laser.setBodySize(laser.body.width+75,laser.body.height-140);
                laser.setEnable();
            }
            if(laserObject.properties[0].value === 6){
                laser.setDisplaySize(30, 215);
                laser.setAngle(90);
                laser.setBodySize(laser.body.width+130,laser.body.height-140);
            }
            this.laserContainer.add(laser);
        });

        ici.boutonObjects = ici.map.getObjectLayer('Bouton')['objects'];
        ici.boutonObjects.forEach(boutonObject => {
            let bouton=new Bouton(this,boutonObject.x,boutonObject.y);
            this.boutonContainer.add(bouton);
            this.physics.add.collider(bouton, this.player);
        });

        ici.rebondObjects = ici.map.getObjectLayer('PlatRebond')['objects'];
        ici.rebondObjects.forEach(rebondObject => {
            let rebond=new PlatRebond(this,rebondObject.x,rebondObject.y);
            this.rebondContainer.add(rebond);
            // if(this.player.body.velocity.y > 0||this.player.getBounds().bottom < rebond.getBounds().top+30){
                ici.physics.add.collider(this.player, rebond,this.Bounding,null,this);
            // }    
        });

        //----------débug---------------------
            let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }


        //---------- parallax ciel (rien de nouveau) -------------

        // this.sky=this.add.tileSprite(
        //     0,
        //     0,
        //     this.sys.canvas.width,
        //     this.sys.canvas.height,
        //     'background'
        // );
        // this.sky2=this.add.tileSprite(
        //     0,
        //     100,
        //     this.sys.canvas.width,
        //     this.sys.canvas.height,
        //     'night'
        // );
        // // this.sky.setOrigin(0,0);
        // this.sky2.setOrigin(0,0);
        // // this.sky.setScrollFactor(1);
        // this.sky2.setScrollFactor(0);

        //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.devant);

        //--------- Z order -----------------------

        let z=1000; //niveau Z qui a chaque fois est décrémenté.
        debug.setDepth(z--);
        this.monstersContainer.setDepth(z--);
        this.boutonContainer.setDepth(z--);
        this.laserContainer.setDepth(z--);
        this.rebondContainer.setDepth(z--);
        this.starContainer.setDepth(z--);
        this.Platforms.setDepth(z--);
        this.devant.setDepth(z--);
        this.player.setDepth(z--);
        this.decor.setDepth(z--);
        this.decorArr.setDepth(z--);
        // this.sky2.setDepth(z--);
        // this.sky.setDepth(z--);

    }

    optimizeDisplay(){
        let world=this.cameras.main.worldView;

    }

    moveParallax(){
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        // this.sky.tilePositionX=this.cameras.main.scrollX*0.1;
        // this.sky.tilePositionY=this.cameras.main.scrollY*0.1;
        // this.sky2.tilePositionX = this.cameras.main.scrollX * 0.15;
        // this.sky2.tilePositionY = this.cameras.main.scrollY * 0.05;
    }


    update(){
        super.update();
        this.moveParallax();
        this.laserContainer.each(function (child) {child.update();});
        this.boutonContainer.each(function (child) {child.update();});
        //optimisation
        //teste si la caméra a bougé
        let actualPosition=JSON.stringify(this.cameras.main.worldView);
        if(
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ){
            this.previousPosition=actualPosition;
            this.optimizeDisplay();
        }
    }

    

    




}