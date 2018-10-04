menuState = {
  create: function() {
    var titulo = game.add.text(400, 200, 'Jogo do curso', {
      font: '60px',
      fill: '#ff5'
    });
    titulo.anchor.set(.5);

    var start = game.add.text(400, 650, 'PRESS START', {
      font: '20px',
      fill: '#ff5'
    });
    start.anchor.set(.5);

    game.add.tween(start).to({
      y: 350
    }, 1000).start();

    game.time.events.add(1000, function() {
      var enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enter.onDown.addOnce(this.startGame, this);
    }, this);
  },

  startGame: function() {
    game.state.start('script');
  }
}