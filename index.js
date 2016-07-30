function loadGame() {
    var viewSizeX = $(window).width();
    var viewSizeY = 100;
    var game = new Phaser.Game(viewSizeX, viewSizeY, Phaser.AUTO, 'phaserCanvas',
                             { preload: preload, create: create, update: update });
    var character;
    var uiTextFormats = { font: "20px Arial", fill: '#FFFFFF' };
    var textQuizProgressLabel, textQuizProgressValue;
    var health = 3;

    function preload() {
        game.load.spritesheet('playerCharacter', './asset/platformer_sprites_base.png', 64, 64);
    }

    function create() {
        game.stage.backgroundColor = '#DFEAF3';

        // setup player character animation loading.
        character = game.add.sprite(0, viewSizeY/1.1, "playerCharacter"); // 
        character.animations.add('walking', [32, 33, 34, 35, 36, 37, 38, 39], 8, true);
        character.animations.add('death', [18, 19, 20, 21, 22, 23], 10, true);
        character.animations.add('standing', [63], 10, false);
        character.anchor.setTo(0.5, 1);
        character.scale.setTo(1.0, 1.0);

        // setup common UI text
         textQuizProgressLabel = game.add.text(0, 0, 'Progress: ', uiTextFormats);
         textQuizProgressValue = game.add.text(120, 0, '{?}', uiTextFormats);
    }

    var GameStateEnum = {
        InitialPlayerSetup:     0,
		AnimateLifeProgress:    1,
		CalculateLifeAndReport: 2,
		LifeEnded:              3
    };

    var gameState = GameStateEnum.InitialPlayerSetup;

    function update() {
        character.animations.play("walking");
        //character.animations.play("death");
        //character.animations.play("standing");

        textQuizProgressValue.text = $('#testSlider').val();

        character.x = parseFloat($('#testSlider').val())/ 100.0 * viewSizeX;
    }

    $(window).resize(function(){
        game.width = $(window).width();
    });
}

