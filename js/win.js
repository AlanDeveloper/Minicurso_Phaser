var winState = {
  preload: function() {

  },
  create: function() {
    var win = game.add.text(400, 200, 'You win', {
      font: '80px',
      fill: '#0f0'
    });
    win.anchor.setTo(0.5, 0.5);
    var score = game.add.text(400, 300, 'High Score ' + localStorage.getItem('score'), {
      font: '60px',
      fill: '#ff5'
    });
    score.anchor.setTo(0.5, 0.5);
    var menu = game.add.text(400, 400, 'My Menu', {
      font: '60px',
      fill: '#ff5'
    });
    menu.inputEnabled = true;
    menu.events.onInputDown.add(this.down, this);
    menu.anchor.setTo(0.5, 0.5);
  },
  down: function(text) {
    game.state.start('menu');
  }
}