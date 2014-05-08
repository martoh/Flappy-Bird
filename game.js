// Initialize Phaser
var game = new Phaser.Game(400, 600, Phaser.AUTO, 'game_div');

// Our 'score' global variable
var last_score = 0;
var best_score = 0;

// Define all the states
game.state.add('load', load_state);  
game.state.add('menu', menu_state);  
game.state.add('play', play_state);  

// Start with the 'load' state
game.state.start('load');  