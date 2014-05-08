var play_state = {
		create: function() { 
			// Fuction called after 'preload' to setup the game			
			this.background = this.game.add.sprite(0, 0, 'background');
			this.jump_sound = this.game.add.audio('jump'); 
			this.coin_sound = this.game.add.audio('coin');
			this.hit_sound = this.game.add.audio('hit');

			this.ground = this.game.add.sprite(0, 480, 'ground');
			this.ground_animation = this.game.add.tween(this.ground);
			this.ground_animation.to({x: -300}, 2000, Phaser.Easing.Linear.In, false, 0, Number.MAX_VALUE);
			this.ground_animation.start();			

			this.pipes = game.add.group();  
			this.pipes.createMultiple(20, 'pipe');

			this.pipe_heads_down = game.add.group();
			this.pipe_heads_down.createMultiple(10, 'pipe_head_down');

			this.pipe_heads_up = game.add.group();
			this.pipe_heads_up.createMultiple(10, 'pipe_head_up');			

			this.bird = this.game.add.sprite(100, 300, 'bird');
			this.bird.animations.add('flap');
			this.bird.animations.play('flap', 10, true);
			this.bird.body.gravity.y = 0;
			this.bird.anchor.setTo(-0.2, 0.5);  

			this.white = this.game.add.sprite(0,0, 'white');
			this.white.alpha = 0;						

			this.black = this.game.add.sprite(0 ,0, 'black');
			this.black.alpha = 0.3;	

			this.get_ready = this.game.add.sprite(91,150, 'get_ready');
			this.get_ready.alpha = 0;			
			game.add.tween(this.get_ready).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false);
			game.add.tween(this.get_ready).to( { y: 140 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false);

			this.tap = this.game.add.sprite(126 ,250, 'tap');
			this.tap.alpha = 0;			
			game.add.tween(this.tap).to( { alpha: 1 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false);							

			this.firstKeyPress = true;
			var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			space_key.onDown.add(this.jump, this);

			last_score = 0;
			this.firstPipe = true;
			this.score_text = this.game.add.bitmapText(189, 20, last_score.toString(), { font: '52px flappy', align: 'center' });
		},

		update: function() {
			// Function called 60 times per second
			if (this.bird.inWorld == false) {
				this.hit_pipe();
			};

			if (game.input.mousePointer.justPressed() || game.input.pointer1.justPressed()) {
				this.jump();
			};		
			
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)&& this.bird.alive == false) {
				this.game.time.events.remove(this.timer); 
				this.game.state.start('menu');
			};
			if (this.bird.angle < 20 && !this.firstKeyPress) {
				this.bird.angle += 1;
			};

			this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);  
			this.game.physics.overlap(this.bird, this.ground, this.hit_pipe, null, this);  
			this.game.physics.overlap(this.bird, this.pipe_heads_down, this.hit_pipe, null, this);  
			this.game.physics.overlap(this.bird, this.pipe_zheads_down, this.hit_pipe, null, this);  
		},

		jump: function() {
			if (this.bird.alive == false) {
				return;
			};			     

			if (this.firstKeyPress) {
				this.firstKeyPress = false;
				this.bird.body.gravity.y = 1000;
				game.add.tween(this.get_ready).to( { alpha: 0 }, 275, Phaser.Easing.Linear.None, true, 0, 0, false);
				game.add.tween(this.tap).to( { alpha: 0 }, 275, Phaser.Easing.Linear.None, true, 0, 0, false);
				game.add.tween(this.black).to( { alpha: 0 }, 375, Phaser.Easing.Linear.None, true, 0, 0, false);
				this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
			} ;

			this.bird.body.velocity.y = -300;

			// create an animation on the bird
			var animation = this.game.add.tween(this.bird);

			// Set the animation to change the angle of the sprite to -20° in 100 milliseconds
			animation.to({angle: -20}, 100);

			// And start the animation
			animation.start();  

			this.jump_sound.play(); 
		},

//		restart_game: function() {
//			this.game.time.events.remove(this.timer); 
//			this.game.state.start('main');
//		},

		onOKButton: function() {
			this.game.time.events.remove(this.timer); 
			this.game.state.start('menu');
		},
		
		add_one_pipe_body: function(x, y) {  
			var pipe = this.pipes.getFirstDead();
			pipe.reset(x, y);
			pipe.body.velocity.x = -200;  
			pipe.outOfBoundsKill = true;
		},

		add_one_pipe_head: function(x, y, direction) {
			var pipe_head = null;
			if (direction == 'down') {
				pipe_head = this.pipe_heads_down.getFirstDead();
			} else if (direction == 'up'){
				pipe_head = this.pipe_heads_up.getFirstDead();
			};

			pipe_head.reset(x,y);
			pipe_head.body.velocity.x = -200;
			pipe_head.outOfBoundsKill = true;
		},

		add_row_of_pipes: function() {  
			var hole = Math.floor(Math.random()*5)+1;

			if (!this.firstPipe) {
				last_score += 1;
				this.score_text.setText(last_score.toString()); 
				this.coin_sound.play();
			};

			for (var i = 0; i < 8; i++) {
				switch (i) {
				case(hole-1):
					this.add_one_pipe_head(398, i*60, 'down');
				case (hole):
					break;
				case (hole+1):
					break;
				case (hole+2):
					this.add_one_pipe_head(398, i*60, 'up');
				default: 
					this.add_one_pipe_body(400, i*60);
				}
			};

			this.firstPipe = false;
		},

		hit_pipe: function() {  
			// If the bird has already hit a pipe, we have nothing to do
			if (this.bird.alive == false){	    	
				return;	
			};		        
			
			if (last_score > best_score) {
				best_score = last_score;
			} 
			this.hit_sound.play();

			// Set the alive property of the bird to false
			var animation = this.game.add.tween(this.bird);
			animation.to({y: 455}, 400, Phaser.Easing.Exponential.In);
			animation.start(); 

			this.bird.body.gravity.y = 0;
			this.bird.body.velocity.y = 0;

			this.ground_animation.stop();

			game.add.tween(this.black).to( { alpha: 0.3 }, 275, Phaser.Easing.Linear.None, true, 0, 0, false);

			this.game_over = this.game.add.sprite(82.5, 150, 'game_over');
			this.game_over.alpha = 0;
			game.add.tween(this.game_over).to( { y: 195 }, 75, Phaser.Easing.Linear.None, true, 0, 1, true);
			game.add.tween(this.game_over).to( { alpha: 1 }, 275, Phaser.Easing.Linear.None, true, 0, 0, false);
			game.add.tween(this.white).to( { alpha: 1 }, 75, Phaser.Easing.Linear.None, true, 0, 1, true);
			
			this.score_text.y = 250;
			this.start_button = this.game.add.button(150, 350, 'ok_button', this.onOKButton, this, 0, 0, 1, 0);

			// Prevent new pipes from appearing
			this.game.time.events.remove(this.timer);

			// Go through all the pipes, and stop their movement
			this.pipes.forEachAlive(function(p){
				p.body.velocity.x = 0;
			}, this);

			this.pipe_heads_down.forEachAlive(function(p){
				p.body.velocity.x = 0;
			}, this);

			this.pipe_heads_up.forEachAlive(function(p){
				p.body.velocity.x = 0;
			}, this);

			this.bird.alive = false;
		},
};