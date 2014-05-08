var menu_state = {  
    create: function() {
        // Call the 'start' function when pressing the spacebar
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this); 

        this.background = this.game.add.sprite(0, 0, 'background');              
		
		this.ground = this.game.add.sprite(0, 480, 'ground');
		this.ground_animation = this.game.add.tween(this.ground);
		this.ground_animation.to({x: -300}, 2000, Phaser.Easing.Linear.In, false, 0, Number.MAX_VALUE);
		this.ground_animation.start();
		
		this.title = this.game.add.sprite(30,150, 'title');
		this.title.alpha = 0;			
		game.add.tween(this.title).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false);
		game.add.tween(this.title).to( { y: 140 }, 375, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
		
		this.bird = this.game.add.sprite(300, 150, 'bird');
		this.bird.animations.add('flap');
		this.bird.animations.play('flap', 10, true);		
		game.add.tween(this.bird).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false);
		game.add.tween(this.bird).to( { y: 140 }, 375, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);

		this.start_button = this.game.add.button(150, 350, 'start_button', this.onStartButton, this, 0, 0, 1, 0);
		this.score_button = this.game.add.button(150, 300, 'score_button', this.onScoreButton, this, 0, 0, 1, 0);	     
    },
    
    onStartButton: function() {
    	this.game.state.start('play');
    },
    
    onScoreButton: function() {
    	this.score_sheet = this.game.add.sprite(58.5, 200, 'score_sheet');
    	this.score_sheet.alpha = 0;    	
    	this.score_text = this.game.add.bitmapText(79, 246, last_score.toString(), { font: '26px flappy', align: 'left' });
    	this.best_text = this.game.add.bitmapText(79, 296, best_score.toString(), { font: '26px flappy', align: 'left' });
    	
    	this.medal_x = 245;
    	this.medal_y = 255;
    	if (best_score > 10) {
    		this.medal = this.game.add.sprite(this.medal_x, this.medal_y, 'bronze_medal');
    	} else if (best_score > 50) {
    		this.medal = this.game.add.sprite(this.medal_x, this.medal_y, 'silver_medal');
    	} else if (best_score > 100) {
    		this.medal = this.game.add.sprite(this.medal_x, this.medal_y, 'gold_medal');
    	} else {
    		this.medal = this.game.add.sprite(this.medal_x, this.medal_y, 'blank_medal');
    	};
    	
    	game.add.tween(this.medal).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false)
    	.to( { alpha: 0 }, 375, Phaser.Easing.Linear.None, true, 1500, 0, false);
    	
    	game.add.tween(this.best_text).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false)
    	.to( { alpha: 0 }, 375, Phaser.Easing.Linear.None, true, 1500, 0, false);
    	
    	game.add.tween(this.score_text).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false)
    	.to( { alpha: 0 }, 375, Phaser.Easing.Linear.None, true, 1500, 0, false);
    	
    	game.add.tween(this.score_sheet).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false)
    	.to( { alpha: 0 }, 375, Phaser.Easing.Linear.None, true, 1500, 0, false);
    },

    // Start the actual game
    start: function() {
        this.game.state.start('play');
    }
};