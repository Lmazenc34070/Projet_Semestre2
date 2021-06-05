class Menu extends Tableau{

    preload() {
        super.preload();
        // var aImageFiles = ['monstre', 'monstre2', 'monstre3', 'monstre4'];
        // var randImage = aImageFiles[Math.floor(Math.random()*aImageFiles.length)];
        this.load.image('MenuArt', 'assets/MenuArt.png');
        this.load.audio('MenuZik', 'assets/Sounds/E_Menu.mp3');

        this.load.audio('clic','assets/Sounds/button_click.mp3')



        let width = 14 * 64; //896;
        let height = 7 * 64; //448;

        this.scene.bringToTop();
    }
    create() {
        super.create();
        // vid = this.add.video(14 * 64 / 2, 7 * 64 / 2, 'Intro');
        // vid.setDisplaySize(14 * 64, 7 * 64);
        // vid.play(true);
        // vid.setDepth(200);
        // vid.setLoop(false);
        this.cameras.main.setBounds(0, 0, width, height);
        this.physics.world.setBounds(0, 0, width, height);
        this.back = this.sound.add('MenuZik');
        //this.mood.volume = 0;

        this.back.loop = true; 
        this.back.play();
        this.back.pause();
        this.pasfait = true;
       
    }
    update(time,delta) {
            this.back.resume();
            this.bg = this.add.image(14 * 64 / 2, 7 * 64 / 2, 'MenuArt');
            this.bg.setDisplaySize(14 * 64, 7 * 64);
            this.bg.setDepth(201);
            if (this.pasfait) {
                this.tuch = new Start(this, 0, 0);
                this.tuch.y = this.sys.canvas.height / 2 - this.tuch.size - 32;
                this.tuch.x = this.sys.canvas.width / 2 - this.tuch.size - 32;

                this.tuch.bringToTop();
                this.tuch.setDepth(202);
                this.pasfait = false;
            }
    }
}