class Start extends Phaser.GameObjects.Container {

    constructor(scene, x, y, size = 80) {
        super(scene, x, y)
        scene.add.existing(this);
   
        this.size = size;
        let w = this.size;
        this.pause =false;
        let pad2 = scene.add.container();

        let starttext = scene.add.text(0+250, 100, "PLAY", { font: "65px OdibeeSans-Regular", fill: "#ffffff", align: "center" });
        console.log("onfaitstart");
        let quittext = scene.add.text(50 + 250, 200, "QUIT", { font: "65px OdibeeSans-Regular", fill: "#ffffff", align: "center" });

        let starttextb = scene.add.text(-4 + 250, 98.5, "PLAY", { font: "70px OdibeeSans-Regular", fill: "#F30B47", align: "center" });
        let quittextb = scene.add.text(46 + 250, 197.5, "QUIT", { font: "70px OdibeeSans-Regular", fill: "#F30B47", align: "center" });


        this.add(pad2);

        pad2.add(starttextb);
        pad2.add(quittextb);

        pad2.add(starttext);
        pad2.add(quittext);

        pad2.x = w / 2;
        pad2.y = w / 2;

        starttext.setInteractive();
        quittext.setInteractive();

        //this.cursors = scene.input.keyboard.createCursorKeys();



        starttext.on('pointerover', function (pointer) {
      
            starttext.alpha = 0.7;
            starttextb.alpha = 0.7;

        })
        starttext.on('pointerout', function (pointer) {
   
            starttextb.alpha = 1;
            starttext.alpha = 1;
            Tableau.current.sound.play('clic');
        })
        starttext.on('pointerdown', function (pointer) {

            starttext.alpha = 0.5;
            starttextb.alpha = 0.5;

                Tableau.current.back.stop();
                
            Tableau.suivant();
        })
        /////////////
        quittext.on('pointerover', function (pointer) {

            quittext.alpha = 0.7;
            quittextb.alpha = 0.7;
            Tableau.current.sound.play('clic');
        })
        quittext.on('pointerout', function (pointer) {

            quittext.alpha = 1;
            quittextb.alpha = 1;
        })
        quittext.on('pointerdown', function (pointer) {

            quittext.alpha = 0.5;
            quittextb.alpha = 0.5;
            Tableau.current.back.stop();

            Tableau.current.scene.restart();
        })


    }


}