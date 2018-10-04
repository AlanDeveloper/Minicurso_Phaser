var gameOverState = {
  create: function() {
    var gameOver = game.add.text(400, 200, 'Game Over', {
      font: '80px',
      fill: '#f00'
    });
    gameOver.anchor.setTo(0.5, 0.5);
    var score = game.add.text(400, 300, 'High Score ' + localStorage.getItem('score'), {
      font: '60px',
      fill: '#ff5'
    });
    score.anchor.setTo(0.5, 0.5);
    var restart = game.add.text(400, 400, 'Press any to Restart', {
      font: '60px',
      fill: '#ff5'
    });
    restart.anchor.setTo(0.5, 0.5);
    addEventListener("keypress", function() {
      game.state.start('script');
    });
  }
}