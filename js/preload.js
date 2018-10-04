var game = new Phaser.Game(800, 600, Phaser.CANVAS);
game.state.add('script', scriptState);
game.state.add('menu', menuState);
game.state.add('gameOver', gameOverState);
game.state.add('win', winState);
game.state.start('menu');