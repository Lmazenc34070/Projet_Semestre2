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
        this.load.tilemapTiledJSON('map', 'assets/Tiledmap/LevelTest2V9.json');

        // -----et puis aussi-------------
        this.load.image('monster-fly', 'assets/RobotVole.png');
        this.load.image('PlateformMouv', 'assets/Plat_Sci_Fi1.png');
        this.load.image('tir', 'assets/Tir.png');
        this.load.image('robotSuiveur', 'assets/rootSuiveur.png');
        this.load.image('deoxys', 'assets/RobotVole.png');
        this.load.image('night', 'assets/Back_Sci_fi.png');
        this.load.image('background', 'assets/Back_Sci_fi2.png');

        //atlas de texture généré avec https://free-tex-packer.com/app/
        //on y trouve notre étoiles et une tête de mort
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

        //on définit les collisions, plusieurs méthodes existent:

        this.devant.setCollisionByProperty({ collides: true });

        // 2 manière la plus simple (là où il y a des tiles ça collide et sinon non)
        this.devant.setCollisionByExclusion(-1, true);

        //----------les étoiles (objets) ---------------------

        // c'est un peu plus compliqué, mais ça permet de maîtriser plus de choses...
        this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:1
        });
        //this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        // this.starsObjects.forEach(starObject => {
        //     // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
        //     let star = this.stars.create(starObject.x+32, starObject.y-64, 'star');
        // });

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

        ici.robotMonsterObjects = ici.map.getObjectLayer('robotVole')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.robotMonsterObjects.forEach(monsterObject => {
            let monster=new Speed(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
        });

        ici.robotSuiveurObjects = ici.map.getObjectLayer('robotSuiveur')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.robotSuiveurObjects.forEach(monsterObject => {
            let monster=new RobotSuiveur(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
            this.physics.add.collider(monster, this.Platforms);

        });

        ici.laserObjects = ici.map.getObjectLayer('Laser')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.laserObjects.forEach(laserObject => {
            let laser=new RayonLaser(this,laserObject.x,laserObject.y);
            this.laserContainer.add(laser);
            this.physics.add.collider(laser, this.player);
        });

        ici.laserObjects = ici.map.getObjectLayer('LaserHorizontal')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.laserObjects.forEach(laserObject => {
            let laser=new RayonLaserH(this,laserObject.x,laserObject.y);
            this.laserContainer.add(laser);
            this.physics.add.collider(laser, this.player);
        });

        ici.rebondObjects = ici.map.getObjectLayer('PlatRebond')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.rebondObjects.forEach(rebondObject => {
            let rebond=new PlatRebond(this,rebondObject.x,rebondObject.y);
            this.rebondContainer.add(rebond);
            ici.physics.add.overlap(this.player, rebond,this.Bounding,null,this);
        });

        //----------débug---------------------
            let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }


        //---------- parallax ciel (rien de nouveau) -------------

        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'background'
        );
        this.sky2=this.add.tileSprite(
            0,
            100,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night'
        );
        this.sky.setOrigin(0,0);
        this.sky2.setOrigin(0,0);
        this.sky.setScrollFactor(1);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        // this.sky2.blendMode=Phaser.BlendModes.ADD;

        //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.devant);
        this.physics.add.collider(this.stars, this.devant);

        //si le joueur touche une étoile dans le groupe...
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        
        //quand on touche la lave, on meurt
        this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);
        // if(this.physics.add.overlap(this.monsterObject, this.player.bullet, this.tirOnMonster, null, this)){
        //     console.log("coucou batard")
        // }
        //--------- Z order -----------------------

        //on définit les z à la fin
        let z=1000; //niveau Z qui a chaque fois est décrémenté.
        debug.setDepth(z--);
        // this.boom.setDepth(z--);
        this.monstersContainer.setDepth(z--);
        this.laserContainer.setDepth(z--);
        this.rebondContainer.setDepth(z--);
        this.stars.setDepth(z--);
        //starsFxContainer.setDepth(z--);
        this.Platforms.setDepth(z--);
        this.devant.setDepth(z--);
        //this.solides.setDepth(z--);
        //this.laveFxContainer.setDepth(z--);
        //this.lave.setDepth(z--);
        this.player.setDepth(z--);
        //this.derriere.setDepth(z--);
        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

    }

    /**
     * Permet d'activer, désactiver des éléments en fonction de leur visibilité dans l'écran ou non
     */
    optimizeDisplay(){
        //return;
        let world=this.cameras.main.worldView; // le rectagle de la caméra, (les coordonnées de la zone visible)

    }

    /**
     * Fait se déplacer certains éléments en parallax
     */
    moveParallax(){
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.1;
        // this.sky.tilePositionY=this.cameras.main.scrollY*0.1;
        this.sky2.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.sky2.tilePositionY = this.cameras.main.scrollY * 0.1;
    }


    update(){
        super.update();
        this.moveParallax();

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