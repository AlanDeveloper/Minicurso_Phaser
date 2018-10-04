var scriptState = {
  jogador: null,
  //plataformas: null,
  //teclas: null,
  //chao: null,
  //estrelas: null,
  //estrela: null,
  score: 0,
  //TextoScore: null,
  //caixas: null,
  //caixa: null,
  VidaValor: 0,
  //vida: null,
  //TextoVida: null,
  inimigo: null,
  delay: 0,
  //FimDeJogo: null,
  //matrizBonus: null,
  preload: function() {
    game.load.image('ceu', 'assets/sky.png');
    game.load.image('castelo', 'assets/castelo.png');
    game.load.image('chao', 'assets/platform.png');
    game.load.image('bonus', 'assets/bonus.png');
    game.load.image('estrela', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    game.load.image('vida', 'assets/vida.png');
  },
  create: function() {

    this.score = 0

    this.VidaValor = 3

    this.delay = 0

    matrizBonus = [
      [1, 552, game.world.height - 170]
    ];

    IniciarFisica = game.physics.startSystem(Phaser.Physics.ARCADE);
    AmpliarCenario = game.world.setBounds(0, 0, 1920, 600);

    game.add.sprite(0, 0, 'ceu');
    game.add.sprite(800, 0, 'ceu');
    game.add.sprite(1600, 0, 'ceu');

    plataformas = game.add.group();
    plataformas.enableBody = true;

    caixas = game.add.group();
    caixas.enableBody = true;
    bonus = game.add.group();
    bonus.enableBody = true;
    estrelas = game.add.group();
    estrelas.enableBody = true;
    castelos = game.add.group()
    castelos.enableBody = true

    castelo = castelos.create(1720, game.world.height - 197, 'castelo')
    castelo.body.immovable = true;

    chao = plataformas.create(0, 540, 'chao');
    chao.scale.setTo(2);
    chao.body.immovable = true;
    chao = plataformas.create(1000, 540, 'chao');
    chao.scale.setTo(2);
    chao.body.immovable = true;
    chao = plataformas.create(1600, 540, 'chao');
    chao.scale.setTo(1, 2);
    chao.body.immovable = true;
    chao = plataformas.create(1635, 510, 'chao');
    chao.scale.setTo(0.2, 1);
    chao.body.immovable = true;
    chao = plataformas.create(700, 510, 'chao');
    chao.scale.setTo(0.4, 3);
    chao.body.immovable = true;

    this.jogador = game.add.sprite(32, 480, 'dude');
    game.physics.arcade.enable(this.jogador);
    game.camera.follow(this.jogador);
    //jogador.body.bounce.y = 0.2;
    this.jogador.body.gravity.y = 300;
    this.jogador.anchor.set(0.5, 1)

    this.inimigo = game.add.sprite(1000, game.world.height - 120, 'baddie');
    game.physics.arcade.enable(this.inimigo);
    this.inimigo.body.bounce.y = 0.2;
    this.inimigo.body.gravity.y = 300;
    this.inimigo.anchor.set(0.5, -1.2)

    for (let i = 0; i < 4; i++) {
      caixa = caixas.create(400 + (i * 38), game.world.height - 170, 'chao');
      caixa.scale.setTo(.09, 1);
      caixa.body.immovable = true;
    }
    bonus = bonus.create(552, game.world.height - 170, 'bonus');
    //bonus.scale.setTo(.09, 1);
    bonus.body.immovable = true;

    //  Animações

    this.jogador.animations.add('esquerda', [0, 1, 2, 3], 10, true);
    this.jogador.animations.add('direita', [5, 6, 7, 8], 10, true);
    this.inimigo.animations.add('direita', [2, 3], 10, true);
    this.inimigo.animations.add('esquerda', [0, 1], 10, true);

    //  Textos

    TextoScore = game.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#000'
    });
    TextoScore.fixedToCamera = true;
    TextoVida = game.add.text(700, 10, this.VidaValor, {
      fontSize: '40px',
      fill: '#000'
    });
    TextoVida.fixedToCamera = true;
    vida = game.add.sprite(722, 10, 'vida');
    vida.fixedToCamera = true;

    // Controles

    teclas = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    //console.log(this.jogador.body.x) //debug
    var JogadorContatoPlataformas = game.physics.arcade.collide(this.jogador, plataformas);
    var JogadorContatoCaixas = game.physics.arcade.collide(this.jogador, caixas);
    var JogadorContatoCastelos = game.physics.arcade.overlap(this.jogador, castelos);
    var JogadorContatoBonus = game.physics.arcade.collide(this.jogador, bonus);
    var InimigoContatoPlataformas = game.physics.arcade.collide(this.inimigo, plataformas);

    game.physics.arcade.collide(estrelas, plataformas);
    game.physics.arcade.collide(estrelas, caixas);
    game.physics.arcade.collide(castelos, plataformas);
    game.physics.arcade.overlap(this.jogador, estrelas, this.ColetaEstrela, null, this);
    game.physics.arcade.overlap(this.jogador, this.inimigo, this.SofreDano, null, this);
    //ficar piscando
    this.delay--;
    if (this.delay <= 0) {
      this.delay = 0;
    } else {
      if (this.delay % 2 > 0) {
        this.jogador.alpha = 1
      } else {
        this.jogador.alpha = 0
      }
    }

    this.jogador.body.velocity.x = 0;
    if (teclas.left.isDown) {
      if (this.jogador.body.x > 0) this.jogador.body.velocity.x = -150;
      this.jogador.animations.play('esquerda');
    } else if (teclas.right.isDown) {
      if (this.jogador.x < 1882) this.jogador.body.velocity.x = 150;
      this.jogador.animations.play('direita');
    } else {
      this.jogador.animations.stop();
      this.jogador.frame = 4;
    }
    if (this.inimigo.body.x >= 1600) {
      this.inimigo.body.velocity.x = -120;
      this.inimigo.animations.play('esquerda');
    }
    if (this.inimigo.body.x <= 1000) {
      this.inimigo.body.velocity.x = 120;
      this.inimigo.animations.play('direita');
    }
    if (InimigoContatoPlataformas) {
      this.inimigo.body.velocity.y = -170;
    }

    //  if (JogadorContatoCaixas) { estrela = estrelas.create(405, game.world.height - 190 , 'estrela');}
    if (JogadorContatoBonus) {
      validadeDoBonus = this.VerificaBonus()
      if (validadeDoBonus[0])
        estrela = estrelas.create(validadeDoBonus[1][1] + 5, validadeDoBonus[1][2] - 25, 'estrela');
    }
    if (JogadorContatoCastelos) {
      this.TelaDeVitoria()
    }

    if (teclas.up.isDown && this.jogador.body.touching.down && (JogadorContatoPlataformas || JogadorContatoCaixas)) {
      this.jogador.body.velocity.y = -280;
    }

    if (this.VidaValor === 0) {
      this.jogador.kill();
      if (localStorage.getItem('score') < this.score)
        localStorage.setItem('score', this.score)
      setTimeout(function() {
        this.game.state.start('gameOver', true, false)
      }, 1000)

      //  FimDeJogo.fixedToCamera = true;
    } else if (this.jogador.body.y >= 600) {
      this.VidaValor--;
      TextoVida.setText(this.VidaValor);
      if (this.VidaValor > 0) {
        this.jogador.x = 32;
        this.jogador.y = 450;
      }
    }
  },
  TelaDeVitoria: function() {
    if (localStorage.getItem('score') < this.score)
      localStorage.setItem('score', this.score)
    setTimeout(function() {
      this.game.state.start('win', true, false)
    }, 300)
  },
  ColetaEstrela: function(jogador, estrela) {
    estrela.kill();
    this.score += 10;
    TextoScore.text = 'Score: ' + this.score;
  },
  SofreDano: function() {
    if (this.delay === 0) {
      if (this.jogador.body.y > this.inimigo.body.y) {
        this.VidaValor--;
        console.log(this.jogador.body.y + "   " + this.inimigo.body.y)
        TextoVida.setText(this.VidaValor);
        //game.camera.flash('0xff0000', 100);
        this.delay = 100;
      } else {
        console.log(this.jogador.body.y + "   " + this.inimigo.body.y)
        this.inimigo.kill()
      }
    }
  },
  VerificaBonus: function() {
    arr = [];
    arr[0] = false;
    for (var i = 0; i < matrizBonus.length; i++) {
      if (matrizBonus[i][0] > 0 && (matrizBonus[i][1] - this.jogador.body.x > 40 || matrizBonus[i][1] - this.jogador.body.x < 40) && matrizBonus[i][2] < this.jogador.body.y) {
        matrizBonus[i][0]--;
        arr[0] = true
        arr[1] = matrizBonus[i]
      }
    }
    console.log(arr)
    return arr;
  }
}