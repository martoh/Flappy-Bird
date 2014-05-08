var load_state = {  
		preload: function() { 
			this.game.stage.backgroundColor = '#ADE4FF';
			this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
			this.game.stage.scale.setScreenSize(true);
			this.game.load.image('background', 'assets/background.png');
			this.game.load.spritesheet('bird', 'assets/bird_animated.png', 50, 35, 4);
			this.game.load.image('pipe_head_down', 'assets/pipe_head_down.png');
			this.game.load.image('pipe_head_up', 'assets/pipe_head_up.png');
			this.game.load.image('pipe', 'assets/pipe.png');
			this.game.load.bitmapFont('flappy', 'assets/flappy.png', 'assets/flappy.xml');
			this.game.load.audio('jump', 'assets/jump.wav');
			this.game.load.audio('coin', 'assets/coin.wav');
			this.game.load.audio('hit', 'assets/hit.wav');
			this.game.load.image('ground', 'assets/ground.png');
			this.game.load.image('game_over', 'assets/game_over.png');
			this.game.load.image('white', 'assets/white.png');
			this.game.load.image('black', 'assets/black.png');
			this.game.load.image('get_ready', 'assets/get_ready.png');
			this.game.load.image('tap', 'assets/tap.png');
			this.game.load.image('title', 'assets/title.png');
			this.game.load.image('score_sheet', 'assets/scoresheet.png');
			this.game.load.image('bronze_medal', 'assets/bronze_medal.png');
			this.game.load.image('silver_medal', 'assets/silver_medal.png');
			this.game.load.image('gold_medal', 'assets/gold_medal.png');
			this.game.load.image('blank_medal', 'assets/blank_medal.png');
			this.game.load.spritesheet('start_button', 'assets/start_button_spritesheet.png', 100, 35, 2);
			this.game.load.spritesheet('ok_button', 'assets/ok_button_spritesheet.png', 100, 35, 2);
			this.game.load.spritesheet('score_button', 'assets/score_button_spritesheet.png', 100, 35, 2);
		},

		create: function() {
			// When all assets are loaded, go to the 'menu' state
			this.game.state.start('menu');
		}
};