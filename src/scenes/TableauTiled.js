class TableauTiled extends Tableau{
    preload() {
        super.preload();
        this.load.image('tiles', 'assets/Tiledmap/TileSheet2.png');
        this.load.tilemapTiledJSON('map', 'assets/Tiledmap/LevelTest2V10.json');

        // -----Preload-------------
        this.load.image('monster-fly', 'assets/RobotVole.png');
        this.load.image('PlateformMouv', 'assets/Plat_Sci_Fi1.png');
        this.load.image('Move', 'assets/Plat_Sci_Fi1.png');

        this.load.image('tir', 'assets/Tir.png');
        this.load.image('robotSuiveur', 'assets/rootSuiveur.png');
        this.load.image('robotTir', 'assets/Boom.png');
        this.load.image('projo', 'assets/RobotVole.png');
        this.load.image('bouton', 'assets/bouton.png');
        this.load.image('ennemiTombe', 'assets/Boom.png');
        this.load.image('particD', 'assets/Brume1.png');
        this.load.image('particG', 'assets/Brume1.png');

        this.load.image('night', 'assets/Back_Sci_fi.png');
        this.load.image('star', 'assets/Boom.png');
        this.load.image('fog', 'assets/Brume1.png')
        this.load.image('background', 'assets/Back_Sci_fi4.png');
        this.load.image('pixel', 'assets/pixel.png');
        this.load.audio('ambiance','assets/Sounds/E_Resurrection.mp3');
    }
    create() {
        super.create();

        let ici=this;

        this.musicamb = this.sound.add('ambiance');
        var musicConfig =
            {
                mute: false,
                volume: 0.2,
                rate : 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay:0,
            }
        this.musicamb.play(musicConfig);

        var part = this.add.particles('particD');

        var emmiterPlayerD = part.createEmitter({
            frequency: 50,
            lifespan: 500,
            quantity: 1,
            angle: { min: -20, max: 10 },
            speed: 2,
            scale: { start: 0.8, end: 0.03 },
            alpha: { start: 1, end: 0.3},
            blendMode: 'ADD',
        });

        var part2 = this.add.particles('particG');

        var emmiterPlayerG = part2.createEmitter({
            frequency: 50,
            lifespan: 500,
            quantity: 1,
            angle: { min: -20, max: 10 },
            speed: 2,
            scale: { start: 0.8, end: 0.03 },
            alpha: { start: 1, end: 0.3},
            blendMode: 'ADD',
        });

        this.player.on(MyEvents.COURD, function(){
            emmiterPlayerD.startFollow(ici.player);
            emmiterPlayerD.setLifespan(300);
            emmiterPlayerD.setAlpha({ start: 0.05, end: 0.00001});

            ici.player.isEsc = false;
        });

        this.player.on(MyEvents.COURG, function(){
            emmiterPlayerG.startFollow(ici.player);
            emmiterPlayerG.setLifespan(300);
            emmiterPlayerG.setAlpha({ start: 0.05, end: 0.00001});

            ici.player.isEsc = false;
        });

        this.player.on(MyEvents.STOP, function(){
            setTimeout(function(){
                emmiterPlayerD.setLifespan(0);
                emmiterPlayerD.setAlpha(0);

                emmiterPlayerG.setLifespan(0);
                emmiterPlayerG.setAlpha(0);

                ici.player.isEsc = false;
                },1);
        });

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('TileSheet2', 'tiles');
        
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        this.devant = this.map.createLayer('Devant', this.tileset, 0, 0);
        this.decor = this.map.createLayer('decor', this.tileset, 0, 0);
        this.decorArr = this.map.createLayer('decor_arriere', this.tileset, 0, 0);

        this.obstacle=this.map.createLayer('Obstacle', this/this.tileset, 0, 0);

        this.devant.setCollisionByProperty({ collides: true });

        this.devant.setCollisionByExclusion(-1, true);
        this.obstacle.setCollisionByExclusion(-1, true);

        this.Platforms = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0,
            bounceX:0,
        });

        this.PlatformsObjects = this.map.getObjectLayer('PlatMouv')['objects'];
        this.PlatformsObjects.forEach(PlatformsObject => {
            let Platforms = this.Platforms.create(PlatformsObject.x+32, PlatformsObject.y+16 /*, 'particles'*/, 'PlateformMouv');
        });

        this.physics.add.collider(this.Platforms, this.player, function () {
        });

        this.monstersContainer=this.add.container();
        this.laserContainer=this.add.container();
        this.rebondContainer=this.add.container();
        this.starContainer=this.add.container();
        this.boutonContainer=this.add.container();
        this.plightContainer=this.add.container();
        this.movContainer=this.add.container();
        this.starsFxContainer=this.add.container();


        ici.robotMonsterObjects = ici.map.getObjectLayer('robotVole')['objects'];
        ici.robotMonsterObjects.forEach(monsterObject => {
            let monster=new Speed(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
            this.physics.add.collider(monster, this.obstacle);
        });

        ici.robotMonsterObjects = ici.map.getObjectLayer('robotTir')['objects'];
        ici.robotMonsterObjects.forEach(monsterObject => {
            let monster=new RobotTir(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.devant);
        });
        ici.robotMonsterObjects = ici.map.getObjectLayer('TestEnnemi')['objects'];
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
                laser.setAngle(90);
                laser.setDisplaySize(30, 130);
                laser.setBodySize(laser.body.width+75,laser.body.height-140);
            }
            if(laserObject.properties[0].value === 5){
                laser.setAngle(90);
                laser.setDisplaySize(30, 215);
                laser.setBodySize(laser.body.width+75,laser.body.height-140);
            }
            if(laserObject.properties[0].value === 6){
                laser.setDisplaySize(30, 215);
                laser.setAngle(90);
                laser.setBodySize(laser.body.width+130,laser.body.height-140);
            }
            if(laserObject.properties[0].value === 7){
                laser.setAngle(90);
                laser.setBodySize(laser.body.width+130,laser.body.height-140);
            }
            if(laserObject.properties[0].value === 8){
                laser.setTint(0xFFDD33);
            }
            this.laserContainer.add(laser);
        });

        ici.boutonObjects = ici.map.getObjectLayer('Bouton')['objects'];
        ici.boutonObjects.forEach(boutonObject => {
            let bouton=new Bouton(this,boutonObject.x,boutonObject.y);
            this.boutonContainer.add(bouton);
            this.physics.add.collider(bouton, this.player);
        });
        
        ici.movObjects = ici.map.getObjectLayer('Mov')['objects'];
        ici.movObjects.forEach(movObject => {
            let mov=new Move(this,movObject.x,movObject.y);
            this.movContainer.add(mov);
            this.physics.add.collider(mov, this.player);
        });

        ici.rebondObjects = ici.map.getObjectLayer('PlatRebond')['objects'];
        ici.rebondObjects.forEach(rebondObject => {
            let rebond=new PlatRebond(this,rebondObject.x,rebondObject.y);
            this.rebondContainer.add(rebond);
                ici.physics.add.collider(this.player, rebond,this.Bounding,null,this);
        });

        ici.plight = ici.map.getObjectLayer('Lights')['objects'];
        ici.plight.forEach(plightObjects => {
          let light = new Light(this,plightObjects.x+16,plightObjects.y-10).setDepth(9999);
          light.addLight(this,63,101,225, 200, 0.5, 0.03,false);
          this.plightContainer.add(light);
        });
        
        ici.plight = ici.map.getObjectLayer('Led')['objects'];
        ici.plight.forEach(plightObjects => {
          let light = new Light(this,plightObjects.x+16,plightObjects.y-10).setDepth(9999);
          light.addLight(this,246,249,9, 200, 0.5, 0.03,false);
          this.plightContainer.add(light);
        });

        ici.plight = ici.map.getObjectLayer('LedBreak')['objects'];
        ici.plight.forEach(plightObjects => {
          let light = new Light(this,plightObjects.x+16,plightObjects.y-10).setDepth(9999);
          light.addLight(this,246,249,9, 200, 0.5, 0.03,true);
          this.plightContainer.add(light);
        });
        ici.plight = ici.map.getObjectLayer('LightPlat')['objects'];
        ici.plight.forEach(plightObjects => {
          let light = new Light(this,plightObjects.x+16,plightObjects.y-10).setDepth(9999);
          light.addLight(this,246,249,9, 200, 0.7, 0.02,false);
          this.plightContainer.add(light);
        });

        this.ckpContainer = this.add.container();

        this.checkPointsObjects = this.map.getObjectLayer('ckps')['objects'];
        this.checkPointsObjects.forEach(checkPointsObject => {
            let ckp = new checkPoint(
                this,
                checkPointsObject.x,
                checkPointsObject.y - 32,
                'checkpoint',
                checkPointsObject.properties[0].value
            );
            this.physics.add.overlap(this.player, ckp, function()
            {
                ckp.savePos();
                ckp.glow();
            });

            this.playerPos = ckp.loadPos();

            if(this.playerPos)
            {
                ici.player.setPosition(this.playerPos.x, this.playerPos.y - 64);
            }
        })

        this.particles4 = this.add.particles('fog');
        this.emitter = this.particles4.createEmitter(
        {
            x: 0, y: 2000, // à changer en fonction d'où tu les places
            speed: 1000,
            moveToX: {min:100,max:10000}, // limitesX à changer en fonction d'où tu les places
            moveToY: {min:846,max:846}, //limitesY  à changer en fonction d'où tu les places
            rotate: {min:-360,max:360},
            lifespan: 200000, // pas nécessaire autant ^^
            quantity: 4,
            frequency: 1000,
            delay: 1000,
            alpha : 0.5,
            scale: { start: 0.6, end: 0.1 },
            blendMode: 'NORMAL', 
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

        this.physics.add.collider(this.player, this.devant);

        let z=1000; //niveau Z qui a chaque fois est décrémenté.
        debug.setDepth(z--);
        this.monstersContainer.setDepth(z--);
        this.movContainer.setDepth(z--);

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