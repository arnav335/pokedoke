// Phaser Cheat Sheet
//  <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
// Create a Phaser Game
const config = {
  type: Phaser.AUTO, // Renderer type (WEBGL, CANVAS, AUTO)
  width: 800, // Game width in pixels
  height: 600, // Game height in pixels
  scene: {
      preload: preload, // Function to preload assets
      create: create, // Function to create game objects
      update: update // Function for game logic update loop
  }
};

const game = new Phaser.Game(config);

// Preload assets
function preload() {
  // Load images
  this.load.image('background', 'assets/background.png');
  // Load sprite sheets
  this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
  // Load audio
  this.load.audio('backgroundMusic', ['assets/backgroundMusic.mp3', 'assets/backgroundMusic.ogg']);
}

// Create game objects
function create() {
  // Add background
  this.add.image(400, 300, 'background');

  // Add player sprite
  this.player = this.physics.add.sprite(100, 450, 'player');

  // Player animations
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  // Add keyboard input
  this.cursors = this.input.keyboard.createCursorKeys();
}

// Game update loop
function update() {
  // Player movement
  if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
  } else {
      this.player.setVelocityX(0);
      this.player.anims.stop('left');
      this.player.setFrame(0);
  }
}

// Physics collisions
this.physics.add.collider(player, platforms);

// Event handling
this.input.on('pointerdown', function(pointer) {
  console.log('Pointer down at', pointer.x, pointer.y);
});

// Timer
this.time.addEvent({
  delay: 1000,
  callback: function() {
      console.log('One second passed');
  },
  loop: true
});

// Tweening
this.tweens.add({
  targets: player,
  x: 700,
  ease: 'Linear',
  duration: 3000,
  yoyo: true,
  repeat: -1
});

// Audio
const bgMusic = this.sound.add('backgroundMusic');
bgMusic.play();
