const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 100 },
        debug: true,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  
  let tiles = [];
  let player;
  let slime;
  let keyW, keyA, keyD;
  
  function preload() {
    this.load.image("block", "/assets/download.jpg");
    this.load.image("brick", "/assets/128x128/Brick/brick1.png");
    this.load.spritesheet("player", "/assets/redhood.png", {
      frameWidth: 112,
      frameHeight: 133,
      frames: 132,
    });
    this.load.spritesheet("slime", "/assets/slime.png", {
      frameWidth: 32,
      frameHeight: 25,
      frames: 24,
    });
  }
  
  function create() {
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      key: "slimeIdle",
      frames: this.anims.generateFrameNumbers("slime", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
        key: "slimeWalk",
        frames: this.anims.generateFrameNumbers("slime", { start: 1, end: 14 }),
        frameRate: 10,
        repeat: -1,
      });

    this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "block").setOrigin(0, 0);
  
    for (let i = 0; i < 50; i++) {
      tiles.push(this.physics.add.staticGroup({ key: "brick", setXY: { x: 150 * i, y: 600 } }));
    }
  
    player = this.physics.add.sprite(100, 100, "player");
    slime = this.physics.add.sprite(300, 100, "slime");
  
    this.physics.add.collider(player, tiles);
    this.physics.add.collider(slime, tiles);
  
    player.setSize(20, 33);
    player.setOffset(46, 65);
  
    player.anims.play("idle");
  
    this.cameras.main.startFollow(player, true, 1, 1, 0, 200);
  }
  
  function update() {
    if (keyD.isDown) {
      player.setVelocityX(100);
      player.anims.play("walk", true);
      player.flipX = true;
    } else if (keyA.isDown) {
      player.setVelocityX(-100);
      player.anims.play("walk", true);
      player.flipX = false;
    } else {
      player.setVelocityX(0);
      player.anims.play("idle");
    }
  
    if (keyW.isDown && player.body.touching.down) {
      player.setVelocityY(-50);
    }

    if (this.physics.overlap(slime, player)) {
        console.log("overlapped");
        tiles = [];
        player = {};
        slime - {};
        keyW = {};
        keyA = {};
        keyD = {};
        this.scene.restart();
    }

  }
  
  const game = new Phaser.Game(config);