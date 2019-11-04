var config = {
	type: Phaser.AUTO,
	width: 1000,
    height: 600,
    parent: 'musicFrame',
    backgroundColor: 0xFFFFFF,
    
	scene: {
        create: create,
        preload: function () {
            this.load.image('trebleClef', 'assets/trebleClef.png');
            this.load.image('4_4time', 'assets/4_4time.png');
            this.load.image('button', 'assets/button.png');
        }
	}
};

var game = new Phaser.Game(config);
var showMeasures = false;

function create() {
    var clef, timeSig, graphics;

    var button = this.add.sprite(100, 550, 'button').setScale(0.2)
        .setInteractive()
        .on('pointerdown', () => { 
            if(showMeasures === false) {
                showMeasures = true;
                var numMeasures = 4;
                var scale = 40;

                var lines = [];
                var barLines = [];
                for(var i = 0; i < 5; i++) {
                    lines.push(new Phaser.Geom.Line(50, (i*15)+50, 950, (i*15)+50));
                }

                for(var i = 0; i < numMeasures; i++) {
                    barLines.push(new Phaser.Geom.Line((i*numMeasures*(scale))+(scale*7), 110, (i*numMeasures*(scale))+(scale*7), 50));
                }

                barLines.push(new Phaser.Geom.Line(950, 110, 950, 50));
                barLines.push(new Phaser.Geom.Line(945, 110, 945, 50));

                clef = this.add.image(75, 85, 'trebleClef').setScale(0.08);
                timeSig = this.add.image(110, 80, '4_4time').setScale(0.09);

                graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x000000 } });
                
                lines.forEach(function(element) {
                    graphics.strokeLineShape(element);
                });

                barLines.forEach(function(element) {
                    graphics.strokeLineShape(element);
                });
            }
            else {
                showMeasures = false;
                clef.destroy();
                timeSig.destroy();
                graphics.destroy();
            }
        })

    var clear = this.add.sprite(900, 550, 'button').setScale(0.2)
        .setInteractive()
        .on('pointerdown', () => { this.scene.restart(); });


    var barBtn = this.add.text(50, 528, "Add Primer", { fill: '#000'});
    var barBtn = this.add.text(65, 542, "Melody", { fill: '#000'});
    var resetBtn = this.add.text(875, 535, "RESET", { fill: '#000'});

}

function update() {

}
